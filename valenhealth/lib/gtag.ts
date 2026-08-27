export const GOOGLE_ADS_CONVERSION_ID = "AW-18279882531";
export const GOOGLE_ADS_CONVERSION_LABEL = "jn-TCMGDncccEKO-w4xE";

// https://support.google.com/google-ads/answer/6331304
export const trackConversion = () => {
  if (typeof window !== "undefined") {
    if (typeof window.trackConversion === "function") {
      window.trackConversion();
    } else if (typeof window.gtag === "function") {
      window.gtag("event", "conversion", {
        send_to: `${GOOGLE_ADS_CONVERSION_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`,
        value: 1.0,
        currency: "AUD",
      });
    } else if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push("event", "conversion", {
        send_to: `${GOOGLE_ADS_CONVERSION_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`,
        value: 1.0,
        currency: "AUD",
      });
    }
  }
};

// For outbound links that navigate the current tab away from the site:
// fire the conversion, then navigate once the beacon has sent (or after a
// short fallback timeout if gtag never calls back, e.g. blocked by an ad
// blocker) so the click is never lost waiting on analytics.
// https://support.google.com/google-ads/answer/6331304
export const fireConversion = (url: string) => {
  if (typeof window === "undefined") return;

  let navigated = false;
  const navigate = () => {
    if (navigated) return;
    navigated = true;
    window.location.href = url;
  };

  if (typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: `${GOOGLE_ADS_CONVERSION_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`,
      value: 1.0,
      currency: "AUD",
      event_callback: navigate,
    });
    setTimeout(navigate, 1000);
  } else {
    navigate();
  }
};

