import { NextRequest, NextResponse } from "next/server";
import { generateReply, sendWhatsAppMessage } from "../../../lib/whatsapp";

// ── Environment variables ──────────────────────────────────────────
const VERIFY_TOKEN = process.env.VERIFY_TOKEN!;

// ── GET  →  Webhook Verification (called once by Meta) ─────────────
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("✅ Webhook verified successfully");
    return new NextResponse(challenge, { status: 200 });
  }

  console.warn("⚠️ Webhook verification failed — token mismatch");
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

// ── POST →  Incoming WhatsApp Messages ─────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Meta sends a specific structure; drill into it
    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;

    // Only process actual user messages (not status updates)
    if (value?.messages) {
      const message = value.messages[0];
      const from = message.from; // sender's phone number (e.g. "919876543210")
      const msgType = message.type;

      console.log(`📩 Message from ${from} | type: ${msgType}`);

      // Handle different message types
      let incomingText = "";

      if (msgType === "text") {
        incomingText = message.text.body;
      } else if (msgType === "image") {
        incomingText = message.image?.caption || "[Image]";
      } else if (msgType === "audio") {
        incomingText = "[Audio message]";
      } else if (msgType === "document") {
        incomingText = message.document?.filename || "[Document]";
      } else if (msgType === "location") {
        incomingText = `[Location: ${message.location?.latitude}, ${message.location?.longitude}]`;
      } else if (msgType === "interactive") {
        // Button replies or list replies
        incomingText =
          message.interactive?.button_reply?.title ||
          message.interactive?.list_reply?.title ||
          "[Interactive]";
      } else {
        incomingText = `[${msgType}]`;
      }

      console.log(`💬 Content: ${incomingText}`);

      // Generate a reply
      const replyText = generateReply(incomingText);

      // Send the reply back via Meta Cloud API
      await sendWhatsAppMessage(from, replyText);
    }

    // Always return 200 to acknowledge receipt (Meta expects this)
    return NextResponse.json({ status: "ok" }, { status: 200 });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    // Still return 200 so Meta doesn't retry endlessly
    return NextResponse.json({ status: "error" }, { status: 200 });
  }
}
