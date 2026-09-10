export const FB_PIXEL_ID = "375321243810867";

// https://developers.facebook.com/docs/meta-pixel/get-started
export const pageview = () => {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", "PageView");
  }
};

// https://developers.facebook.com/docs/meta-pixel/reference
// eventId lets this browser-side event be deduplicated against a matching
// server-side Conversions API call for the same action.
// https://developers.facebook.com/docs/meta-pixel/implementation/conversions-api#dedup
export const event = (name: string, options = {}, eventId?: string) => {
  if (typeof window !== "undefined" && (window as any).fbq) {
    if (eventId) {
      (window as any).fbq("track", name, options, { eventID: eventId });
    } else {
      (window as any).fbq("track", name, options);
    }
  }
};
