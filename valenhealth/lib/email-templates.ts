/**
 * Styled HTML email templates for Valen Health
 * Brand: Orange #ed6c15, Black #000, Cream #FBF1E6
 */

// ── Shared wrapper ─────────────────────────────────────────────────
function emailWrapper(title: string, content: string, footerNote?: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background-color:#ed6c15;padding:28px 36px;text-align:center;">
              <h1 style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:22px;font-weight:800;color:#000000;letter-spacing:0.04em;text-transform:uppercase;">VALEN HEALTH</h1>
              <p style="margin:4px 0 0;font-family:Georgia,serif;font-style:italic;font-size:13px;color:#000000;opacity:0.7;">Move with Purpose</p>
            </td>
          </tr>

          <!-- Title bar -->
          <tr>
            <td style="background-color:#000000;padding:14px 36px;">
              <h2 style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;font-weight:600;color:#ed6c15;letter-spacing:0.1em;text-transform:uppercase;">${title}</h2>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 36px 16px;">
              ${content}
            </td>
          </tr>

          <!-- Footer note -->
          ${footerNote ? `
          <tr>
            <td style="padding:0 36px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-top:1px solid #eee;padding-top:20px;">
                    <p style="margin:0;font-size:12px;color:#999;line-height:1.5;">${footerNote}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ` : ''}

          <!-- Footer -->
          <tr>
            <td style="background-color:#1a1a1a;padding:24px 36px;text-align:center;">
              <p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;color:#666;letter-spacing:0.06em;">
                &copy; ${new Date().getFullYear()} Valen Health &mdash; Spearwood, WA
              </p>
              <p style="margin:6px 0 0;font-size:11px;">
                <a href="https://valenhealth.com.au" style="color:#ed6c15;text-decoration:none;">valenhealth.com.au</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ── Section builder ────────────────────────────────────────────────
function section(heading: string, rows: [string, string][]): string {
  const rowsHtml = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:8px 12px;font-size:13px;font-weight:600;color:#555;white-space:nowrap;vertical-align:top;border-bottom:1px solid #f5f5f5;width:160px;">${label}</td>
        <td style="padding:8px 12px;font-size:14px;color:#222;border-bottom:1px solid #f5f5f5;word-break:break-word;">${escapeHtml(value) || '<span style="color:#ccc;">—</span>'}</td>
      </tr>`
    )
    .join("");

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      <tr>
        <td colspan="2" style="padding:10px 12px;background-color:#FBF1E6;border-left:3px solid #ed6c15;border-radius:3px;">
          <h3 style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:12px;font-weight:700;color:#000;letter-spacing:0.1em;text-transform:uppercase;">${heading}</h3>
        </td>
      </tr>
      ${rowsHtml}
    </table>`;
}

// ── HTML escape ────────────────────────────────────────────────────
function escapeHtml(str: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ── Metadata section (shared across both) ──────────────────────────
function metadataSection(data: { date: string; time: string; pageUrl: string; userAgent: string; remoteIp: string }): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:8px;">
      <tr>
        <td style="border-top:1px solid #eee;padding-top:16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;border-radius:6px;padding:4px;">
            <tr>
              <td style="padding:6px 12px;font-size:11px;color:#999;">📅 ${data.date} at ${data.time}</td>
            </tr>
            <tr>
              <td style="padding:6px 12px;font-size:11px;color:#999;">🔗 ${data.pageUrl}</td>
            </tr>
            <tr>
              <td style="padding:6px 12px;font-size:11px;color:#999;">🌐 IP: ${data.remoteIp}</td>
            </tr>
            <tr>
              <td style="padding:6px 12px;font-size:11px;color:#999;word-break:break-all;">🖥️ ${escapeHtml(data.userAgent)}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>`;
}

// ── CONTACT FORM EMAIL ─────────────────────────────────────────────
export function buildContactEmailHtml(data: {
  name: string;
  phone: string;
  email: string;
  message: string;
  date: string;
  time: string;
  userAgent: string;
  remoteIp: string;
}): string {
  const content = `
    ${section("Contact Details", [
      ["Name", data.name],
      ["Phone", data.phone || "Not provided"],
      ["Email", data.email],
    ])}

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      <tr>
        <td style="padding:10px 12px;background-color:#FBF1E6;border-left:3px solid #ed6c15;border-radius:3px;">
          <h3 style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:12px;font-weight:700;color:#000;letter-spacing:0.1em;text-transform:uppercase;">Message</h3>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 12px;font-size:14px;color:#222;line-height:1.7;background:#fafafa;border-radius:0 0 6px 6px;">
          ${escapeHtml(data.message).replace(/\n/g, "<br/>")}
        </td>
      </tr>
    </table>

    ${metadataSection({
      date: data.date,
      time: data.time,
      pageUrl: "https://valenhealth.com.au/contact/",
      userAgent: data.userAgent,
      remoteIp: data.remoteIp,
    })}`;

  return emailWrapper("New Website Lead", content);
}

// ── REFERRAL FORM EMAIL ────────────────────────────────────────────
export function buildReferralEmailHtml(data: {
  yourName: string;
  yourEmail: string;
  yourMobile: string;
  scheme: string;
  clientName: string;
  clientEmail: string;
  clientMobile: string;
  claimNumber: string;
  injuryCondition: string;
  certification: string;
  agentCompany: string;
  agentContact: string;
  agentEmail: string;
  agentPhone: string;
  doctorName: string;
  practiceName: string;
  doctorEmail: string;
  doctorPhone: string;
  streetAddress: string;
  city: string;
  state: string;
  postcode: string;
  employerCompany: string;
  employerContact: string;
  employerEmail: string;
  employerPhone: string;
  alliedCompany: string;
  alliedContact: string;
  alliedEmail: string;
  alliedPhone: string;
  additionalInfo: string;
  date: string;
  time: string;
  userAgent: string;
  remoteIp: string;
}): string {
  // Build the doctor address in one line
  const addressParts = [data.streetAddress, data.city, data.state, data.postcode].filter(Boolean);
  const fullAddress = addressParts.join(", ");

  const content = `
    <!-- Scheme badge -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      <tr>
        <td style="text-align:center;padding:12px;">
          <span style="display:inline-block;background:#ed6c15;color:#000;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:8px 20px;border-radius:20px;">
            ${escapeHtml(data.scheme)}
          </span>
        </td>
      </tr>
    </table>

    ${section("Referrer Details", [
      ["Full Name", data.yourName],
      ["Email", data.yourEmail],
      ["Mobile", data.yourMobile],
    ])}

    ${section("Client Information", [
      ["Full Name", data.clientName],
      ["Email", data.clientEmail],
      ["Mobile", data.clientMobile],
      ["Claim Number", data.claimNumber],
      ["Injury / Condition", data.injuryCondition],
      ["Current Certification", data.certification],
    ])}

    ${section("Case Manager / Agent", [
      ["Company", data.agentCompany],
      ["Contact Person", data.agentContact],
      ["Email", data.agentEmail],
      ["Phone", data.agentPhone],
    ])}

    ${section("Treating Doctor", [
      ["Doctor Name", data.doctorName],
      ["Practice", data.practiceName],
      ["Email", data.doctorEmail],
      ["Phone", data.doctorPhone],
      ["Address", fullAddress],
    ])}

    ${section("Employer Details", [
      ["Company", data.employerCompany],
      ["Contact Person", data.employerContact],
      ["Email", data.employerEmail],
      ["Phone", data.employerPhone],
    ])}

    ${section("Allied Health Provider", [
      ["Company", data.alliedCompany],
      ["Contact Person", data.alliedContact],
      ["Email", data.alliedEmail],
      ["Phone", data.alliedPhone],
    ])}

    ${data.additionalInfo ? `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      <tr>
        <td style="padding:10px 12px;background-color:#FBF1E6;border-left:3px solid #ed6c15;border-radius:3px;">
          <h3 style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:12px;font-weight:700;color:#000;letter-spacing:0.1em;text-transform:uppercase;">Additional Information</h3>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 12px;font-size:14px;color:#222;line-height:1.7;background:#fafafa;border-radius:0 0 6px 6px;">
          ${escapeHtml(data.additionalInfo).replace(/\n/g, "<br/>")}
        </td>
      </tr>
    </table>
    ` : ''}

    ${metadataSection({
      date: data.date,
      time: data.time,
      pageUrl: "https://valenhealth.com.au/make-a-referral/",
      userAgent: data.userAgent,
      remoteIp: data.remoteIp,
    })}`;

  return emailWrapper(
    `New Referral — ${escapeHtml(data.yourName)}`,
    content,
    `📎 Check for any file attachment in this email.`
  );
}

// ── ASSESSMENT REQUEST EMAIL ───────────────────────────────────────
export function buildAssessmentEmailHtml(data: {
  concern: string;
  funding: string;
  firstName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  userAgent: string;
  remoteIp: string;
}): string {
  const content = `
    ${section("Patient Assessment Request", [
      ["First Name", data.firstName],
      ["Mobile Phone", data.phone],
      ["Email", data.email],
      ["Primary Concern", data.concern],
      ["Funding / Payment", data.funding],
    ])}

    ${metadataSection({
      date: data.date,
      time: data.time,
      pageUrl: "https://valenhealth.com.au/getstarted",
      userAgent: data.userAgent,
      remoteIp: data.remoteIp,
    })}`;

  return emailWrapper("New Assessment Request", content);
}

