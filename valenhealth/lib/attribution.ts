// Reads ad-attribution values written by the sitewide "vh-attribution" cookie
// script in app/layout.tsx. Client-side only (cookies/URL/window).
export function getAttributionValue(name: string): string {
  if (typeof window !== "undefined") {
    const win = window as any;
    if (typeof win.vhGet === "function") {
      const val = win.vhGet(name);
      if (val) return val;
    }
  }
  if (typeof document !== "undefined") {
    const m = document.cookie.match(
      new RegExp("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"),
    );
    if (m && m[2]) return decodeURIComponent(m[2]);
  }
  if (typeof window !== "undefined" && name.startsWith("vh_")) {
    const param = name.replace("vh_", "");
    const qs = new URLSearchParams(window.location.search);
    const val = qs.get(param);
    if (val) return val;
    if (name === "vh_landing_page") return window.location.href;
    if (name === "vh_referrer") return document.referrer || "direct";
  }
  return "";
}

export type AttributionData = {
  gclid: string;
  fbclid: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
  landingPage: string;
  referrer: string;
  hutk: string;
  adPlatform: "Google Ads" | "Meta" | "Organic / direct";
};

export function collectAttribution(): AttributionData {
  const gclid = getAttributionValue("vh_gclid");
  const fbclid = getAttributionValue("vh_fbclid");

  let hutk = "";
  if (typeof document !== "undefined") {
    const m = document.cookie.match(/(^|;\s*)hubspotutk\s*=\s*([^;]+)/);
    if (m && m[2]) hutk = decodeURIComponent(m[2]);
  }

  return {
    gclid,
    fbclid,
    utmSource: getAttributionValue("vh_utm_source"),
    utmMedium: getAttributionValue("vh_utm_medium"),
    utmCampaign: getAttributionValue("vh_utm_campaign"),
    utmTerm: getAttributionValue("vh_utm_term"),
    utmContent: getAttributionValue("vh_utm_content"),
    landingPage: getAttributionValue("vh_landing_page"),
    referrer: getAttributionValue("vh_referrer"),
    hutk,
    adPlatform: gclid ? "Google Ads" : fbclid ? "Meta" : "Organic / direct",
  };
}
