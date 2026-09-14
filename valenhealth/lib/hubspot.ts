const HUBSPOT_PORTAL_ID = "443661932";

export type HubSpotSubmitResult = {
  ok: boolean;
  status: number;
  body: string;
};

// Server-side only: submits a HubSpot Forms API request and always logs a
// failure with its status and body, so a rejected lead can never go missing
// silently (it used to be a client-side fetch whose errors only ever reached
// a visitor's browser console).
export async function submitToHubSpotForm(
  formGuid: string,
  fields: { name: string; value: string }[],
  context: { pageUri: string; pageName: string; hutk?: string; ipAddress?: string },
  logLabel: string,
): Promise<HubSpotSubmitResult> {
  const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${formGuid}`;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: fields.filter((f) => f.value !== "" && f.value != null),
        context,
      }),
    });

    const body = await res.text().catch(() => "");

    if (!res.ok) {
      console.error(`HubSpot submission rejected (${logLabel}):`, res.status, body);
    }

    return { ok: res.ok, status: res.status, body };
  } catch (err) {
    console.error(`HubSpot submission threw (${logLabel}):`, err);
    return {
      ok: false,
      status: 0,
      body: err instanceof Error ? err.message : String(err),
    };
  }
}
