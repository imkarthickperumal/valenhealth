import Link from "next/link";

export default function HomeFooter() {
  return (
    <footer className="home-footer">
      <div className="home-footer-grid">
        <div className="home-footer-brand">
          <div className="home-footer-logo-row">
            <svg width="34" height="40" viewBox="0 0 22 26" aria-hidden="true">
              <path d="M2 2 L11 22 L20 2 L15 2 L11 12 L7 2 Z M14 2 L20 12 L17 2 Z" fill="#ED6C15" />
            </svg>
            <span>VALEN HEALTH</span>
          </div>
          <p className="home-footer-tagline">Move with purpose.</p>
          <address>
            Unit 4, 235 Rockingham Rd<br />
            Spearwood WA 6163<br />
            admin@valenhealth.com.au
          </address>
        </div>

        <div className="home-footer-col">
          <h5>Explore</h5>
          <ul>
            <li><Link href="/about">About us</Link></li>
            <li><Link href="/gym#memberships">Memberships</Link></li>
            <li><Link href="/exercise-physiology">Exercise Physiology</Link></li>
            <li><Link href="/gym">The Gym</Link></li>
            <li><Link href="/gym#vald">VALD Testing</Link></li>
          </ul>
        </div>

        <div className="home-footer-col">
          <h5>Referral</h5>
          <ul>
            <li><Link href="/exercise-physiology">Medicare / CDM</Link></li>
            <li><Link href="/exercise-physiology">WorkCover WA</Link></li>
            <li><Link href="/contact">Refer a patient</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="home-footer-col">
          <h5>Hours</h5>
          <div className="home-footer-hours">
            <div className="open">24/7 gym access</div>
            <div style={{ marginTop: "8px" }}>Staffed reception:</div>
            <div>Mon–Fri · 9am–6pm</div>
          </div>
          <div className="home-footer-phones">
            <div>(08) 9418 6388</div>
            <div>0489 293 000</div>
          </div>
        </div>
      </div>

      <div className="home-footer-bottom">
        <div className="copy">© 2026 Valen Health &amp; Fitness. All rights reserved.</div>
        <a href="#" className="social">@valenhealthspearwood</a>
      </div>
    </footer>
  );
}
