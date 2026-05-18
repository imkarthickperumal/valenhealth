import HomeHeader from "../components/HomeHeader";
import HomeFooter from "../components/HomeFooter";
import Link from "next/link";
import "./home.css";

export default function Home() {
  return (
    <>
      <HomeHeader />

      {/* HERO */}
      <section className="hp-hero">
        <div className="hp-hero-bg-glow"></div>
        <div className="hp-hero-wordmark">VALEN HEALTH VALEN</div>
        <div className="hp-hero-inner">
          <div className="hp-hero-card">
            <div className="pre-headline">
              <span className="rule"></span>
              <span>Spearwood&apos;s Health Ecosystem</span>
            </div>
            <h1>Move with<br /><span className="black">purpose.</span></h1>
            <p className="lede">Clinical exercise physiology and a 24/7 gym, working as one. Train freely. Recover precisely. Build a stronger you — under one roof.</p>
            <div className="meta-row">
              <div className="meta-item">
                <div className="icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#ED6C15" strokeWidth="2"/><path d="M12 7v5l3 3" stroke="#ED6C15" strokeWidth="2" strokeLinecap="round"/></svg>
                </div>
                <span className="text">24/7 Gym</span>
              </div>
              <div className="meta-divider"></div>
              <div className="meta-item">
                <div className="icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 3v18M3 12h18" stroke="#ED6C15" strokeWidth="2" strokeLinecap="round"/></svg>
                </div>
                <span className="text">Clinical EP</span>
              </div>
              <div className="meta-divider"></div>
              <div className="meta-item">
                <div className="icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 12 L9 18 L21 6" stroke="#ED6C15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span className="text">VALD Testing</span>
              </div>
            </div>
            <div className="hp-hero-buttons">
              <Link href="/contact#contact-form" className="btn btn-orange">Book a Tour →</Link>
              <Link href="/contact" className="btn btn-black-outline">Book an EP Consultation</Link>
            </div>
          </div>

          <aside className="hp-hero-side">
            <div className="hp-hero-side-tag">
              <span className="pulse"></span>
              <span>Now Open · 24/7</span>
            </div>
            <div className="hp-hero-side-quote">
              <p className="text">&ldquo;Fitness should be purposeful — a journey towards confidence, resilience, and self-connection.&rdquo;</p>
              <p className="attr">— Our Philosophy</p>
            </div>
          </aside>
        </div>
        <div className="hp-hero-scroll">
          <span>Scroll</span>
          <span className="line"></span>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="hp-stats-bar">
        <div className="hp-stat"><div className="value">24/7</div><div className="label">Gym Access</div></div>
        <div className="hp-stat"><div className="value">EP</div><div className="label">Exercise Physiology</div></div>
        <div className="hp-stat"><div className="value">VALD</div><div className="label">Performance Testing</div></div>
        <div className="hp-stat"><div className="value">100%</div><div className="label">Evidence-Based</div></div>
      </section>

      {/* BELIEF */}
      <section className="hp-belief">
        <div className="hp-belief-grid">
          <div className="hp-belief-image">
            <img src="/images/whatwebelieve.jpg" alt="Our Philosophy" />
          </div>
          <div className="hp-belief-content">
            <span className="eyebrow">— What We Believe</span>
            <p className="hp-belief-attribution">At Valen Health, we believe</p>
            <h2>movement is the most underprescribed medicine in healthcare.</h2>
            <p className="sub">That&apos;s why we built Valen Health — to bridge the gap between clinic and community, and put movement back where it belongs: at the centre of how people heal, recover, and live longer, better lives.</p>
            <div className="hp-belief-cta">
              <Link href="/about" className="btn btn-black">Read our story</Link>
              <span className="read-time">2 min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* THREE PATHS */}
      <section className="hp-paths-section">
        <div className="hp-paths-header">
          <div className="hp-paths-eyebrow">
            <span className="rule"></span>
            <span className="eyebrow">Multiple Memberships</span>
            <span className="rule"></span>
          </div>
          <h2>Whatever your goals.<br /><span className="accent">No matter your journey.</span></h2>
          <p className="lede">Whether you&apos;re here to train, recover, or both — every pathway leads to the same outcome: a stronger, more capable, more confident you.</p>
        </div>

        <div className="hp-feature-strip-wrap">
          <div className="hp-feature-strip">
            <div className="hp-feature-strip-grid">
              <div className="hp-feature-strip-lead">
                <span className="eyebrow">— Every Path Includes</span>
                <h3>Science you can <span className="accent">measure.</span></h3>
              </div>
              <div className="hp-feature-stat"><div className="value">VALD</div><div className="label">Performance Testing</div></div>
              <div className="hp-feature-stat"><div className="value">ESSA</div><div className="label">Accredited EPs</div></div>
              <div className="hp-feature-stat"><div className="value">24/7</div><div className="label">Facility Access</div></div>
            </div>
          </div>
        </div>

        <div className="hp-paths-cards-wrap">
          <div className="hp-paths-cards">
            <div className="hp-path-card hp-path-card-light">
              <div className="hp-path-icon hp-path-icon-light">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 7v10M21 7v10M6 9v6M18 9v6M3 12h18" stroke="#ED6C15" strokeWidth="2" strokeLinecap="round"/></svg>
              </div>
              <div className="path-no">Path 01</div>
              <h3>The Gym</h3>
              <p className="desc">24/7 access to commercial-grade equipment plus the option of VALD performance testing. Train freely — measure precisely.</p>
              <div className="features">
                <div>· 24/7 facility access</div>
                <div>· Strength + cardio zones</div>
                <div>· Functional training space</div>
                <div>· VALD performance testing</div>
                <div>· Inclusive community</div>
              </div>
              <div className="footer-row"><Link href="/gym">Explore the gym →</Link></div>
            </div>

            <div className="hp-path-card hp-path-card-cream">
              <div className="hp-path-card-tag">Clinical Care</div>
              <div className="hp-path-icon hp-path-icon-orange">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3v18M3 12h18" stroke="#000" strokeWidth="2" strokeLinecap="round"/></svg>
              </div>
              <div className="path-no">Path 02</div>
              <h3>Exercise Physiology</h3>
              <p className="desc">Clinical, university-qualified care for chronic conditions, injury rehab, and complex recovery. Movement prescribed — not guessed.</p>
              <div className="features">
                <div>· Accredited EP-led sessions</div>
                <div>· VALD performance testing</div>
                <div>· Medicare · NDIS · DVA · WorkCover</div>
                <div>· Personalised programming</div>
              </div>
              <div className="footer-row"><Link href="/exercise-physiology">Find out more →</Link></div>
            </div>

            <div className="hp-path-card hp-path-card-dark">
              <div className="hp-path-icon hp-path-icon-dark">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="12" r="6" stroke="#ED6C15" strokeWidth="2"/><circle cx="15" cy="12" r="6" stroke="#ED6C15" strokeWidth="2"/></svg>
              </div>
              <div className="path-no">Path 03</div>
              <h3>The Full Ecosystem</h3>
              <p className="desc">Gym + clinic, working as one. Train freely, get clinically guided when it counts. The best of both — under one roof.</p>
              <div className="features">
                <div>· Everything in the gym</div>
                <div>· Everything in the clinic</div>
                <div>· Continuous EP support</div>
                <div>· VALD progress tracking</div>
              </div>
              <div className="footer-row"><Link href="/gym">See memberships →</Link></div>
            </div>
          </div>
        </div>
      </section>

      {/* UNIFIER */}
      <section className="hp-unifier">
        <div className="hp-unifier-content">
          <div className="hp-unifier-eyebrow">
            <span className="rule"></span>
            <span className="eyebrow">Our Promise</span>
            <span className="rule"></span>
          </div>
          <h2>Not just a gym. Not just a clinic.</h2>
          <h2 className="accent">We build a better you. A better future.</h2>
          <div className="hp-unifier-divider"></div>
          <div className="hp-unifier-tag">— All Under One Roof —</div>
          <div className="hp-unifier-buttons">
            <Link href="/contact#contact-form" className="btn btn-orange btn-orange-large">Book a Tour →</Link>
            <Link href="/contact" className="btn btn-white-outline">Book EP Consultation</Link>
          </div>
        </div>
      </section>

      {/* METHODOLOGY */}
      <section className="hp-methodology">
        <div className="hp-methodology-grid">
          <div className="hp-methodology-left">
            <div className="eyebrow-row">
              <span className="rule"></span>
              <span className="eyebrow">— Our Methodology</span>
            </div>
            <h2>Assessment +<br />Evidence +<br />Support =<br /><span className="last">lifelong results.</span></h2>
            <p className="desc">Every client follows a clear, evidence-based pathway. Rigorous enough for clinical outcomes, personal enough for your unique journey.</p>
          </div>
          <div>
            <div className="hp-methodology-step"><div className="num">01</div><div><h4>Assessment</h4><p>Movement screening, health history, goals. We don&apos;t guess — we assess.</p></div></div>
            <div className="hp-methodology-step"><div className="num">02</div><div><h4>Prescription</h4><p>Built specifically for your body, your condition, your goals. No generic templates.</p></div></div>
            <div className="hp-methodology-step"><div className="num">03</div><div><h4>Progress</h4><p>VALD performance testing means your progress is measured — not assumed.</p></div></div>
            <div className="hp-methodology-step"><div className="num">04</div><div><h4>Sustained Results</h4><p>We don&apos;t stop when you feel better. We keep going until you thrive for life.</p></div></div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="hp-testimonial">
        <div className="hp-testimonial-bg">
          <img src="/images/quote.jpg" alt="" />
        </div>
        <div className="hp-testimonial-content">
          <div className="eyebrow">— Together We —</div>
          <h2>Succeed</h2>
          <div className="stars">★ ★ ★ ★ ★</div>
          <div className="rated">Rated 5 out of 5</div>
          <blockquote>&ldquo;Valen Health has completely transformed my approach to fitness and wellness. The Exercise Physiologists are incredibly knowledgeable and supportive, and they took the time to create a personalised plan that fit my lifestyle. It&apos;s more than a gym — it&apos;s a community.&rdquo;</blockquote>
          <div className="attr">— John S.</div>
        </div>
      </section>

      {/* REFERRAL STRIP */}
      <section className="hp-referral-strip">
        <div className="hp-referral-strip-inner">
          <div className="hp-referral-strip-msg">
            <span className="dot"></span>
            <span className="lead">Doctors refer to us. So do their patients.</span>
            <span className="sub">Trusted by local GPs, surgeons &amp; insurers.</span>
          </div>
          <div className="hp-referral-strip-links">
            <Link href="/contact">Refer a patient →</Link>
            <span className="divider"></span>
            <Link href="/contact" className="secondary">Download referral pack →</Link>
          </div>
        </div>
      </section>

      {/* FUNDING BAND */}
      <section className="hp-funding-band">
        <div className="hp-funding-band-inner">
          <div className="hp-funding-band-eyebrow">— Accepted Funding &amp; Referral Pathways —</div>
          <div className="hp-funding-band-list">
            <span className="item">Medicare</span><span className="sep"></span>
            <span className="item">NDIS</span><span className="sep"></span>
            <span className="item">DVA</span><span className="sep"></span>
            <span className="item">WorkCover WA</span><span className="sep"></span>
            <span className="item">Private Health</span>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="hp-final-cta">
        <div className="hp-final-cta-content">
          <h2>Ready to move<span className="accent">with purpose?</span></h2>
          <p className="lede">Book a tour of the facility, or book a clinical EP consultation. Whichever path you choose — we&apos;re with you.</p>
          <div className="hp-final-cta-buttons">
            <Link href="/contact#contact-form" className="btn btn-black">Book a Tour →</Link>
            <Link href="/contact" className="btn btn-black-outline">Book EP Consultation</Link>
          </div>
        </div>
      </section>

      <HomeFooter />
    </>
  );
}
