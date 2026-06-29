"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ReadyToStart from "../../components/ReadyToStart/ReadyToStart";
import ClassSchedule from "../../components/ClassSchedule/ClassSchedule";
import "./exercise-physiology.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exercise Physiology Spearwood - Medicare, DVA, NDIS | Valen Health",
  description: "Clinical exercise physiology in Spearwood, Perth. Medicare bulk-billed (EPC/CDM), DVA, NDIS & private health (HICAPS on-site). Chronic disease, injury rehab, pain management. Book online.",
  openGraph: {
    title: "Exercise Physiology Spearwood - Medicare, DVA, NDIS",
    description: "Clinical exercise physiology in Spearwood. Medicare bulk-billed, DVA, NDIS & private health. Book online.",
    url: "https://valenhealth.com.au/exercise-physiology",
  },
};

export default function ExercisePhysiologyPage() {
  // Force recompile
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('ep-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.ep-reveal').forEach(el => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  const treatsList = [
    "Post-surgery rehabilitation",
    "Chronic pain management",
    "Diabetes (type 1 & type 2)",
    "Cardiovascular disease",
    "Arthritis & joint conditions",
    "Osteoporosis & bone health",
    "Neurological conditions",
    "Mental health support",
    "Cancer rehabilitation",
    "Workplace & sports injuries",
    "Strength, performance & physique goals",
    "Healthy ageing & falls prevention"
  ];

  return (
    <>
      <Header />

      <main className="ep-page">
        {/* HERO */}
        <section className="ep-hero">
          <div className="ep-hero-inner">
            <div className="ep-hero-eyebrow">Our Service</div>
            <h1 className="ep-hero-title ep-hero-title--soft">
              Exercise <span className="ep-accent-word">Physiology.</span>
            </h1>
            <p className="ep-hero-sub">
              Clinical, evidence-based exercise prescription delivered by accredited Exercise Physiologists. Built around your body, your history, and your goals.
            </p>
            <div style={{ marginTop: '32px' }}>
              <Link href="/contact?subject=ep#contact-form" className="btn btn-orange">Book Now →</Link>
            </div>
          </div>
        </section>

        {/* 1. WHAT IS AN EP */}
        <section className="ep-what">
          <div className="ep-what-inner">
            <div className="ep-what-content">
              <div className="ep-reveal">
                <h2 className="ep-section-heading">What is <span className="ep-italic-orange">an</span> <span className="ep-ep-accent">EP?</span></h2>
              </div>
              <div className="ep-reveal">
                <div className="ep-what-body">
                  <p>An <strong>Accredited Exercise Physiologist (AEP)</strong> is a university-qualified allied health professional who specialises in clinical exercise prescription for injury, chronic disease, and performance.</p>
                  <p>In simple terms: where a personal trainer helps you train, and a physiotherapist treats your acute injury, an EP is the bridge that takes you from rehab to long-term capacity using exercise as medicine.</p>
                </div>
              </div>
            </div>
            <div className="ep-what-image ep-reveal">
              <img src="/images/ep-specialist.jpg" alt="Accredited Exercise Physiologist" />
              <div className="ep-image-tag">Accredited Exercise Physiologist</div>
            </div>
          </div>
        </section>

        {/* 2. BENEFITS */}
        <section className="ep-benefits">
          <div className="ep-benefits-inner">
            <div className="ep-benefits-header ep-reveal">
              <h2 className="ep-section-heading">Benefits of <span className="ep-italic-orange">an</span> <span className="ep-ep-accent">EP.</span></h2>
              <p className="ep-lead">A clinical lens on training means safer progress, fewer setbacks, and a program built specifically for what your body actually needs — whether that&apos;s recovering from injury, managing a condition, or pushing toward a strength or physique goal.</p>
            </div>

            <div className="ep-benefits-grid">
              <div className="ep-benefit-card ep-reveal" style={{ transitionDelay: '0s' }}>
                <div className="ep-benefit-num">01</div>
                <h3 className="ep-benefit-title">Evidence-based programs</h3>
                <p className="ep-benefit-body">Every exercise is prescribed for a clinical reason — rooted in current research and the specifics of your body, not generic templates.</p>
              </div>
              <div className="ep-benefit-card ep-reveal" style={{ transitionDelay: '0.08s' }}>
                <div className="ep-benefit-num">02</div>
                <h3 className="ep-benefit-title">Safe for chronic conditions</h3>
                <p className="ep-benefit-body">EPs are trained to work with diabetes, cardiovascular disease, arthritis, neurological conditions and more — adjusting load and intensity to your diagnosis.</p>
              </div>
              <div className="ep-benefit-card ep-reveal" style={{ transitionDelay: '0.16s' }}>
                <div className="ep-benefit-num">03</div>
                <h3 className="ep-benefit-title">Measurable progress</h3>
                <p className="ep-benefit-body">Using VALD performance testing, your progress is tracked with objective data — not just how you feel that day.</p>
              </div>
              <div className="ep-benefit-card ep-reveal" style={{ transitionDelay: '0s' }}>
                <div className="ep-benefit-num">04</div>
                <h3 className="ep-benefit-title">Rebate-eligible</h3>
                <p className="ep-benefit-body">Sessions can be claimed through Medicare EPC, private health, WorkCover, NDIS and DVA — making expert care more affordable.</p>
              </div>
              <div className="ep-benefit-card ep-reveal" style={{ transitionDelay: '0.08s' }}>
                <div className="ep-benefit-num">05</div>
                <h3 className="ep-benefit-title">Long-term continuity</h3>
                <p className="ep-benefit-body">EPs don&apos;t discharge you after the acute phase. The same clinician who assesses you can train you for life, in the same building.</p>
              </div>
              <div className="ep-benefit-card ep-reveal" style={{ transitionDelay: '0.16s' }}>
                <div className="ep-benefit-num">06</div>
                <h3 className="ep-benefit-title">Strength &amp; physique goals</h3>
                <p className="ep-benefit-body">EPs aren&apos;t just for rehab. Whether you want to lift heavier, hit a target physique, or push past a plateau, a clinical approach makes every session count.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. FUNDING */}
        <section className="ep-funding">
          <div className="ep-funding-inner">
            <div className="ep-funding-header ep-reveal">
              <h2 className="ep-section-heading">Funding <span className="ep-italic-orange">options.</span></h2>
              <p className="ep-lead">EP sessions can be funded through a range of schemes. We&apos;ll help you work out what you&apos;re eligible for and handle the paperwork on your end.</p>
            </div>

            <ul className="ep-funding-list">
              <li className="ep-funding-item ep-reveal">
                <div className="ep-funding-name">WorkCover WA</div>
                <p className="ep-funding-desc">If you&apos;ve been injured at work, EP sessions can be billed directly to your WorkCover insurer — no out-of-pocket cost. We handle invoicing with all major WA insurers including ICWA, GIO, CGU and more.</p>
              </li>
              <li className="ep-funding-item ep-reveal">
                <div className="ep-funding-name">Medicare<span className="ep-acronym">EPC / CDM</span></div>
                <p className="ep-funding-desc">Under a GP&apos;s Chronic Disease Management plan, eligible patients receive a Medicare rebate for up to five allied health sessions per year, including EP. Talk to your GP about whether you qualify.</p>
              </li>
              <li className="ep-funding-item ep-reveal">
                <div className="ep-funding-name">NDIS</div>
                <p className="ep-funding-desc">For self-managed and plan-managed NDIS participants, EP services can be funded under Improved Health and Wellbeing or Capacity Building supports.</p>
              </li>
              <li className="ep-funding-item ep-reveal">
                <div className="ep-funding-name">DVA</div>
                <p className="ep-funding-desc">Eligible Department of Veterans&apos; Affairs cardholders can access EP sessions with no gap fee — we bill DVA directly on your behalf.</p>
              </li>
              <li className="ep-funding-item ep-reveal">
                <div className="ep-funding-name">Private Health</div>
                <p className="ep-funding-desc">Most major private health funds with extras cover include rebates for Exercise Physiology. Bring your card and we&apos;ll process the claim on the spot via HICAPS.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* 4. WHAT EP TREATS */}
        <section className="ep-treats">
          <div className="ep-treats-inner">
            <aside className="ep-treats-aside ep-reveal">
              <h2 className="ep-section-heading">What we <span className="ep-italic-orange">treat.</span></h2>
              <p className="ep-treats-sub">From acute recovery to chronic disease management to performance goals — EP supports the full spectrum of health, movement, and physique outcomes.</p>
            </aside>

            <ol className="ep-treats-list">
              {treatsList.map((treat, index) => (
                <li key={index} className="ep-reveal" style={{ transitionDelay: `${index * 0.05}s` }}>
                  <div className="ep-treat-text">{treat}</div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 5. VALD */}
        <section className="ep-vald">
          <div className="ep-vald-inner">
            <div className="ep-vald-top">
              <div className="ep-vald-header ep-reveal">
                <h2 className="ep-section-heading">VALD <span className="ep-italic-orange">technology.</span></h2>
                <p className="ep-lead">VALD is the same body-assessment technology used by elite sporting teams and hospital rehab programs around the world. <strong>At Valen Health, every member has access</strong> — whether you&apos;re rebuilding from injury, managing a condition, or chasing a heavier squat or a target physique.</p>
                <p className="ep-lead" style={{ marginTop: '16px' }}>In simple terms — VALD measures exactly how your muscles are performing. It identifies weaknesses, imbalances, and asymmetries that can&apos;t be seen with the naked eye. It takes the guesswork out of training, recovery, and performance.</p>
              </div>
              <div className="ep-vald-image ep-reveal">
                <img src="/images/valid-image.jpg" alt="VALD Force Plates" />
              </div>
            </div>

            <div className="ep-vald-uses">
              <div className="ep-vald-use ep-reveal">
                <div className="ep-vald-use-num">01</div>
                <h3 className="ep-vald-use-title">Performance &amp; physique</h3>
                <p className="ep-vald-use-body">Want to lift heavier, hit a target physique, or push past a plateau? VALD identifies exactly where your body&apos;s limiters are — so every session counts and progress becomes precise, not guesswork.</p>
              </div>
              <div className="ep-vald-use ep-reveal">
                <div className="ep-vald-use-num">02</div>
                <h3 className="ep-vald-use-title">Post-injury &amp; surgery</h3>
                <p className="ep-vald-use-body">Track your rehab objectively and know exactly when your body is ready for full activity — reducing the risk of re-injury.</p>
              </div>
              <div className="ep-vald-use ep-reveal">
                <div className="ep-vald-use-num">03</div>
                <h3 className="ep-vald-use-title">Chronic conditions</h3>
                <p className="ep-vald-use-body">Get a measurable picture of your physical capacity so your EP can build a program that&apos;s safe, targeted and genuinely effective.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. EP vs PHYSIO vs PT */}
        <section className="ep-compare">
          <div className="ep-compare-inner">
            <div className="ep-compare-header ep-reveal">
              <h2 className="ep-section-heading"><span className="ep-ep-accent">EP</span> vs Physio <span className="ep-italic-orange">vs</span> <span className="ep-ep-accent">PT.</span></h2>
              <p className="ep-lead">All three professions move bodies — but they&apos;re trained for different things. Here&apos;s how they actually compare.</p>
            </div>

            <div className="ep-compare-table ep-reveal">
              <div className="ep-compare-row ep-head">
                <div className="ep-compare-cell ep-label-col"></div>
                <div className="ep-compare-cell ep-highlight">Exercise Physiologist</div>
                <div className="ep-compare-cell">Physiotherapist</div>
                <div className="ep-compare-cell">Personal Trainer</div>
              </div>

              <div className="ep-compare-row">
                <div className="ep-compare-cell ep-label-col">Qualification</div>
                <div className="ep-compare-cell ep-highlight">University degree (4 yrs), AEP-accredited allied health</div>
                <div className="ep-compare-cell">University degree (4 yrs), allied health</div>
                <div className="ep-compare-cell">Certificate III &amp; IV (Cert IV most common)</div>
              </div>

              <div className="ep-compare-row">
                <div className="ep-compare-cell ep-label-col">Primary focus</div>
                <div className="ep-compare-cell ep-highlight">Long-term exercise prescription, chronic disease, capacity</div>
                <div className="ep-compare-cell">Diagnosis &amp; hands-on treatment of acute injury</div>
                <div className="ep-compare-cell">General fitness, strength &amp; weight goals</div>
              </div>

              <div className="ep-compare-row">
                <div className="ep-compare-cell ep-label-col">Approach</div>
                <div className="ep-compare-cell ep-highlight">Movement &amp; exercise as medicine</div>
                <div className="ep-compare-cell">Manual therapy + short-term exercise</div>
                <div className="ep-compare-cell">Workout programming &amp; coaching</div>
              </div>

              <div className="ep-compare-row">
                <div className="ep-compare-cell ep-label-col">Treats chronic disease</div>
                <div className="ep-compare-cell ep-highlight">Yes — core training</div>
                <div className="ep-compare-cell">Limited</div>
                <div className="ep-compare-cell">No</div>
              </div>

              <div className="ep-compare-row">
                <div className="ep-compare-cell ep-label-col">Medicare rebate</div>
                <div className="ep-compare-cell ep-highlight">Yes (under EPC/CDM)</div>
                <div className="ep-compare-cell">Yes (under EPC/CDM)</div>
                <div className="ep-compare-cell">No</div>
              </div>

              <div className="ep-compare-row">
                <div className="ep-compare-cell ep-label-col">NDIS / DVA / WorkCover</div>
                <div className="ep-compare-cell ep-highlight">Yes — all eligible</div>
                <div className="ep-compare-cell">Yes — all eligible</div>
                <div className="ep-compare-cell">No</div>
              </div>

              <div className="ep-compare-row">
                <div className="ep-compare-cell ep-label-col">Best for</div>
                <div className="ep-compare-cell ep-highlight">Returning to long-term capacity, managing conditions, lifelong training</div>
                <div className="ep-compare-cell">Acute injury, post-op early recovery, manual therapy</div>
                <div className="ep-compare-cell">General fitness, motivation, gym programming</div>
              </div>
            </div>
          </div>
        </section>

        {/* CLASS SCHEDULE */}
        <ClassSchedule />

        {/* FINAL CTA */}
        <ReadyToStart />
      </main>

      <Footer />
    </>
  );
}
