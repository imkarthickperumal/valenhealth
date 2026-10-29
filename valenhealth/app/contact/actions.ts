"use server";

import { headers } from "next/headers";
import { sendMetaCapiEvent } from "../../lib/meta-capi";
import { buildContactEmailHtml } from "../../lib/email-templates";
import { transporter } from "../../lib/mailer";
import { submitToHubSpotForm } from "../../lib/hubspot";

// Shared HubSpot form (portal 443661932) — "Valen Health — Website Enquiry"
// Contact-page leads are distinguished by valen_lead_source_detail = "Contact form"
const CONTACT_FORM_GUID = "0972e88a-2491-4874-8bbc-49c498fdef29";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function sendContactEmail(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Honeypot spam guard — bots fill hidden fields, humans don't
  const honeypot = (formData.get("vh_hp_check") as string) || "";
  if (honeypot) {
    return {
      status: "success",
      message: "Thank you! Your message has been sent. We'll be in touch within one business day.",
    };
  }

  const name = ((formData.get("name") as string) || "").trim();
  const phone = ((formData.get("phone") as string) || "").trim();
  const email = ((formData.get("email") as string) || "").trim();
  const message = ((formData.get("message") as string) || "").trim();
  const subjectParam = (formData.get("subject") as string) || "";
  const gclid = (formData.get("gclid") as string) || "";
  const fbclid = (formData.get("fbclid") as string) || "";
  const utmSource = (formData.get("utm_source") as string) || "";
  const utmMedium = (formData.get("utm_medium") as string) || "";
  const utmCampaign = (formData.get("utm_campaign") as string) || "";
  const utmTerm = (formData.get("utm_term") as string) || "";
  const utmContent = (formData.get("utm_content") as string) || "";
  const landingPage = (formData.get("landing_page") as string) || "";
  const referrer = (formData.get("referrer") as string) || "";
  const hutk = (formData.get("hutk") as string) || "";

  if (!name || !email || !message) {
    return { status: "error", message: "Please fill in all required fields (name, email, and message)." };
  }

  if (!phone) {
    return { status: "error", message: "Please provide a phone number so we can reach you." };
  }

  // Extract request metadata
  const headersList = await headers();
  const pageUri =
    headersList.get("referer") || "https://valenhealth.com.au/contact";
  const userAgent = headersList.get("user-agent") || "Unknown";
  const forwardedFor = headersList.get("x-forwarded-for");
  const remoteIp = forwardedFor
    ? forwardedFor.split(",")[0].trim()
    : headersList.get("x-real-ip") || undefined;

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-AU", {
    timeZone: "Australia/Perth",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeStr = now
    .toLocaleTimeString("en-AU", {
      timeZone: "Australia/Perth",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .toLowerCase();

  const adPlatform = gclid ? "Google Ads" : fbclid ? "Meta" : "Organic / direct";
  const firstName = name.split(" ")[0] || name;
  const lastName = name.split(" ").slice(1).join(" ") || "-";
  const emailSubject = subjectParam === "ep" ? "Exercise Physiology Appointment" : "Website Enquiry";

  // ── Primary: Submit to HubSpot Forms API ─────────────────────────────────
  const hsResult = await submitToHubSpotForm(
    CONTACT_FORM_GUID,
    [
      { name: "firstname", value: firstName },
      { name: "lastname", value: lastName },
      { name: "email", value: email },
      { name: "phone", value: phone },
      { name: "valen_service_interest", value: subjectParam === "ep" ? "Injury or pain" : "Not sure yet" },
      { name: "valen_funding_pathway", value: "Not yet known" },
      { name: "message", value: message },
      { name: "subject", value: emailSubject },
      { name: "valen_gclid", value: gclid },
      { name: "valen_fbclid", value: fbclid },
      { name: "valen_utm_source", value: utmSource },
      { name: "valen_utm_medium", value: utmMedium },
      { name: "valen_utm_campaign", value: utmCampaign },
      { name: "valen_utm_term", value: utmTerm },
      { name: "valen_utm_content", value: utmContent },
      { name: "valen_landing_page", value: landingPage || pageUri },
      { name: "valen_referrer_url", value: referrer },
      { name: "valen_ad_platform", value: adPlatform },
      { name: "valen_lead_source_detail", value: "Contact form" },
      { name: "hs_lead_status", value: "NEW" },
    ],
    {
      pageUri,
      pageName: "Contact - Valen Health",
      hutk: hutk || undefined,
      ipAddress: remoteIp,
    },
    "contact form",
  );

  // ── Admin notification email via the existing SMTP account ────────────────
  // Attempt the email even if HubSpot rejects the submission.
  const textBody = `New Website Contact Enquiry

Name:    ${name}
Phone:   ${phone}
Email:   ${email}
Message: ${message}

---
Date:       ${dateStr}
Time:       ${timeStr} (Perth)
Page:       https://valenhealth.com.au/contact
Source:     ${adPlatform}${gclid ? ` / GCLID: ${gclid}` : ""}${fbclid ? ` / FBCLID: ${fbclid}` : ""}
User Agent: ${userAgent}
IP:         ${remoteIp || "Unknown"}`;

  const hubspotFailure = hsResult.ok
    ? ""
    : `HubSpot submission failed (status ${hsResult.status}). Please follow up manually.\n\n`;
  const htmlBody = buildContactEmailHtml({
    name,
    phone,
    email,
    message,
    date: dateStr,
    time: timeStr,
    userAgent,
    remoteIp: remoteIp || "Unknown",
  });

  let emailSent = false;
  try {
    await transporter.sendMail({
      from: `"Valen Health Contact" <${process.env.SMTP_USER || "admin@valenhealth.com.au"}>`,
      to: "admin@valenhealth.com.au",
      replyTo: email,
      subject: `${hsResult.ok ? "" : "[HubSpot ERROR] "}New Contact Enquiry: ${name}${subjectParam === "ep" ? " — Exercise Physiology" : ""}`,
      text: `${hubspotFailure}${textBody}`,
      html: htmlBody,
    });
    emailSent = true;
  } catch (mailErr) {
    console.error("Contact form SMTP email failed:", mailErr);
  }

  if (!emailSent) {
    console.error("Contact form admin notification email could not be delivered.");
    return {
      status: "error",
      message: hsResult.ok
        ? "Your details were received, but we couldn't notify our team by email. Please call us on 0489 293 000 to ensure we can follow up."
        : "We couldn't send your message. Please call us on 0489 293 000 or email admin@valenhealth.com.au directly.",
    };
  }

  // ── Best-effort: Meta Conversions API ────────────────────────────────────
  try {
    await sendMetaCapiEvent({
      eventName: "Lead",
      eventUrl: "https://valenhealth.com.au/contact",
      userData: {
        email,
        phone,
        firstName,
        lastName: lastName !== "-" ? lastName : undefined,
      },
    });
  } catch (capiErr) {
    console.error("Meta CAPI error on contact lead:", capiErr);
  }

  return {
    status: "success",
    message: "Thank you! Your message has been sent. We'll be in touch within one business day.",
  };
}
