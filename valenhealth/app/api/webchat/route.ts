import { NextRequest, NextResponse } from "next/server";
import { generateReply } from "../whatsapp/route";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Generate reply using the same logic as the WhatsApp bot
    const reply = generateReply(message);

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Webchat error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
