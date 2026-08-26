export const GOOGLE_ADS_CONVERSION_ID = "AW-18279882531";
export const GOOGLE_ADS_CONVERSION_LABEL = "jn-TCMGDncccEKO-w4xE";

// https://support.google.com/google-ads/answer/6331304
export const trackConversion = () => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: `${GOOGLE_ADS_CONVERSION_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`,
      value: 1.0,
      currency: "AUD",
    });
  }
};
