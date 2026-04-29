import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
export default function Home() {
  return (
    <>


<div className="ann">⬢ v8 · VALEN acronym · $17.88 · unified model · VALD performance</div>

{/*  HEADER — BLACK  */}
<Header />

{/*  HERO  */}
<section className="hero" id="home">
  <div className="hero-inner">
    <div>
      <div className="kicker"><span className="dot"></span> V·A·L·E·N — Vitality And Longevity Exercise Network</div>
      <h1>Clinical care. Daily training.<br /><span className="serif-i">Measurable progress.</span></h1>
      <p className="hero-sub">Spearwood&apos;s 24/7 gym, Exercise Physiology clinic and performance lab — all under one roof.</p>
      <div className="hero-ctas">
        <Link className="btn btn-orange btn-xl" href="/join">Join Now · From $17.88/wk →</Link>
        <Link className="btn btn-outline-white btn-xl" href="#book">Book a Free Tour</Link>
      </div>
      <div className="hero-reassure">
        <span><span className="check">✓</span> 7-day free trial</span>
        <span><span className="check">✓</span> No card required</span>
        <span><span className="check">✓</span> No lock-in</span>
      </div>
    </div>
    <div className="hero-right">
      <div className="hero-photo">COMMUNITY · MEMBERS TRAINING · REAL PHOTO HERE</div>
      <div className="quick-book">
        <div className="qb-label">Quick Book</div>
        <div className="qb-title">Get started in one click.</div>
        <div className="qb-options">
          <a className="qb-btn" href="#"><span>Free Trial</span><span className="arrow">→</span></a>
          <a className="qb-btn" href="#"><span>EP Consult</span><span className="arrow">→</span></a>
          <a className="qb-btn" href="#"><span>VALD Scan</span><span className="arrow">→</span></a>
          <a className="qb-btn" href="#"><span>Tour the Gym</span><span className="arrow">→</span></a>
        </div>
        <div className="qb-avail"><span className="green"></span> Next EP slot · <b>Thu 24 Apr 10:30 AM</b></div>
      </div>
    </div>
  </div>
</section>

{/*  ORANGE STATS BAR  */}
<section className="stats stats-2col">
  <div className="stat"><span className="stat-num">24/7</span><span className="stat-label">Gym Access</span></div>
  <div className="stat"><span className="stat-num">3-in-1</span><span className="stat-label">Gym · Clinic · Lab</span></div>
</section>

{/*  TRUST STRIP  */}
<section className="trust-strip">
  <div className="trust-strip-inner">
    <div className="trust-item"><span className="ico">✓</span> ESSA Accredited EPs</div>
    <div className="trust-item"><span className="ico">✓</span> Medicare Provider</div>
    <div className="trust-item"><span className="ico">✓</span> WorkCover WA Approved</div>
    <div className="trust-item"><span className="ico">✓</span> NDIS Registered</div>
    <div className="trust-item"><span className="ico">✓</span> DVA Accepted</div>
  </div>
</section>

{/*  SOCIAL PROOF  */}
<section className="social-proof">
  <div className="sp-line">
    <span className="sp-stars">★ ★ ★ ★ ★</span>
    <span><b>5.0</b> · 48 Google reviews</span>
  </div>
</section>

{/*  3 DOORS  */}
<section className="light" id="gym">
  <div className="section-inner">
    <div className="section-head">
      <span className="eyebrow">Where To Start</span>
      <h2>Three doors. <em>One roof.</em></h2>
      <p>Train daily, rehab an injury, or enhance performance. Pick the door that fits today — every Valen person ends up using all three.</p>
    </div>
    <div className="doors">
      <div className="door">
        <div className="door-ico">◉</div>
        <h3>I want to <em>train.</em></h3>
        <p>Full 24/7 gym access. Commercial-grade equipment. A community that shows up for you.</p>
        <ul>
          <li>24/7 PIN-code access</li>
          <li>Every piece of gear · no hidden fees</li>
          <li>EPs on-site when you want guidance</li>
          <li>No lock-in · cancel anytime</li>
        </ul>
        <div className="price-tag">From $17.88/week · less than $3 a day</div>
        <Link className="btn btn-orange btn-full" href="/join">Start Free Trial →</Link>
      </div>
      <div className="door featured">
        <div className="badge">Most Popular</div>
        <div className="door-ico">◆</div>
        <h3>I want <em>both.</em></h3>
        <p>Gym access plus Exercise Physiology support. Train daily with a clinical programme behind you.</p>
        <ul>
          <li>Everything in Access</li>
          <li>Regular 1-on-1 EP consultations</li>
          <li>VALD assessment included</li>
          <li>Personalised programme · re-tested</li>
          <li>GP progress reports</li>
        </ul>
        <div className="price-tag" style={{ color: "var(--orange)" }}>Standard membership</div>
        <Link className="btn btn-orange btn-full" href="/join">Explore Standard →</Link>
      </div>
      <div className="door">
        <div className="door-ico">✚</div>
        <h3>I need <em>support.</em></h3>
        <p>Evidence-based care for chronic conditions, injury rehab, and WorkCover recovery.</p>
        <ul>
          <li>Medicare CDM · 5 bulk-billed sessions</li>
          <li>WorkCover WA · NDIS · DVA</li>
          <li>VALD clinical assessment</li>
          <li>GP progress reports</li>
        </ul>
        <div className="price-tag">From $135 · rebated with referral</div>
        <a className="btn btn-outline btn-full" href="#exercise-physiology">Book EP Consult →</a>
      </div>
    </div>
  </div>
</section>

{/*  WHY VALEN  */}
<section className="white" id="about">
  <div className="section-inner">
    <div className="section-head">
      <span className="eyebrow">Why Valen</span>
      <h2>Not just a gym. <em>A health ecosystem.</em></h2>
      <p>We built Valen to bridge the gap between clinic and community — a place that combines the rigour of health care with the warmth of a real gym.</p>
    </div>
    <div className="why-grid">
      <div className="why-card">
        <div className="why-ico">◉</div>
        <h3>Open <em>all hours.</em></h3>
        <p>PIN-code 24/7 access, CCTV-monitored. Train at 5 AM, 11 PM, or Christmas Day — whenever life lets you.</p>
      </div>
      <div className="why-card">
        <div className="why-ico">✚</div>
        <h3>Clinicians <em>+ VALD lab.</em></h3>
        <p>Accredited Exercise Physiologists guided by VALD force-plate data. For rehab, athletic performance, and physique tracking — the same tech used by AFL and NRL clubs.</p>
      </div>
      <div className="why-card">
        <div className="why-ico">♥</div>
        <h3>A <em>community</em> worth showing up for.</h3>
        <p>Our team knows your name. Our members respect each other. Whether you&apos;re chasing a PB or getting back on your feet — you&apos;ll find your people here.</p>
      </div>
    </div>
  </div>
</section>

{/*  HOW IT WORKS  */}
<section className="light">
  <div className="section-inner">
    <div className="section-head">
      <span className="eyebrow">How It Works</span>
      <h2>Get started <em>in three steps.</em></h2>
    </div>
    <div className="how-steps">
      <div className="how-step">
        <div className="step-n">1</div>
        <h3>Pick your path</h3>
        <p>Gym, EP, or both. Pick online in 30 seconds — or walk in and we&apos;ll help you decide.</p>
      </div>
      <div className="how-step">
        <div className="step-n">2</div>
        <h3>Start moving</h3>
        <p>Gym members get PIN-code access same day. EP patients book online via PracSuite — we handle the paperwork.</p>
      </div>
      <div className="how-step">
        <div className="step-n">3</div>
        <h3>See the progress</h3>
        <p>VALD assessment at 6 and 12 weeks. Real numbers, real progress — never guesswork.</p>
      </div>
    </div>
  </div>
</section>

{/*  COMMUNITY GRID  */}
<section className="white">
  <div className="section-inner">
    <div className="section-head">
      <span className="eyebrow">Our Community</span>
      <h2>Step <em>inside.</em></h2>
      <p>A look at training, recovery, and everything in between.</p>
    </div>
    <div className="community-grid">
      <div className="c-img">Community · 01</div>
      <div className="c-img">Training · 02</div>
      <div className="c-img">EP Session · 03</div>
      <div className="c-img">Member · 04</div>
    </div>
    <div className="community-cta"><a href="#">See more on Instagram →</a></div>
  </div>
</section>

{/*  TESTIMONIAL — BLACK  */}
<section className="testimonial">
  <div className="testimonial-inner">
    <div className="stars">★ ★ ★ ★ ★</div>
    <div className="rating-text">Rated 5.0 · 48 Google Reviews</div>
    <p className="quote">&quot;Valen Health has completely transformed my approach to fitness and wellness. The Exercise Physiologists are knowledgeable and supportive, and they took the time to create a personalised plan that fit my lifestyle. It&apos;s more than a gym — it&apos;s a community.&quot;</p>
    <div className="reviewer">John S.</div>
    <div className="reviewer-role">Member since 2024 · Spearwood</div>
  </div>
</section>

{/*  PRICING  */}
<section className="white" id="pricing">
  <div className="section-inner">
    <div className="section-head">
      <span className="eyebrow">Simple Pricing</span>
      <h2>Join in <em>one click.</em></h2>
      <p>No joining fees. No lock-in. Cancel anytime. From just <b>$3 a day</b>.</p>
    </div>
    <div className="price-cards">
      <div className="price-card">
        <h3>Access</h3>
        <p className="sub">Gym membership, done right.</p>
        <div className="price-row"><span className="price">$17.88</span><span className="price-unit">/ week</span></div>
        <p className="price-note">Direct debit · cancel anytime</p>
        <ul>
          <li>24/7 PIN-code gym access</li>
          <li>All equipment included</li>
          <li>No lock-in contract</li>
          <li>Free parking · CCTV</li>
        </ul>
        <Link className="btn btn-orange btn-full" href="/join">JOIN NOW →</Link>
      </div>
      <div className="price-card featured">
        <span className="tag">Most Popular</span>
        <h3>Standard</h3>
        <p className="sub">Gym + Exercise Physiology.</p>
        <div className="price-row"><span className="price">Contact</span></div>
        <p className="price-note">Current live pricing retained · new tier pre-launch</p>
        <ul>
          <li>Everything in Access</li>
          <li>Regular EP consultations</li>
          <li>Personalised programming</li>
          <li>VALD assessment included</li>
          <li>GP progress reports</li>
        </ul>
        <Link className="btn btn-orange btn-full" href="/join">Join Standard →</Link>
      </div>
      <div className="price-card">
        <h3>VALD Scan</h3>
        <p className="sub">Clinical · Performance · Physique.</p>
        <div className="price-row"><span className="price">$149</span><span className="price-unit">/ once</span></div>
        <p className="price-note">Included with Standard · bulk-billed with referral</p>
        <ul>
          <li>ForceDecks force-plate testing</li>
          <li>For rehab, athletes, physique tracking</li>
          <li>Full EP consultation (45 min)</li>
          <li>Written report + programme</li>
          <li>GP report (if referred)</li>
        </ul>
        <a className="btn btn-outline btn-full" href="#">Book Assessment →</a>
      </div>
    </div>
    <div className="price-reassure">
      <b>Medicare, WorkCover, NDIS, DVA accepted.</b> We handle the paperwork — you focus on the movement.
    </div>
  </div>
</section>

{/*  WORKCOVER CALLOUT — BLACK BLOCK  */}
<section className="light wc-callout" id="exercise-physiology">
  <div className="wc-callout-inner">
    <div>
      <span className="eyebrow">⚑ WorkCover WA &amp; Insurers</span>
      <h2>From recovery to <em>resilience.</em></h2>
      <p>Zero out-of-pocket for approved claims. VALD-measured reports employers, insurers and treating doctors trust. Locally owned, Spearwood-based — not a national chain.</p>
      <ul className="wc-features">
        <li>Zero out-of-pocket for approved WorkCover WA claims</li>
        <li>Baseline, 6-week and 12-week progress reports</li>
        <li>Gym-based functional rehab — mirrors real workplace demands</li>
      </ul>
      <div className="wc-ctas">
        <a className="btn btn-orange" href="#">Refer a Patient →</a>
        <a className="btn btn-outline-white" href="#">Download Referral Pack</a>
      </div>
    </div>
    <div className="wc-insurers">
      <div className="wc-insurers-label">Accepted Insurers</div>
      <div className="wc-insurers-grid">
        <div className="wc-ins">GIO</div>
        <div className="wc-ins">ICWA</div>
        <div className="wc-ins">QBE</div>
        <div className="wc-ins">Allianz</div>
        <div className="wc-ins">Wesfarmers</div>
        <div className="wc-ins">+ More</div>
      </div>
    </div>
  </div>
</section>

{/*  FINAL CTA — ORANGE  */}
<section className="final-cta" id="book">
  <h2>Ready to move<br /><em>with purpose?</em></h2>
  <p>Start today. First visit&apos;s on us.</p>
  <div className="final-cta-ctas">
    <Link className="btn btn-white btn-xl" href="/join">Claim Free Trial →</Link>
    <a className="btn btn-ink btn-xl" href="#">Book EP Consult</a>
  </div>
  <div className="final-cta-reassure">
    <span><span className="check">✓</span> No card required</span>
    <span><span className="check">✓</span> No lock-in</span>
    <span><span className="check">✓</span> Cancel anytime</span>
  </div>
</section>

{/*  FOOTER — BLACK  */}
<Footer />


    </>
  );
}
