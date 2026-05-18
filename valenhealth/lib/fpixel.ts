export const FB_PIXEL_ID = "375321243810867";

// https://developers.facebook.com/docs/meta-pixel/get-started
export const pageview = () => {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", "PageView");
  }
};

// https://developers.facebook.com/docs/meta-pixel/reference
export const event = (name: string, options = {}) => {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", name, options);
  }
};
