"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ReadyToStart from "../../components/ReadyToStart";
import "./gym.css";

export default function GymPage() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    document.querySelectorAll(".gym-tier-row").forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${i * 0.06}s`;
    });
    return () => observer.disconnect();
  }, []);

  const tiers = [
    { letter: "V", verb: "Move", name: "Basic", price: "18", desc: "24/7 gym access.", detail: "Just get in here. The most fundamental act of fitness — your gym, on your terms, on your schedule. No clinical wrapping, no programme — just you and the equipment.", cta: "Choose Move" },
    { letter: "A", verb: "Build", name: "Foundation", price: "26", desc: "24/7 gym + clinical oversight.", detail: "Where the clinical work begins. After your initial EP assessment, you have a programme built around your body, your history, and your goals. Every six weeks your EP reviews progress and adjusts the plan.", cta: "Choose Build" },
    { letter: "L", verb: "Train", name: "Foundation + 2 Classes", price: "34", desc: "Foundation + 2 EP-led classes per week.", detail: "Show up, do the work, with a coach. Twice a week in a structured group session (max 8 participants). Discipline, repetition, accountability — and a clinician in the room.", cta: "Choose Train" },
    { letter: "E", verb: "Thrive", name: "Foundation + Unlimited", price: "40", desc: "Foundation + unlimited EP-led classes.", detail: "The full programme. 24/7 gym access, clinical oversight, and unlimited group training led by an EP. The peak tier for members who go all-in.", cta: "Choose Thrive" },
    { letter: "N", verb: "Restore", name: "Clinical", price: "28", desc: "EP session + 6-weekly reviews + unlimited classes", detail: "(class times only). The parallel restorative path — designed for members managing chronic conditions, recovering from surgery, or maintaining function as they age.", cta: "Choose Restore" },
  ];

  const galleryItems = [
    { name: "Main Floor", image: "/images/GYM/GYM_A738781.jpg" },
    { name: "EP Room", image: "/images/GYM/GYM_A738792.jpg" },
    { name: "VALD Setup", image: "/images/GYM/GYM_A738801.jpg" },
    { name: "Class Space", image: "/images/GYM/GYM_A738808.jpg" },
  ];

  return (
    <>
      <Header />
      <main className="gym-page">
        {/* HERO */}
        <section className="gym-hero">
          <div className="gym-hero-image">
            <div className="gym-hero-content">
              <div className="gym-hero-eyebrow">Welcome to</div>
              <h1 className="gym-hero-title">Our <span className="accent">gym.</span></h1>
              <p className="gym-hero-sub">Spearwood&apos;s only science-backed 24/7 gym. Five membership tiers, EP-led classes, and progress measured with VALD performance technology.</p>
            </div>
            <div className="gym-hero-photo-tag">Valen Health · Spearwood</div>
          </div>
        </section>

        {/* INTRO */}
        <section className="gym-intro">
          <div className="gym-intro-inner">
            <div className="reveal">
              <h2 className="section-heading">More than a <span className="italic-orange">gym.</span></h2>
            </div>
            <div className="gym-intro-body reveal">
              <p>Valen Health is a fully equipped, 24/7 facility built around a simple idea — that every workout should have a reason behind it.</p>
              <p>Every membership above Basic includes ongoing oversight from an Accredited Exercise Physiologist. So you&apos;re never just exercising. You&apos;re <strong>progressing with purpose</strong> — backed by clinical assessment, evidence-based programming, and measurable progress.</p>
            </div>
          </div>
        </section>

        {/* MEMBERSHIPS */}
        <section id="memberships" className="gym-memberships">
          <div className="gym-memberships-inner">
            <div className="gym-memberships-header reveal">
              <div className="gym-memberships-supertitle">Our memberships.</div>
              <h2 className="section-heading">Five tiers. <span className="italic-orange">Five verbs.</span></h2>
              <p className="section-lead" style={{ color: "rgba(251,241,230,0.8)" }}>Every Valen Health membership describes what you&apos;re doing — Move, Build, Train, Thrive, or Restore. Choose the tier that matches where you are now, and progress as you grow.</p>
            </div>
            <div className="gym-tier-rows">
              {tiers.map((t) => (
                <div className="gym-tier-row reveal" key={t.letter}>
                  <div className="gym-tier-letter">{t.letter}</div>
                  <div className="gym-tier-meta">
                    <div className="gym-tier-verb">{t.verb}</div>
                    <div className="gym-tier-name">{t.name}</div>
                  </div>
                  <div className="gym-tier-incs"><strong>{t.desc}</strong> {t.detail}</div>
                  <div className="gym-tier-price">
                    <div className="gym-tier-price-amount"><span className="dollar">$</span>{t.price}</div>
                    <div className="gym-tier-price-period">per week</div>
                  </div>
                  <Link href="/contact" className="gym-tier-cta">{t.cta}</Link>
                </div>
              ))}
            </div>
            <p className="gym-tier-note reveal"><strong>Commit longer, save more.</strong> 3, 6, and 12-month commitments lock in a lower weekly rate and waive the $68 sign-up fee. All prices include GST.</p>
          </div>
        </section>

        {/* HEALTH ECOSYSTEM */}
        <section className="gym-ecosystem">
          <div className="gym-ecosystem-inner">
            <div className="gym-ecosystem-header reveal">
              <h2 className="section-heading">A complete health <span className="italic-orange">ecosystem.</span></h2>
              <p className="section-lead">Assessment, programming, training, and progress — all under one roof.</p>
            </div>
          </div>
        </section>

        {/* AMENITIES */}
        <section className="gym-amenities">
          <div className="gym-amenities-inner">
            <div className="gym-amenities-header reveal">
              <h2 className="section-heading"><span className="italic-orange-cap">Amenities.</span></h2>
              <p className="section-lead" style={{ color: "rgba(251,241,230,0.8)" }}>A modern, fully-stocked facility designed for everything from rehab to performance.</p>
            </div>
            <div className="gym-amenities-groups">
              <div className="gym-amenity-group reveal">
                <div className="gym-amenity-group-label">Category 01</div>
                <h3 className="gym-amenity-group-title"><span className="italic-orange-cap">Strength</span></h3>
                <ul className="gym-amenity-group-list">
                  <li>Free weights &amp; barbell stations</li>
                  <li>Strength machines &amp; cable systems</li>
                  <li>Functional &amp; mobility space</li>
                </ul>
              </div>
              <div className="gym-amenity-group reveal">
                <div className="gym-amenity-group-label">Category 02</div>
                <h3 className="gym-amenity-group-title"><span className="italic-orange-cap">Cardio</span></h3>
                <ul className="gym-amenity-group-list">
                  <li>Treadmills</li>
                  <li>Stationary bikes</li>
                  <li>Rowing machines</li>
                </ul>
              </div>
              <div className="gym-amenity-group reveal">
                <div className="gym-amenity-group-label">Category 03</div>
                <h3 className="gym-amenity-group-title"><span className="italic-orange-cap">Clinical</span></h3>
                <ul className="gym-amenity-group-list">
                  <li>Dedicated EP &amp; assessment room</li>
                  <li>VALD performance technology</li>
                  <li>Class &amp; small-group training area</li>
                  <li>Change rooms &amp; member amenities</li>
                  <li>Secure 24/7 member access</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* GALLERY — Inside the facility */}
        <section className="gym-gallery">
          <div className="gym-gallery-inner">
            <div className="gym-gallery-header reveal">
              <h2 className="section-heading">Inside the <span className="italic-orange">facility.</span></h2>
              <p className="section-lead">A look at the space — clean, modern, purpose-built for clinical training and serious progress.</p>
            </div>
            <div className="gym-gallery-grid reveal">
              {galleryItems.map((item, i) => (
                <div
                  className="gym-gallery-item"
                  key={i}
                  style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {/* <div className="gym-gallery-placeholder-label">{item.label}</div> */}
                  <div className="gym-gallery-placeholder-name">{item.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* VALD */}
        <section id="vald" className="gym-vald">
          <div className="gym-vald-inner">
            <div className="gym-vald-content reveal">
              <h2 className="section-heading">VALD <span className="italic-orange">technology.</span></h2>
              <p>The same body-assessment technology used by elite sporting teams and hospital rehab programs around the world. <strong>Every Valen member has access</strong> — whether you&apos;re rebuilding from injury, managing a condition, or chasing a heavier squat or a target physique.</p>
              <p>Your progress is tracked with objective data — strength, capacity, asymmetry, balance. So when we say you&apos;re improving, we can prove it.</p>
            </div>
          </div>
        </section>

        {/* GOALS */}
        <section className="gym-goals">
          <div className="gym-goals-inner">
            <div className="gym-goals-content reveal">
              <h2 className="section-heading">Know your body. <span className="italic-orange">Know your goals.</span></h2>
              <p>Most gym journeys fail because they start in the wrong place — a generic program, a guess at calories, a number on a scale. We start with <strong>understanding</strong>.</p>
              <p>Through your initial EP session and VALD assessment, we map out exactly where your body is now — its strengths, its limiters, its imbalances. Then we work with you to define what success actually looks like for <em>you</em>.</p>
              <p>Whether that&apos;s lifting twice your bodyweight, walking pain-free, returning to sport, or simply ageing well — your program is built around your real life. Not someone else&apos;s.</p>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <ReadyToStart />
      </main>
      <Footer />
    </>
  );
}
