import { NextRequest, NextResponse } from "next/server";
import { generateReply, sendWhatsAppMessage } from "../whatsapp/route";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Forward the user's message to the admin WhatsApp number directly
    try {
      await sendWhatsAppMessage("61489293000", `*New Webchat Message:*\n${message}`);
    } catch (e) {
      console.error("Failed to forward webchat message to admin:", e);
    }

    // Generate reply using the same logic as the WhatsApp bot
    const reply = generateReply(message);

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Webchat error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
