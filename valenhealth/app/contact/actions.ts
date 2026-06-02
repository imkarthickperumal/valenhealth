"use server";

import { headers } from "next/headers";
import { sendMetaCapiEvent } from "../../lib/meta-capi";
import { buildContactEmailHtml } from "../../lib/email-templates";
import { transporter } from "../../lib/mailer";

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

  try {
    await transporter.sendMail({
      from: `"Valen Health Contact" <${process.env.SMTP_USER}>`,
      to: "tamilselvan.ask@gmail.com",
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
