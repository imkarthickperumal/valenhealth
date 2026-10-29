import { NextRequest, NextResponse } from "next/server";
import { transporter } from "../../../../lib/mailer";
import { submitToHubSpotForm } from "../../../../lib/hubspot";

const WEB_ENQUIRY_FORM_GUID = "0972e88a-2491-4874-8bbc-49c498fdef29";

type ChatMessage = {
  time: string;
  sender: "bot" | "user";
  text: string;
};

function isChatMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== "object") return false;
  const message = value as Record<string, unknown>;
  return (
    typeof message.time === "string" &&
    (message.sender === "bot" || message.sender === "user") &&
    typeof message.text === "string"
  );
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const contactInfo =
      body && typeof body.contactInfo === "string" ? body.contactInfo.trim() : "";
    const history = Array.isArray(body?.history)
      ? body.history.filter(isChatMessage)
      : [];

    if (!contactInfo) {
      return NextResponse.json({ error: "Missing contact info" }, { status: 400 });
    }

    const chatLog = history
      .map((msg: ChatMessage) => `[${msg.time}] ${msg.sender === "bot" ? "Valen Health" : "User"}: ${msg.text}`)
      .join("\n\n");
    const email = contactInfo.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0];
    const phone = contactInfo.match(/\+?[\d][\d\s().-]{6,}\d/)?.[0]?.trim();
    const name = contactInfo
      .replace(email || "", "")
      .replace(phone || "", "")
      .replace(/\b(name|email|phone|mobile)\b\s*:?\s*/gi, "")
      .replace(/[,\n|;]+/g, " ")
      .trim();
    const nameParts = name.split(/\s+/).filter(Boolean);
    const forwardedFor = req.headers.get("x-forwarded-for");
    const remoteIp = forwardedFor
      ? forwardedFor.split(",")[0].trim()
      : req.headers.get("x-real-ip") || undefined;
    const pageUri =
      req.headers.get("referer") || "https://valenhealth.com.au/";

    const hubspotResult = await submitToHubSpotForm(
      WEB_ENQUIRY_FORM_GUID,
      [
        ...(nameParts.length
          ? [{ name: "firstname", value: nameParts[0] }]
          : []),
        ...(nameParts.length > 1
          ? [{ name: "lastname", value: nameParts.slice(1).join(" ") }]
          : []),
        ...(email ? [{ name: "email", value: email }] : []),
        ...(phone ? [{ name: "phone", value: phone }] : []),
        { name: "message", value: `Website chat contact: ${contactInfo}\n\n${chatLog}` },
        { name: "subject", value: "Website chat enquiry" },
        { name: "valen_lead_source_detail", value: "Website chat" },
        { name: "hs_lead_status", value: "NEW" },
      ],
      {
        pageUri,
        pageName: "Website Chat - Valen Health",
        hutk: req.cookies.get("hubspotutk")?.value,
        ipAddress: remoteIp,
      },
      "website chat",
    );

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <div style="background-color: #111; padding: 20px; text-align: center;">
          <h2 style="color: #fff; margin: 0;">New Website Chat Inquiry</h2>
        </div>
        
        <div style="padding: 24px; border: 1px solid #ddd; border-top: none;">
          <p style="font-size: 16px; line-height: 1.5; margin-bottom: 24px;">
            A user on the website requested to contact the team via the Chat Widget.
          </p>
          
          <h3 style="color: #ed6c15; margin-bottom: 12px; font-size: 14px; text-transform: uppercase;">Provided Contact Info:</h3>
          <div style="background-color: #f9f9f9; padding: 16px; border-radius: 8px; margin-bottom: 32px;">
            <p style="margin: 0; font-size: 16px;"><strong>${escapeHtml(contactInfo)}</strong></p>
          </div>

          <h3 style="color: #ed6c15; margin-bottom: 12px; font-size: 14px; text-transform: uppercase;">Chat Transcript:</h3>
          <div style="background-color: #f5f5f5; padding: 16px; border-radius: 8px; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">
${escapeHtml(chatLog)}
          </div>
        </div>
      </div>
    `;

    let emailSent = false;
    try {
      await transporter.sendMail({
        from: `"Valen Health Webchat" <${process.env.SMTP_USER}>`,
        to: "admin@valenhealth.com.au",
        subject: "New Website Chat Inquiry",
        text: `Contact info: ${contactInfo}\n\nChat transcript:\n${chatLog}`,
        html: htmlBody,
      });
      emailSent = true;
    } catch (emailError) {
      console.error("Webchat SMTP notification failed:", emailError);
    }

    // Also forward the notification to the admin WhatsApp number
    try {
      const { sendWhatsAppMessage } = await import("../../../../lib/whatsapp");
      const waMessage = `*New Lead from Webchat*\n\n*Contact Info:* ${contactInfo}\n\n*Transcript:*\n${chatLog}`;
      await sendWhatsAppMessage("61489293000", waMessage);
    } catch (e) {
      console.error("Failed to send WhatsApp notification to admin:", e);
    }

    if (!hubspotResult.ok) {
      return NextResponse.json(
        {
          error: "HubSpot could not accept this chat enquiry.",
          notificationSent: emailSent,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true, notificationSent: emailSent });
  } catch (error) {
    console.error("Webchat notify error:", error);
    return NextResponse.json({ error: "Failed to send notification" }, { status: 500 });
  }
}
