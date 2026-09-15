"use server";

import { headers } from "next/headers";
import { sendMetaCapiEvent } from "../../lib/meta-capi";
import { buildAssessmentEmailHtml } from "../../lib/email-templates";
import { transporter } from "../../lib/mailer";
import { upsertHubSpotContact } from "../../lib/hubspot";

export type AssessmentFormState = {
  status: "success" | "error";
  message: string;
};

function mapServiceInterest(concern: string): string {
  switch (concern) {
    case "Back or neck pain":
    case "Knee, hip or shoulder":
    case "Arthritis or joint pain":
      return "Injury or pain";
    case "Bone health":
    case "Diabetes or weight":
    case "Heart or lungs":
      return "Chronic condition";
    case "After an operation":
      return "Post-surgery rehabilitation";
    case "Getting stronger safely":
    case "Staying well as I age":
      return "Getting stronger / staying active";
    default:
      return "Not sure yet";
  }
}

function mapFundingPathway(funding: string): string {
  switch (funding) {
    case "Private":
    case "Private health fund":
      return "Private";
    case "Medicare care plan":
      return "Medicare CDM/EPC";
    case "WorkCover":
      return "WorkCover";
    case "NDIS":
      return "NDIS";
    case "DVA":
      return "DVA";
    default:
      return "Not yet known";
  }
}

export async function submitAssessmentRequest(data: {
  concern: string;
  funding: string;
  firstName: string;
  phone: string;
  email: string;
  eventId?: string;
  honeypot?: string;
  formRenderedAt?: number;
  gclid?: string;
  fbclid?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  landingPage?: string;
  referrer?: string;
  hutk?: string;
  pageUri?: string;
  pageName?: string;
}): Promise<AssessmentFormState> {
  const {
    concern,
    funding,
    firstName,
    phone,
    email,
    eventId,
    honeypot,
    formRenderedAt,
    gclid,
    fbclid,
    utmSource,
    utmMedium,
    utmCampaign,
    utmTerm,
    utmContent,
    landingPage,
    referrer,
    hutk,
    pageUri,
    pageName,
  } = data;

  // Bots that skip the client and call this action directly still hit these checks:
  // a filled hidden field, or a submit within 2s of the form rendering.
  const submittedTooFast =
    typeof formRenderedAt === "number" && Date.now() - formRenderedAt < 2000;
  if (honeypot || submittedTooFast) {
    return {
      status: "success",
      message: "Thank you! We have received your assessment request and will respond the same working day.",
    };
  }

  if (!firstName || !phone || !concern || !funding) {
    return { status: "error", message: "Please fill in all required fields." };
  }

  // Validate Australian phone number (mobile: 04XXXXXXXX, landline: 0[2378]XXXXXXXX, with optional +61 / spaces)
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");
  const isAusPhone =
    /^(?:\+?61|0)4\d{8}$/.test(cleanPhone) ||
    /^(?:\+?61|0)[2378]\d{8}$/.test(cleanPhone);

  if (!isAusPhone) {
    return {
      status: "error",
      message:
        "Please enter a valid Australian mobile number (e.g. 0400 000 000).",
    };
  }

  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "Unknown";
  const forwardedFor = headersList.get("x-forwarded-for");
  const remoteIp = forwardedFor
    ? forwardedFor.split(",")[0].trim()
    : headersList.get("x-real-ip") || "Unknown";

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    timeZone: "Australia/Perth",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeStr = now
    .toLocaleTimeString("en-US", {
      timeZone: "Australia/Perth",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .toLowerCase();

  const emailDisplay = email?.trim() || "Not provided";
  const adPlatform = gclid ? "Google Ads" : fbclid ? "Meta" : "Organic / direct";

  // The lead's fate (thank-you screen, Google Ads conversion, Meta Lead
  // event) is decided ONLY by this — never by whether the notification
  // email below succeeds. Uses the authenticated CRM API, not the public
  // Forms API: the Forms API silently accepts-and-drops some submissions
  // (returns a normal 200 success with no error signal at all) as part of
  // its own anti-spam filtering, which made it impossible to detect a lost
  // lead from the response. The CRM API has no such silent-drop mode — a
  // rejected write always comes back as a real error.
  const hubspotResult = await upsertHubSpotContact(
    {
      firstname: firstName,
      lastname: "-",
      email: email?.trim() || "",
      phone,
      valen_service_interest: mapServiceInterest(concern),
      valen_funding_pathway: mapFundingPathway(funding),
      valen_gclid: gclid,
      valen_fbclid: fbclid,
      valen_utm_source: utmSource,
      valen_utm_medium: utmMedium,
      valen_utm_campaign: utmCampaign,
      valen_utm_term: utmTerm,
      valen_utm_content: utmContent,
      valen_landing_page: landingPage || pageUri,
      valen_referrer_url: referrer,
      valen_ad_platform: adPlatform,
      valen_lead_source_detail: "Website form",
      hs_lead_status: "NEW",
    },
    "assessment form",
  );

  const textBody = `New Assessment Request Details:

First Name: ${firstName}
Mobile Phone: ${phone}
Email: ${emailDisplay}
Primary Concern: ${concern}
Funding Type: ${funding}

---

Date: ${dateStr}
Time: ${timeStr}
Page URL: https://valenhealth.com.au/getstarted
User Agent: ${userAgent}
Remote IP: ${remoteIp}`;

  const htmlBody = buildAssessmentEmailHtml({
    concern,
    funding,
    firstName,
    phone,
    email: emailDisplay,
    date: dateStr,
    time: timeStr,
    userAgent,
    remoteIp,
  });

  // Best-effort internal notification — it never decides what the visitor
  // sees. If HubSpot rejected the lead, the subject/body call it out so the
  // lead isn't silently lost even though the visitor sees an error.
  try {
    await transporter.sendMail({
      from: `"Valen Health Assessment" <${process.env.SMTP_USER}>`,
      to: "admin@valenhealth.com.au",
      replyTo: email?.trim() ? email.trim() : undefined,
      subject: hubspotResult.ok
        ? `New Assessment Request: ${firstName} (${concern})`
        : `[ACTION NEEDED - HubSpot rejected] New Assessment Request: ${firstName} (${concern})`,
      text: hubspotResult.ok
        ? textBody
        : `HubSpot did NOT accept this lead (status ${hubspotResult.status}). Please follow up manually.\n\n${textBody}`,
      html: htmlBody,
    });
  } catch (emailErr) {
    console.error("Assessment notification email failed:", emailErr);
  }

  if (!hubspotResult.ok) {
    return {
      status: "error",
      message:
        "Sorry, something went wrong sending your request. Please try again, or call us on 0489 293 000 and we'll book you in.",
    };
  }

  try {
    await sendMetaCapiEvent({
      eventName: "Lead",
      eventUrl: "https://valenhealth.com.au/getstarted",
      eventId,
      userData: {
        email: email?.trim() || undefined,
        phone: phone || undefined,
        firstName: firstName,
      },
    });
  } catch (capiErr) {
    console.error("Meta CAPI dispatch error on assessment lead:", capiErr);
  }

  return {
    status: "success",
    message: "Thank you! We have received your assessment request and will respond the same working day.",
  };
}
