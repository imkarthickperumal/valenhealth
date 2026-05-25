import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { contactInfo, history } = await req.json();

    if (!contactInfo) {
      return NextResponse.json({ error: "Missing contact info" }, { status: 400 });
    }

    // Format the chat history into a readable string
    const chatLog = history
      .map((msg: any) => `[${msg.time}] ${msg.sender === "bot" ? "Valen Health" : "User"}: ${msg.text}`)
      .join("\n\n");

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
            <p style="margin: 0; font-size: 16px;"><strong>${contactInfo}</strong></p>
          </div>

          <h3 style="color: #ed6c15; margin-bottom: 12px; font-size: 14px; text-transform: uppercase;">Chat Transcript:</h3>
          <div style="background-color: #f5f5f5; padding: 16px; border-radius: 8px; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">
${chatLog}
          </div>
        </div>
      </div>
    `;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      connectionTimeout: 8000,
      timeout: 8000,
    } as any);

    await transporter.sendMail({
      from: `"Valen Health Webchat" <${process.env.SMTP_USER}>`,
      to: "admin@valenhealth.com.au", // Configured as requested
      subject: "💬 New Website Chat Inquiry",
      html: htmlBody,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webchat notify error:", error);
    return NextResponse.json({ error: "Failed to send notification" }, { status: 500 });
  }
}
