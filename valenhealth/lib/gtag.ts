export const GOOGLE_ADS_CONVERSION_ID = "AW-18279882531";
export const GOOGLE_ADS_CONVERSION_LABEL = "jn-TCMGDncccEKO-w4xE";

// Dedicated conversion labels (defaults to current label, easily updated when new labels are created)
export const CONVERSION_LABELS = {
  BOOKING: process.env.NEXT_PUBLIC_GOOGLE_ADS_BOOKING_LABEL || GOOGLE_ADS_CONVERSION_LABEL,
  CALL: process.env.NEXT_PUBLIC_GOOGLE_ADS_CALL_LABEL || GOOGLE_ADS_CONVERSION_LABEL,
  FORM_LEAD: process.env.NEXT_PUBLIC_GOOGLE_ADS_FORM_LABEL || GOOGLE_ADS_CONVERSION_LABEL,
};

// https://support.google.com/google-ads/answer/6331304
export const trackConversion = (customLabel?: string) => {
  if (typeof window !== "undefined") {
    const label = customLabel || GOOGLE_ADS_CONVERSION_LABEL;
    if (typeof (window as any).gtag === "function") {
      (window as any).gtag("event", "conversion", {
        send_to: `${GOOGLE_ADS_CONVERSION_ID}/${label}`,
        value: 1.0,
        currency: "AUD",
      });
    } else if (typeof (window as any).trackConversion === "function" && !customLabel) {
      (window as any).trackConversion();
    } else if (Array.isArray((window as any).dataLayer)) {
      (window as any).dataLayer.push("event", "conversion", {
        send_to: `${GOOGLE_ADS_CONVERSION_ID}/${label}`,
        value: 1.0,
        currency: "AUD",
      });
    }
  }
};

export const trackBookingConversion = () => trackConversion(CONVERSION_LABELS.BOOKING);
export const trackCallConversion = () => trackConversion(CONVERSION_LABELS.CALL);
export const trackFormLeadConversion = () => trackConversion(CONVERSION_LABELS.FORM_LEAD);

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

