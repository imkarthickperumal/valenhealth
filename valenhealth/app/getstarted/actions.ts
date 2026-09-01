"use server";

import { headers } from "next/headers";
import { sendMetaCapiEvent } from "../../lib/meta-capi";
import { buildAssessmentEmailHtml } from "../../lib/email-templates";
import { transporter } from "../../lib/mailer";

export type AssessmentFormState = {
  status: "idle" | "loading" | "success" | "error";
  message: string;
};

export async function sendAssessmentEmail(
  data: {
    concern: string;
    funding: string;
    firstName: string;
    phone: string;
    email: string;
  }
): Promise<AssessmentFormState> {
  const { concern, funding, firstName, phone, email } = data;

  if (!firstName || !phone || !email || !concern || !funding) {
    return { status: "error", message: "Please fill in all required fields." };
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

  const textBody = `New Assessment Request Details:

First Name: ${firstName}
Mobile Phone: ${phone}
Email: ${email}
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
    email,
    date: dateStr,
    time: timeStr,
    userAgent,
    remoteIp,
  });

  try {
    await transporter.sendMail({
      from: `"Valen Health Assessment" <${process.env.SMTP_USER}>`,
      to: "admin@valenhealth.com.au",
      replyTo: email,
      subject: `New Assessment Request: ${firstName} (${concern})`,
      text: textBody,
      html: htmlBody,
    });

    try {
      await sendMetaCapiEvent({
        eventName: "Lead",
        eventUrl: "https://valenhealth.com.au/getstarted",
        userData: {
          email: email,
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
