import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer id="contact">
        <div className="foot-grid">
          <div className="foot-col">
            <svg className="logo-svg" viewBox="0 0 260 60" style={{ height: "32px", marginBottom: "16px" }}>
              <polygon className="v-body" points="4,4 26,4 42,52 28,52"/>
              <polygon className="v-body" points="44,4 58,4 42,52 34,52"/>
              <polygon className="v-body" points="50,0 62,0 46,32 38,32"/>
              <polygon className="v-body" points="62,2 68,2 58,22 53,22"/>
              <text className="wordmark" x="86" y="39" fontSize="26" fill="#FFFFFF">VALEN HEALTH</text>
            </svg>
            <div className="tagline">Move with Purpose.</div>
            <p style={{ fontSize: "12px", color: "var(--orange)", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'League Spartan', sans-serif", fontWeight: "600", marginBottom: "14px" }}>V·A·L·E·N — Vitality And Longevity Exercise Network</p>
            <p style={{ fontSize: "14px", marginBottom: "16px", color: "rgba(255,255,255,0.55)", lineHeight: "1.6" }}>Spearwood&apos;s 24/7 gym, Exercise Physiology clinic and performance lab — all under one roof.</p>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)" }}>Unit 4, 235 Rockingham Road<br />Spearwood WA 6163</p>
          </div>
          <div className="foot-col">
            <h4>Get Started</h4>
            <ul>
              <li><Link href="/join">Join Now · $17.88/wk</Link></li>
              <li><a href="/#book">7-Day Free Trial</a></li>
              <li><Link href="/exercise-physiology">Book EP Consult</Link></li>
              <li><a href="/#book">Book a Tour</a></li>
              <li><Link href="/exercise-physiology">VALD Assessment</Link></li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>Services</h4>
            <ul>
              <li><a href="/#gym">24/7 Gym</a></li>
              <li><Link href="/exercise-physiology">Exercise Physiology</Link></li>
              <li><Link href="/exercise-physiology">Medicare / CDM</Link></li>
              <li><Link href="/exercise-physiology">WorkCover Rehab</Link></li>
              <li><Link href="#">For Employers</Link></li>
              <li><Link href="#">GP Referrals</Link></li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="tel:0489293000">0489 293 000</a></li>
              <li><a href="tel:0894186388">(08) 9418 6388</a></li>
              <li><a href="tel:0861844323">(08) 6184 4323</a></li>
              <li><a href="mailto:admin@valenhealth.com.au">admin@valenhealth.com.au</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer">@valenhealthspearwood</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-legal">
          <div>© 2026 Valen Health &amp; Fitness. All rights reserved.</div>
          <div>Privacy · Terms · Sitemap</div>
        </div>
      </footer>

      <div className="sticky-mobile">
        <a className="call" href="/#book">BOOK NOW</a>
        <Link className="join" href="/join">JOIN NOW →</Link>
      </div>
    </>
  );
}
