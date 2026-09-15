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

const HUBSPOT_API_BASE = "https://api.hubapi.com";

export type HubSpotContactResult = {
  ok: boolean;
  status: number;
  body: string;
  contactId?: string;
  created?: boolean;
};

// Server-side only: creates or updates a contact via HubSpot's authenticated
// CRM API, keyed on email. Unlike the public Forms API (submitToHubSpotForm
// above), this endpoint has no silent-accept-and-drop anti-spam behavior —
// a rejected write always comes back as a real, non-2xx error, so a failure
// here can be trusted and surfaced to the visitor.
export async function upsertHubSpotContact(
  properties: Record<string, string | undefined>,
  logLabel: string,
): Promise<HubSpotContactResult> {
  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
  if (!token) {
    console.error(
      `HubSpot CRM upsert skipped (${logLabel}): HUBSPOT_PRIVATE_APP_TOKEN is not set`,
    );
    return { ok: false, status: 0, body: "Missing HUBSPOT_PRIVATE_APP_TOKEN" };
  }

  const cleanProperties = Object.fromEntries(
    Object.entries(properties).filter(([, v]) => v !== "" && v != null),
  );

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  try {
    const createRes = await fetch(`${HUBSPOT_API_BASE}/crm/v3/objects/contacts`, {
      method: "POST",
      headers,
      body: JSON.stringify({ properties: cleanProperties }),
    });
    const createBody = await createRes.text().catch(() => "");

    if (createRes.ok) {
      const parsed = JSON.parse(createBody || "{}");
      return {
        ok: true,
        status: createRes.status,
        body: createBody,
        contactId: parsed.id,
        created: true,
      };
    }

    // Duplicate email: HubSpot returns 409 with the existing contact's id
    // embedded in the message ("Contact already exists. Existing ID: 123").
    // Fall back to updating that contact instead of treating this as a failure.
    if (createRes.status === 409) {
      const match = createBody.match(/Existing ID:\s*(\d+)/i);
      const existingId = match?.[1];
      if (existingId) {
        const updateRes = await fetch(
          `${HUBSPOT_API_BASE}/crm/v3/objects/contacts/${existingId}`,
          {
            method: "PATCH",
            headers,
            body: JSON.stringify({ properties: cleanProperties }),
          },
        );
        const updateBody = await updateRes.text().catch(() => "");
        if (!updateRes.ok) {
          console.error(
            `HubSpot CRM update rejected (${logLabel}):`,
            updateRes.status,
            updateBody,
          );
        }
        return {
          ok: updateRes.ok,
          status: updateRes.status,
          body: updateBody,
          contactId: existingId,
          created: false,
        };
      }
    }

    console.error(`HubSpot CRM create rejected (${logLabel}):`, createRes.status, createBody);
    return { ok: false, status: createRes.status, body: createBody };
  } catch (err) {
    console.error(`HubSpot CRM upsert threw (${logLabel}):`, err);
    return {
      ok: false,
      status: 0,
      body: err instanceof Error ? err.message : String(err),
    };
  }
}
