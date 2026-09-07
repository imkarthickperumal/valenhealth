"use server";

import { headers } from "next/headers";
import { sendMetaCapiEvent } from "../../lib/meta-capi";
import { buildAssessmentEmailHtml } from "../../lib/email-templates";
import { transporter } from "../../lib/mailer";

export type AssessmentFormState = {
  status: "idle" | "loading" | "success" | "error";
  message: string;
};

function mapPreferredContactTimeToText(time?: string): string {
  switch (time) {
    case "Morning (9-12)":
      return "this morning or first thing tomorrow";
    case "Midday (12-2)":
      return "around midday";
    case "Afternoon (2-5)":
      return "this afternoon";
    case "After 5pm":
      return "after 5pm";
    case "Any time":
    default:
      return "on the next working day";
  }
}

export async function sendAssessmentEmail(
  data: {
    concern: string;
    funding: string;
    firstName: string;
    phone: string;
    email?: string;
    preferredContactTime?: string;
  }
): Promise<AssessmentFormState> {
  const { concern, funding, firstName, phone, email, preferredContactTime } = data;

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

  // Extract metadata
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

  try {
    // 1. Existing notification email to admin@valenhealth.com.au
    await transporter.sendMail({
      from: `"Valen Health Assessment" <${process.env.SMTP_USER}>`,
      to: "admin@valenhealth.com.au",
      replyTo: email?.trim() ? email.trim() : undefined,
      subject: `New Assessment Request: ${firstName} (${concern})`,
      text: textBody,
      html: htmlBody,
    });

    // 2. Auto-acknowledgement email to the person enquiring (if email was provided)
    if (email && email.trim()) {
      const recipientEmail = email.trim();
      const contactTimeText = mapPreferredContactTimeToText(preferredContactTime);

      const ackText = `Hi ${firstName},

Thanks for getting in touch with Valen Health.

We've received your enquiry and one of our friendly staff will call you ${contactTimeText} to get you booked in.

When we speak we'll cover:
- what's been going on, and what you want to get back to
- how your sessions are funded - most people are covered through Medicare, private health or their workplace insurer
- a time that suits you for your assessment

If you need us before then, call 0489 293 000.

Valen Health
Spearwood, WA · 0489 293 000
admin@valenhealth.com.au
valenhealth.com.au`;

      const ackHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:24px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#222222;background-color:#ffffff;">
  <div style="max-width:560px;margin:0 auto;">
    <p style="margin:0 0 16px;">Hi ${firstName},</p>
    <p style="margin:0 0 16px;">Thanks for getting in touch with Valen Health.</p>
    <p style="margin:0 0 16px;">We've received your enquiry and one of our friendly staff will call you ${contactTimeText} to get you booked in.</p>
    <p style="margin:0 0 8px;">When we speak we'll cover:</p>
    <ul style="margin:0 0 16px;padding-left:20px;color:#222222;">
      <li style="margin-bottom:6px;">what's been going on, and what you want to get back to</li>
      <li style="margin-bottom:6px;">how your sessions are funded - most people are covered through Medicare, private health or their workplace insurer</li>
      <li style="margin-bottom:6px;">a time that suits you for your assessment</li>
    </ul>
    <p style="margin:0 0 24px;">If you need us before then, call <a href="tel:0489293000" style="color:#222222;text-decoration:none;font-weight:600;">0489 293 000</a>.</p>
    
    <div style="border-top:1px solid #eeeeee;padding-top:16px;margin-top:24px;font-size:13px;color:#666666;line-height:1.5;">
      <p style="margin:0;font-weight:600;color:#222222;">Valen Health</p>
      <p style="margin:4px 0 0;">Spearwood, WA &middot; 0489 293 000</p>
      <p style="margin:4px 0 0;"><a href="mailto:admin@valenhealth.com.au" style="color:#ed6c15;text-decoration:none;">admin@valenhealth.com.au</a></p>
      <p style="margin:4px 0 0;"><a href="https://valenhealth.com.au" style="color:#ed6c15;text-decoration:none;">valenhealth.com.au</a></p>
    </div>
  </div>
</body>
</html>`;

      try {
        await transporter.sendMail({
          from: `"Valen Health" <admin@valenhealth.com.au>`,
          to: recipientEmail,
          subject: "We've got your enquiry - we'll call you shortly",
          text: ackText,
          html: ackHtml,
        });
      } catch (ackErr) {
        console.error("Auto-acknowledgement email failed to send:", ackErr);
        // Non-blocking: form submission and admin email remain successful
      }
    }

    try {
      await sendMetaCapiEvent({
        eventName: "Lead",
        eventUrl: "https://valenhealth.com.au/getstarted",
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
  } catch (error) {
    console.error("Error sending assessment email:", error);
    return {
      status: "error",
      message: "Something went wrong sending your request. Please try calling us directly at 0489 293 000.",
    };
  }
}
