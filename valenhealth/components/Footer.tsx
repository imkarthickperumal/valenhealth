"use client";

import GoogleReviews from "./GoogleReviews/GoogleReviews";
import { trackConversion } from "../lib/gtag";

export default function Footer() {
  return (
    <>
      <GoogleReviews />
      <footer className="sub-footer">
        <div className="sub-footer-inner">
          <div className="sub-footer-logo">
            <img src="/images/logo/1.png" alt="Valen Health" style={{ height: '100px', width: 'auto', display: 'block' }} />
          </div>
          <div className="sub-footer-meta">Unit 4, 235 Rockingham Road, Spearwood WA 6163</div>
          <div className="sub-footer-meta">
            Phone: <a href="tel:0489293000" onClick={() => trackConversion()} style={{ color: "inherit", textDecoration: "none" }}>0489 293 000</a>
          </div>
          <div className="sub-footer-meta">© Valen Health · Vitality And Longevity Exercise Network</div>
        </div>
      </footer>
    </>
  );
}
