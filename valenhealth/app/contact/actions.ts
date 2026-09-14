"use server";

import { headers } from "next/headers";
import { sendMetaCapiEvent } from "../../lib/meta-capi";
import { buildContactEmailHtml } from "../../lib/email-templates";
import { transporter } from "../../lib/mailer";
import { submitToHubSpotForm } from "../../lib/hubspot";

// Same HubSpot form the booking form submits to (portal 443661932) — there's
// no separate contact-page form GUID, so this is shared and told apart by
// valen_lead_source_detail below.
const CONTACT_FORM_GUID = "0972e88a-2491-4874-8bbc-49c498fdef29";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function sendContactEmail(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;
  const subjectParam = formData.get("subject") as string;
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
    return { status: "error", message: "Please fill in all required fields." };
  }

  // Extract metadata
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "Unknown";
  const forwardedFor = headersList.get("x-forwarded-for");
  const remoteIp = forwardedFor ? forwardedFor.split(",")[0].trim() : (headersList.get("x-real-ip") || "Unknown");

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    timeZone: "Australia/Perth",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeStr = now.toLocaleTimeString("en-US", {
    timeZone: "Australia/Perth",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).toLowerCase();

  // Create clean body text matching the requested style
  const textBody = `New Website Lead Details:

Name: ${name}
Phone: ${phone || "Not provided"}
Email: ${email}
Message: ${message}

---

Date: ${dateStr}
Time: ${timeStr}
Page URL: https://valenhealth.com.au/contact/
User Agent: ${userAgent}
Remote IP: ${remoteIp}`;

  // Build professionally styled HTML email
  const htmlBody = buildContactEmailHtml({
    name,
    phone,
    email,
    message,
    date: dateStr,
    time: timeStr,
    userAgent,
    remoteIp,
  });

  const adPlatform = gclid ? "Google Ads" : fbclid ? "Meta" : "Organic / direct";

  // Best-effort — a failure here is logged server-side but never blocks the
  // visitor's email confirmation.
  await submitToHubSpotForm(
    CONTACT_FORM_GUID,
    [
      { name: "firstname", value: name.split(" ")[0] || name },
      { name: "lastname", value: name.split(" ").slice(1).join(" ") || "-" },
      { name: "email", value: email },
      { name: "phone", value: phone || "" },
      { name: "message", value: message },
      { name: "valen_gclid", value: gclid },
      { name: "valen_fbclid", value: fbclid },
      { name: "valen_utm_source", value: utmSource },
      { name: "valen_utm_medium", value: utmMedium },
      { name: "valen_utm_campaign", value: utmCampaign },
      { name: "valen_utm_term", value: utmTerm },
      { name: "valen_utm_content", value: utmContent },
      { name: "valen_landing_page", value: landingPage },
      { name: "valen_referrer_url", value: referrer },
      { name: "valen_ad_platform", value: adPlatform },
      { name: "valen_lead_source_detail", value: "Contact form" },
      { name: "hs_lead_status", value: "NEW" },
    ],
    {
      pageUri: landingPage || "https://valenhealth.com.au/contact",
      pageName: "Contact - Valen Health",
      hutk: hutk || undefined,
      ipAddress: remoteIp !== "Unknown" ? remoteIp : undefined,
    },
    "contact form",
  );

  try {
    await transporter.sendMail({
      from: `"Valen Health Contact" <${process.env.SMTP_USER}>`,
      to: "admin@valenhealth.com.au",
      replyTo: email,
      subject: subjectParam === "ep" ? "Exercise Physiology Appointment" : "New Website Lead",
      text: textBody,
      html: htmlBody,
    });

    // Dispatch Conversions API event to Meta
    try {
      await sendMetaCapiEvent({
        eventName: "Lead",
        eventUrl: "https://valenhealth.com.au/contact",
        userData: {
          email: email,
          phone: phone || undefined,
          firstName: name.split(" ")[0],
          lastName: name.split(" ").slice(1).join(" ") || undefined,
        },
      });
    } catch (capiErr) {
      console.error("Meta CAPI dispatch error on contact lead:", capiErr);
    }

    return {
      status: "success",
      message: "Thank you! Your message has been sent successfully. We will be in touch shortly.",
    };
  } catch (err) {
    console.error("Contact email error:", err);
    return {
      status: "error",
      message: "Something went wrong sending your message. Please try again or contact us directly.",
    };
  }
}
