/**
 * Resend-based email sender for Valen Health admin notifications.
 *
 * Resend is used instead of Nodemailer/Gmail SMTP because:
 *  - Vercel blocks outbound port 587 (STARTTLS).
 *  - Gmail App Passwords are frequently revoked when DNS / Google Workspace
 *    settings change.
 *  - Resend works over HTTPS so it's never blocked on Vercel.
 *
 * Setup (one-time, ~2 minutes):
 *  1. Sign up free at https://resend.com
 *  2. Add & verify your domain (valenhealth.com.au) — Resend guides you.
 *  3. Create an API key (Resend dashboard → API Keys → Create API Key).
 *  4. Add RESEND_API_KEY=re_xxxxxxxxxx to:
 *       • d:\valen\valenhealth\.env.local  (local dev)
 *       • Vercel project settings → Environment Variables  (production)
 *  5. Set RESEND_FROM="Valen Health <noreply@valenhealth.com.au>" in both places.
 *     (or leave it unset to use the default below)
 *
 * The API key must be configured for email delivery. The caller receives a
 * false result when configuration or delivery fails.
 */

import { Resend } from "resend";

// Lazily create a client only when an API key exists, to avoid throwing at
// module-load time when the env var is missing (e.g. during local dev before
// the key is added).
function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export type AdminEmailPayload = {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

/**
 * Send an admin notification email via Resend.
 *
 * Failures are logged server-side and reported to the caller.
 */
export async function sendAdminEmail(payload: AdminEmailPayload): Promise<boolean> {
  const resend = getResend();
  if (!resend) {
    console.error(
      "[resend-mailer] RESEND_API_KEY is not set — skipping admin notification email. " +
        "Add the key to .env.local and Vercel to enable email delivery."
    );
    return false;
  }

  const from =
    process.env.RESEND_FROM || "Valen Health <noreply@valenhealth.com.au>";

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: ["admin@valenhealth.com.au"],
      replyTo: payload.replyTo,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
    });

    if (error) {
      console.error("[resend-mailer] Resend returned an error:", error);
      return false;
    } else {
      console.log("[resend-mailer] Admin notification sent. ID:", data?.id);
      return true;
    }
  } catch (err) {
    console.error("[resend-mailer] Unexpected error sending admin notification:", err);
    return false;
  }
}
