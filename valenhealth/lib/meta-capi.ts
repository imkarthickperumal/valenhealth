import crypto from "crypto";

export const FB_PIXEL_ID = "375321243810867";

interface CapiUserPayload {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  clientIpAddress?: string;
  clientUserAgent?: string;
}

interface CapiEventPayload {
  eventName: "PageView" | "Lead" | "ViewContent" | "CompleteRegistration";
  eventUrl: string;
  eventId?: string;
  userData: CapiUserPayload;
}

/**
 * Standard SHA-256 hashing for Meta user data matching privacy compliance.
 */
function hashData(data?: string): string | null {
  if (!data) return null;
  return crypto.createHash("sha256").update(data.trim().toLowerCase()).digest("hex");
}

/**
 * Sends a server-side conversion event to the Meta Conversions API (CAPI)
 */
export async function sendMetaCapiEvent({
  eventName,
  eventUrl,
  eventId,
  userData,
}: CapiEventPayload) {
  const accessToken = process.env.META_ACCESS_TOKEN;

  if (!accessToken) {
    console.warn(
      `⚠️ Meta Conversions API (CAPI) event "${eventName}" was NOT sent because META_ACCESS_TOKEN is missing in environment variables.`
    );
    return { success: false, reason: "Missing META_ACCESS_TOKEN" };
  }

  // Build the payload matching the Meta Graph API schema:
  // https://developers.facebook.com/docs/marketing-api/conversions-api/parameters
  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: eventUrl,
        action_source: "website",
        event_id: eventId,
        user_data: {
          em: userData.email ? [hashData(userData.email)] : undefined,
          ph: userData.phone ? [hashData(userData.phone)] : undefined,
          fn: userData.firstName ? [hashData(userData.firstName)] : undefined,
          ln: userData.lastName ? [hashData(userData.lastName)] : undefined,
          client_ip_address: userData.clientIpAddress,
          client_user_agent: userData.clientUserAgent,
        },
      },
    ],
  };

  try {
    const url = `https://graph.facebook.com/v19.0/${FB_PIXEL_ID}/events`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    
    if (!response.ok) {
      console.error("❌ Meta Conversions API Error:", result);
      return { success: false, error: result };
    }

    console.log(`✅ Meta Conversions API (CAPI) success: "${eventName}" event successfully dispatched.`);
    return { success: true, result };
  } catch (err) {
    console.error("❌ Failed to contact Meta Conversions API:", err);
    return { success: false, error: err };
  }
}
