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
  const honeypot = (formData.get("vh_hp_check") as string) || "";
  if (honeypot) {
    // Silently succeed for bots
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
    return { status: "error", message: "Please provide a contact phone number so we can reach you." };
  }

  // Validate phone format (accept Australian mobile/landline with optional +61/spaces)
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");
  const isAusPhone =
    /^(?:\+?61|0)4\d{8}$/.test(cleanPhone) ||
    /^(?:\+?61|0)[2378]\d{8}$/.test(cleanPhone) ||
    cleanPhone.length >= 8;

  if (!isAusPhone) {
    return {
      status: "error",
      message: "Please enter a valid phone number (e.g. 0400 000 000).",
    };
  }

  // Extract request metadata for HubSpot & logging
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "Unknown";
  const forwardedFor = headersList.get("x-forwarded-for");
  const remoteIp = forwardedFor
    ? forwardedFor.split(",")[0].trim()
    : headersList.get("x-real-ip") || undefined;

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

  const adPlatform = gclid ? "Google Ads" : fbclid ? "Meta" : "Organic / direct";
  const firstName = name.split(" ")[0] || name;
  const lastName = name.split(" ").slice(1).join(" ") || "-";

  // Map service interest to valid HubSpot enums:
  // "Injury or pain" | "Chronic condition" | "Post-surgery rehabilitation" | "Getting stronger / staying active" | "Not sure yet"
  const serviceInterest = subjectParam === "ep" ? "Injury or pain" : "Not sure yet";
  // Funding pathway enum: "Not yet known"
  const fundingPathway = "Not yet known";

  // ── Primary Path: Submit to HubSpot Forms API ────────────────────────────
  // HubSpot is configured to automatically email admin@valenhealth.com.au
  // and route the lead to CRM with hs_lead_status = "NEW".
  const hsResult = await submitToHubSpotForm(
    CONTACT_FORM_GUID,
    [
      { name: "firstname", value: firstName },
      { name: "lastname", value: lastName },
      { name: "email", value: email },
      { name: "phone", value: phone },
      { name: "valen_service_interest", value: serviceInterest },
      { name: "valen_funding_pathway", value: fundingPathway },
      { name: "message", value: message },
      { name: "subject", value: subjectParam === "ep" ? "Exercise Physiology Appointment" : "Website Enquiry" },
      { name: "valen_gclid", value: gclid },
      { name: "valen_fbclid", value: fbclid },
      { name: "valen_utm_source", value: utmSource },
      { name: "valen_utm_medium", value: utmMedium },
      { name: "valen_utm_campaign", value: utmCampaign },
      { name: "valen_utm_term", value: utmTerm },
      { name: "valen_utm_content", value: utmContent },
      { name: "valen_landing_page", value: landingPage || "https://valenhealth.com.au/contact" },
      { name: "valen_referrer_url", value: referrer },
      { name: "valen_ad_platform", value: adPlatform },
      { name: "valen_lead_source_detail", value: "Contact form" },
      { name: "hs_lead_status", value: "NEW" },
    ],
    {
      pageUri: landingPage || "https://valenhealth.com.au/contact",
      pageName: "Contact - Valen Health",
      hutk: hutk || undefined,
      ipAddress: remoteIp,
    },
    "contact form",
  );

  // ── Secondary Path: Best-effort backup internal notification via SMTP ─────
  // If SMTP is working, this delivers an immediate email.
  // If Gmail rejects credentials or Vercel blocks port, it logs and does NOT block the user.
  try {
    const textBody = `New Website Contact Lead:

Name: ${name}
Phone: ${phone}
Email: ${email}
Message: ${message}

---
Date: ${dateStr}
Time: ${timeStr}
Page URL: https://valenhealth.com.au/contact/
User Agent: ${userAgent}
Remote IP: ${remoteIp || "Unknown"}`;

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

    await transporter.sendMail({
      from: `"Valen Health Contact" <${process.env.SMTP_USER || "admin@valenhealth.com.au"}>`,
      to: "admin@valenhealth.com.au",
      replyTo: email,
      subject: subjectParam === "ep" ? "Exercise Physiology Appointment Enquiry" : `New Website Lead: ${name}`,
      text: textBody,
      html: htmlBody,
    });
  } catch (mailErr) {
    console.error("Backup contact email notification failed (HubSpot handles primary delivery):", mailErr);
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
    console.error("Meta CAPI dispatch error on contact lead:", capiErr);
  }

  if (!hsResult.ok) {
    console.error("HubSpot submission failed for contact form:", hsResult.status, hsResult.body);
    return {
      status: "error",
      message:
        "Something went wrong sending your message. Please call us directly on 0489 293 000 or email admin@valenhealth.com.au.",
    };
  }

  return {
    status: "success",
    message: "Thank you! Your message has been sent. We'll be in touch within one business day.",
  };
}
