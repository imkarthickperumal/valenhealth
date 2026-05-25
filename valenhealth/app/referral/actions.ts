"use server";

import nodemailer from "nodemailer";
import { headers } from "next/headers";
import { sendMetaCapiEvent } from "../../lib/meta-capi";
import { buildReferralEmailHtml } from "../../lib/email-templates";

export type FormState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function sendReferralEmail(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // ── Extract all form fields ──────────────────────────────────────────────
  const yourName        = formData.get("yourName")        as string;
  const yourEmail       = formData.get("yourEmail")       as string;
  const yourMobile      = formData.get("yourMobile")      as string;
  const scheme          = formData.get("scheme")          as string;

  const clientName      = formData.get("clientName")      as string;
  const clientEmail     = formData.get("clientEmail")     as string;
  const clientMobile    = formData.get("clientMobile")    as string;
  const claimNumber     = formData.get("claimNumber")     as string;
  const injuryCondition = formData.get("injuryCondition") as string;
  const certification   = formData.get("certification")   as string;

  const agentCompany    = formData.get("agentCompany")    as string;
  const agentContact    = formData.get("agentContact")    as string;
  const agentEmail      = formData.get("agentEmail")      as string;
  const agentPhone      = formData.get("agentPhone")      as string;

  const doctorName      = formData.get("doctorName")      as string;
  const practiceName    = formData.get("practiceName")    as string;
  const doctorEmail     = formData.get("doctorEmail")     as string;
  const doctorPhone     = formData.get("doctorPhone")     as string;
  const streetAddress   = formData.get("streetAddress")   as string;
  const city            = formData.get("city")            as string;
  const state           = formData.get("state")           as string;
  const postcode        = formData.get("postcode")        as string;

  const employerCompany = formData.get("employerCompany") as string;
  const employerContact = formData.get("employerContact") as string;
  const employerEmail   = formData.get("employerEmail")   as string;
  const employerPhone   = formData.get("employerPhone")   as string;

  const alliedCompany   = formData.get("alliedCompany")   as string;
  const alliedContact   = formData.get("alliedContact")   as string;
  const alliedEmail     = formData.get("alliedEmail")     as string;
  const alliedPhone     = formData.get("alliedPhone")     as string;

  const additionalInfo  = formData.get("additionalInfo")  as string;

  // ── Optional file attachment ─────────────────────────────────────────────
  const attachment = formData.get("attachment") as File | null;
  const attachments: nodemailer.SendMailOptions["attachments"] = [];

  if (attachment && typeof attachment !== "string" && "size" in attachment && attachment.size > 0) {
    const buffer = Buffer.from(await attachment.arrayBuffer());
    attachments.push({
      filename: attachment.name,
      content: buffer,
    });
  }

  // ── Extract Metadata ──────────────────────────────────────────────────────
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "Unknown";
  const forwardedFor = headersList.get("x-forwarded-for");
  const remoteIp = forwardedFor ? forwardedFor.split(",")[0].trim() : (headersList.get("x-real-ip") || "Unknown");

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    timeZone: "Australia/Perth",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  const timeStr = now.toLocaleTimeString("en-US", {
    timeZone: "Australia/Perth",
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  }).toLowerCase();

  // ── Build Plain Text Body (fallback) ──────────────────────────────────────
  const textBody = `Your Full Name: ${yourName}
Your Email: ${yourEmail}
Your Mobile: ${yourMobile}
Please Select relevant Scheme: ${scheme}

Clients Full Name: ${clientName}
Clients Email: ${clientEmail}
Clients Mobile: ${clientMobile}
Claim Number: ${claimNumber}
Injury Condition: ${injuryCondition}
Current Certification: ${certification}

Name Of The Company: ${agentCompany}
Contact Person: ${agentContact}
Email: ${agentEmail || ""}
Phone: ${agentPhone}

Doctor Name: ${doctorName}
Name of Practice: ${practiceName}
Email: ${doctorEmail || ""}
Phone: ${doctorPhone}
Street Address: ${streetAddress || ""}
City: ${city || ""}
State: ${state || ""}
Postcode: ${postcode || ""}

Name of Company: ${employerCompany}
Contact Person: ${employerContact}
Email: ${employerEmail}
Phone: ${employerPhone}

Name of Company: ${alliedCompany}
Contact Person: ${alliedContact}
Email: ${alliedEmail}
Phone: ${alliedPhone}

Fill Out/Attach Information: ${additionalInfo || ""}


---

Date: ${dateStr}
Time: ${timeStr}
Page URL: https://valenhealth.com.au/make-a-referral/
User Agent: ${userAgent}
Remote IP: ${remoteIp}`;

  // Build professionally styled HTML email
  const htmlBody = buildReferralEmailHtml({
    yourName,
    yourEmail,
    yourMobile,
    scheme,
    clientName,
    clientEmail,
    clientMobile,
    claimNumber,
    injuryCondition,
    certification,
    agentCompany,
    agentContact,
    agentEmail,
    agentPhone,
    doctorName,
    practiceName,
    doctorEmail,
    doctorPhone,
    streetAddress,
    city,
    state,
    postcode,
    employerCompany,
    employerContact,
    employerEmail,
    employerPhone,
    alliedCompany,
    alliedContact,
    alliedEmail,
    alliedPhone,
    additionalInfo,
    date: dateStr,
    time: timeStr,
    userAgent,
    remoteIp,
  });

  // ── Send via Nodemailer ──────────────────────────────────────────────────
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",   // true for port 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      connectionTimeout: 8000, // 8 seconds
      timeout: 8000,           // 8 seconds
    } as any);

    await transporter.sendMail({
      from: `"Valen Health Referrals" <${process.env.SMTP_USER}>`,
      to: process.env.REFERRAL_TO_EMAIL,
      replyTo: yourEmail,
      subject: `New Referral from ${yourName}`,
      text: textBody,
      html: htmlBody,
      attachments,
    });

    // Dispatch Conversions API event to Meta
    try {
      await sendMetaCapiEvent({
        eventName: "Lead",
        eventUrl: "https://valenhealth.com.au/referral",
        userData: {
          email: yourEmail,
          phone: yourMobile,
          firstName: yourName.split(" ")[0],
          lastName: yourName.split(" ").slice(1).join(" ") || undefined,
        },
      });
    } catch (capiErr) {
      console.error("Meta CAPI dispatch error:", capiErr);
    }

    return { status: "success", message: "Your referral has been sent successfully! We will be in touch within 24 hours." };
  } catch (err) {
    console.error("Referral email error:", err);
    return { status: "error", message: "Something went wrong. Please try again or contact us directly." };
  }
}
