"use server";

import nodemailer from "nodemailer";

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

  // ── Build HTML email body ────────────────────────────────────────────────
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; color: #222;">
      <h2 style="background:#1a1a2e;color:#fff;padding:20px;margin:0;border-radius:6px 6px 0 0;">
        New Referral — Valen Health
      </h2>

      <div style="border:1px solid #ddd;border-top:none;padding:24px;border-radius:0 0 6px 6px;">

        <h3 style="color:#1a1a2e;border-bottom:2px solid #e0e0e0;padding-bottom:6px;">Your Details</h3>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:6px 0;color:#555;width:200px;">Full Name</td><td><strong>${yourName}</strong></td></tr>
          <tr><td style="padding:6px 0;color:#555;">Email</td><td><strong>${yourEmail}</strong></td></tr>
          <tr><td style="padding:6px 0;color:#555;">Mobile</td><td><strong>${yourMobile}</strong></td></tr>
          <tr><td style="padding:6px 0;color:#555;">Scheme</td><td><strong>${scheme}</strong></td></tr>
        </table>

        <h3 style="color:#1a1a2e;border-bottom:2px solid #e0e0e0;padding-bottom:6px;margin-top:24px;">Client Details</h3>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:6px 0;color:#555;width:200px;">Full Name</td><td><strong>${clientName}</strong></td></tr>
          <tr><td style="padding:6px 0;color:#555;">Email</td><td><strong>${clientEmail}</strong></td></tr>
          <tr><td style="padding:6px 0;color:#555;">Mobile</td><td><strong>${clientMobile}</strong></td></tr>
          <tr><td style="padding:6px 0;color:#555;">Claim Number</td><td><strong>${claimNumber}</strong></td></tr>
          <tr><td style="padding:6px 0;color:#555;">Injury / Condition</td><td><strong>${injuryCondition}</strong></td></tr>
          <tr><td style="padding:6px 0;color:#555;vertical-align:top;">Current Certification</td><td><strong>${certification}</strong></td></tr>
        </table>

        <h3 style="color:#1a1a2e;border-bottom:2px solid #e0e0e0;padding-bottom:6px;margin-top:24px;">Agent / Insurance Details</h3>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:6px 0;color:#555;width:200px;">Company</td><td><strong>${agentCompany}</strong></td></tr>
          <tr><td style="padding:6px 0;color:#555;">Contact Person</td><td><strong>${agentContact}</strong></td></tr>
          <tr><td style="padding:6px 0;color:#555;">Email</td><td><strong>${agentEmail}</strong></td></tr>
          <tr><td style="padding:6px 0;color:#555;">Phone</td><td><strong>${agentPhone}</strong></td></tr>
        </table>

        <h3 style="color:#1a1a2e;border-bottom:2px solid #e0e0e0;padding-bottom:6px;margin-top:24px;">Treating Doctor Details</h3>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:6px 0;color:#555;width:200px;">Doctor Name</td><td><strong>${doctorName}</strong></td></tr>
          <tr><td style="padding:6px 0;color:#555;">Practice Name</td><td><strong>${practiceName}</strong></td></tr>
          <tr><td style="padding:6px 0;color:#555;">Email</td><td><strong>${doctorEmail}</strong></td></tr>
          <tr><td style="padding:6px 0;color:#555;">Phone</td><td><strong>${doctorPhone}</strong></td></tr>
          <tr><td style="padding:6px 0;color:#555;">Address</td><td><strong>${streetAddress}, ${city}, ${state} ${postcode}</strong></td></tr>
        </table>

        <h3 style="color:#1a1a2e;border-bottom:2px solid #e0e0e0;padding-bottom:6px;margin-top:24px;">Employer Details</h3>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:6px 0;color:#555;width:200px;">Company</td><td><strong>${employerCompany}</strong></td></tr>
          <tr><td style="padding:6px 0;color:#555;">Contact Person</td><td><strong>${employerContact}</strong></td></tr>
          <tr><td style="padding:6px 0;color:#555;">Email</td><td><strong>${employerEmail}</strong></td></tr>
          <tr><td style="padding:6px 0;color:#555;">Phone</td><td><strong>${employerPhone}</strong></td></tr>
        </table>

        <h3 style="color:#1a1a2e;border-bottom:2px solid #e0e0e0;padding-bottom:6px;margin-top:24px;">Other Allied Health</h3>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:6px 0;color:#555;width:200px;">Company</td><td><strong>${alliedCompany}</strong></td></tr>
          <tr><td style="padding:6px 0;color:#555;">Contact Person</td><td><strong>${alliedContact}</strong></td></tr>
          <tr><td style="padding:6px 0;color:#555;">Email</td><td><strong>${alliedEmail}</strong></td></tr>
          <tr><td style="padding:6px 0;color:#555;">Phone</td><td><strong>${alliedPhone}</strong></td></tr>
        </table>

        ${additionalInfo ? `
        <h3 style="color:#1a1a2e;border-bottom:2px solid #e0e0e0;padding-bottom:6px;margin-top:24px;">Additional Comments / Information</h3>
        <p style="white-space:pre-line;">${additionalInfo}</p>
        ` : ""}

        <p style="margin-top:32px;font-size:12px;color:#999;">
          Submitted via Valen Health Referral Form
        </p>
      </div>
    </div>
  `;

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
      html,
      attachments,
    });

    return { status: "success", message: "Your referral has been sent successfully! We will be in touch within 24 hours." };
  } catch (err) {
    console.error("Referral email error:", err);
    return { status: "error", message: "Something went wrong. Please try again or contact us directly." };
  }
}
