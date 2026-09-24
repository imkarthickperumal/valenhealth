// ── Environment variables ──────────────────────────────────────────
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN || "";
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID || "";

// ── Reply Logic ────────────────────────────────────────────────────
export function generateReply(incoming: string): string {
  const text = incoming.toLowerCase().trim();

  // Greeting
  if (["hi", "hello", "hey", "hii", "hola"].some((g) => text.startsWith(g))) {
    return (
      "👋 Hello! Welcome to *Valen Health*.\n\n" +
      "How can we help you today?\n\n" +
      "1️⃣ Book a session\n" +
      "2️⃣ Our services\n" +
      "3️⃣ Pricing & plans\n" +
      "4️⃣ Location & hours\n" +
      "5️⃣ Talk to our team"
    );
  }

  // Menu option 1
  if (text === "1" || text.includes("book") || text.includes("appointment") || text.includes("session")) {
    return (
      "📅 *Book a Session*\n\n" +
      "We'd love to help you get started!\n" +
      "Please visit our booking page:\n" +
      "🔗 https://valenhealth.com/join\n\n" +
      "Or reply with your preferred date and time, and our team will get back to you shortly."
    );
  }

  // Menu option 2
  if (text === "2" || text.includes("service")) {
    return (
      "💪 *Our Services*\n\n" +
      "• Exercise Physiology\n" +
      "• Strength & Conditioning\n" +
      "• Rehabilitation Programs\n" +
      "• Group Training Sessions\n" +
      "• Nutrition Guidance\n\n" +
      "Reply with a service name for more details, or type *5* to talk to our team."
    );
  }

  // Menu option 3
  if (text === "3" || text.includes("price") || text.includes("plan") || text.includes("cost")) {
    return (
      "💰 *Pricing & Plans*\n\n" +
      "We offer flexible plans tailored to your goals:\n\n" +
      "• Initial Consultation — *Free*\n" +
      "• Individual Session — from $80\n" +
      "• Weekly Pack (3 sessions) — from $210\n" +
      "• Monthly Membership — from $699\n\n" +
      "Reply *5* to chat with our team for a personalized quote."
    );
  }

  // Menu option 4
  if (text === "4" || text.includes("location") || text.includes("hour") || text.includes("address") || text.includes("where")) {
    return (
      "📍 *Location & Hours*\n\n" +
      "Valen Health\n" +
      "Spearwood, Perth WA\n\n" +
      "🕒 *Staffed Hours:*\n" +
      "Mon–Fri: 6:00 AM – 8:00 PM\n" +
      "Sat: 7:00 AM – 2:00 PM\n" +
      "Sun: Closed (24/7 Access for Members)\n\n" +
      "24/7 member access available!"
    );
  }

  // Menu option 5
  if (text === "5" || text.includes("talk") || text.includes("team") || text.includes("human") || text.includes("agent")) {
    return (
      "🙋 *Connect with Our Team*\n\n" +
      "A member of the Valen Health team will reach out to you shortly.\n\n" +
      "In the meantime, feel free to ask any questions here!"
    );
  }

  // Thank you
  if (text.includes("thank") || text.includes("thanks")) {
    return "🙏 You're welcome! Feel free to reach out anytime. Have a great day!";
  }

  // Default fallback
  return (
    "Thanks for your message! 🏋️\n\n" +
    "I'm the Valen Health assistant. Here's what I can help with:\n\n" +
    "1️⃣ Book a session\n" +
    "2️⃣ Our services\n" +
    "3️⃣ Pricing & plans\n" +
    "4️⃣ Location & hours\n" +
    "5️⃣ Talk to our team\n\n" +
    "Just reply with a number or type your question!"
  );
}

// ── Send a WhatsApp message via Meta Cloud API ─────────────────────
export async function sendWhatsAppMessage(to: string, text: string) {
  const url = `https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}/messages`;

  const payload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to,
    type: "text",
    text: { preview_url: false, body: text },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${WHATSAPP_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("❌ Failed to send message:", JSON.stringify(data, null, 2));
  } else {
    console.log(`✅ Reply sent to ${to}`);
  }

  return data;
}
