/* eslint-disable @typescript-eslint/no-explicit-any */

interface Window {
  gtag: (...args: any[]) => void;
  trackConversion?: () => void;
  dataLayer: any[];
}
