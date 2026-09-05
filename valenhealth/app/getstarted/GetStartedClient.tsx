"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  trackConversion,
  trackCallConversion,
  trackFormLeadConversion,
} from "../../lib/gtag";
import { sendAssessmentEmail } from "./actions";
import "./get-started.css";

const CONCERNS = [
  "Back or neck pain",
  "Knee, hip or shoulder",
  "Arthritis or joint pain",
  "Bone health",
  "Diabetes or weight",
  "Heart or lungs",
  "After an operation",
  "Getting stronger safely",
  "Staying well as I age",
  "Something else",
];

const FUNDING_OPTIONS = [
  "Private",
  "Private health fund",
  "Medicare care plan",
  "WorkCover",
  "NDIS",
  "DVA",
  "I'm not sure",
];

const HERO_CHECKLIST = [
  "A 24/7 gym under the same roof — join it and train where you were assessed, with the people who built your program",
  "A program built for your body — by an Exercise Physiologist",
  "Never trained before? We test where you're at first, so everything starts from what you can actually do today",
  "Private health claimed at the desk — on HICAPS, before you leave",
];

// Fixed whitelist — only ever prints a name from this list, never anything from the URL directly.
const SUBURB_WHITELIST = [
  "Spearwood", "Hamilton Hill", "Coogee", "North Coogee", "Munster", "Beeliar",
  "Yangebup", "Bibra Lake", "Cockburn Central", "Jandakot", "Success", "Atwell",
  "Hammond Park", "Kardinya", "Melville", "Fremantle", "South Fremantle",
  "East Fremantle", "White Gum Valley", "Samson", "Coolbellup", "O'Connor",
  "Bicton", "Palmyra", "Willagee", "Winthrop", "Leeming", "Bull Creek",
  "Murdoch", "Aubin Grove", "Wandi", "Banjup",
];

const FUNDING_ROWS = [
  {
    label: "Private health",
    value: "Claimed at the desk on HICAPS",
  },
  { label: "DVA", value: "Fully covered" },
  { label: "NDIS", value: "Self-managed and plan-managed" },
  {
    label: "Medicare",
    value: "Care plan referrals welcome — ask how it works for you",
  },
];

const FOUR_STEPS = [
  {
    tag: "Day one",
    title: "You come in",
    body: "About an hour with your Exercise Physiologist. We talk through what hurts and what you want back — then we actually test you. Strength, balance, how you move. So nothing after this is a guess.",
  },
  {
    tag: "Same day",
    title: "You get your program",
    body: "Built for your body — not a class, not a printed sheet. It's on your phone, day by day, with a video for every exercise, so you're never standing there guessing.",
  },
  {
    tag: "From then on",
    title: "You train here",
    body: "The gym is part of the clinic, open 24/7. Join as a member and it's the same floor you were assessed on — early, late or on a Sunday, around people who know your history.",
  },
  {
    tag: "When you're ready",
    title: "Book a re-test",
    body: "We measure the same things again and change the program to match. You see the numbers move — so you know it's working, instead of hoping it is.",
  },
];

const VALD_COLUMNS = [
  {
    title: "Which side is weaker",
    body: "Almost everyone is stronger on one side and doesn't know it. That gap is often what's causing the pain.",
  },
  {
    title: "How far you can move",
    body: "Measured properly, not guessed at by eye.",
  },
  {
    title: "How you compare",
    body: "Against thousands of other people your age. So you know what “normal” actually looks like for you.",
  },
  {
    title: "Whether it's working",
    body: "Book the same test again down the track. You see the change as a number, not a feeling.",
  },
];

const CLINICIANS = [
  {
    name: "Aaron Dean",
    role: "Clinical Lead · Accredited Exercise Physiologist",
    tag: "Previously Exercise Physiologist, West Coast Eagles",
    bio: "Aaron's been an Exercise Physiologist for ten years. For part of that he looked after the players at the West Coast Eagles — the kind of job where you learn fast that nobody gets better from being told to “just rest.” He runs the clinical team at Valen now, and most of his week is spent with people who aren't athletes at all: a bloke whose knee has stopped him kicking the footy with his kids, a woman whose GP just said the words “bone density,” a man who simply hasn't felt strong in years. He'll sit with you, actually listen, test what's going on rather than guess, and build you something you'll genuinely do. Then you'll see him on the floor while you're doing it.",
    image: "/images/EP/RSH2.jpeg",
  },
  {
    name: "Kaylee van Schalkwyk",
    role: "Accredited Exercise Physiologist",
    tag: "ESSA Accredited Exercise Physiologist",
    bio: "Kaylee is who you want if you're a bit nervous about all this. She's an ESSA-accredited Exercise Physiologist, and she has a way of making the first session feel like the easy part — no jargon, no being thrown in the deep end, just a clear plan and someone beside you while you get going. She works with people rebuilding after surgery, people managing a condition their doctor has only just named, and people who simply haven't felt strong in years and want that back. Whatever you walk in with, she starts where you are.",
    image: "/images/EP/RSH1.jpg",
  },
];

const SCHEDULE_CHECKLIST = [
  "Your week laid out day by day — nothing to remember",
  "Something hurt? Leave a note in the app and you and your EP can talk it through at your next visit",
  "Watch your own numbers climb week by week — no guessing whether it's working",
];

const THREE_REASONS = [
  {
    title: "Something hurts",
    items: [
      "Back and neck pain",
      "Knee, hip and shoulder",
      "Arthritis and joint pain",
      "Pain nothing has shifted",
      "Getting back after an operation",
      "An old injury that keeps flaring",
    ],
  },
  {
    title: "Something's been diagnosed",
    items: [
      "Type 2 diabetes",
      "Osteoporosis and bone density",
      "Heart conditions",
      "Lung conditions and COPD",
      "Blood pressure and cholesterol",
      "Weight you can't shift",
    ],
  },
  {
    title: "You want to stay well",
    items: [
      "Getting stronger, done properly",
      "Staying capable as you age",
      "Balance and steadiness",
      "Building bone before it's a problem",
      "Starting out with no idea where to begin",
      "Getting ready for surgery, not just after",
    ],
  },
];

const REVIEWS = [
  {
    name: "Harish K.",
    rating: 5,
    text: "Been training at Valen for a while now and really enjoying it. The gym is clean, well set up and has a good vibe — not overcrowded or intimidating.",
    source: "Google review",
  },
  {
    name: "Sally F.",
    rating: 5,
    text: "Valen Health is a fantastic new gym with a welcoming atmosphere and highly knowledgeable staff who go above and beyond to support your fitness or recovery journey.",
    source: "Google review",
  },
];

const FAQS = [
  {
    q: "Do I need a referral from my doctor?",
    a: "No. Most people book straight in and claim through their private health at the desk. If your GP has already given you a care plan, bring it along and we'll sort out how it applies.",
  },
  {
    q: "I'm not injured and nothing hurts. Is this still for me?",
    a: "Yes, and it's a big part of what we do. Plenty of people come in with nothing wrong — they just want to get stronger without guessing, or stay capable into their sixties and seventies. Building strength before there's a problem is far easier than fixing one afterwards.",
  },
  {
    q: "I haven't exercised in years. Is this going to be too much?",
    a: "We start where you are, not where a textbook says you should be. The first session is mostly us finding out what your body can currently handle. Plenty of people walk in having done nothing for a decade.",
  },
  {
    q: "How is this different from a physio?",
    a: "A physio treats you — hands-on, in the room, usually until the worst of it settles. An Exercise Physiologist is university-qualified in using exercise itself as the treatment: we build you a program, watch you do it, and change it as you get stronger. A physio is often what gets you through the bad stage. We're the part after — building you back up so it holds. Plenty of people do both.",
  },
  {
    q: "Will it make the pain worse?",
    a: "It shouldn't. You're supervised the whole time, and the program is set at a level you can manage. If something hurts, we change it — that's the point of having someone there.",
  },
  {
    q: "How long before I notice something?",
    a: "Most people feel a difference within a few weeks. We re-run the same measurements at six weeks so you can see it, rather than just hoping.",
  },
  {
    q: "What happens when the program finishes?",
    a: "Nothing changes location. You can join the gym — it's the same floor you've been assessed on, open 24/7 — and keep going around staff who already know your history. Book a re-test whenever you want to see how far you've come.",
  },
];

export default function GetStartedClient() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [selectedConcern, setSelectedConcern] = useState<string | null>(
    "Back or neck pain",
  );
  const [selectedFunding, setSelectedFunding] = useState<string | null>(
    "Private",
  );
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [agreeConsent, setAgreeConsent] = useState(false);
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const eyebrowSuffixRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const kw = (params.get("kw") || "").toLowerCase();
    if (!kw || !eyebrowSuffixRef.current) return;
    const match = SUBURB_WHITELIST.find(
      (suburb) => kw.includes(suburb.toLowerCase()) && suburb !== "Spearwood",
    );
    if (match) {
      eyebrowSuffixRef.current.textContent = ` · near ${match}`;
    }
  }, []);

  const handlePhoneClick = () => {
    trackConversion();
    trackCallConversion();
  };

  const handleStep1Continue = () => {
    if (!selectedConcern) return;
    setCurrentStep(2);
  };

  const handleStep2Continue = () => {
    if (!selectedFunding) return;
    setCurrentStep(3);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !phone.trim() || !email.trim()) {
      setFormErrorMessage("Please fill in your name, mobile, and email.");
      return;
    }
    if (!agreeConsent) {
      setFormErrorMessage("Please check the consent box to proceed.");
      return;
    }

    setFormStatus("loading");
    setFormErrorMessage("");

    try {
      const res = await sendAssessmentEmail({
        concern: selectedConcern || "Back or neck pain",
        funding: selectedFunding || "Private",
        firstName: firstName.trim(),
        phone: phone.trim(),
        email: email.trim(),
      });

      if (res.status === "success") {
        trackFormLeadConversion();
        setFormStatus("success");
      } else {
        setFormStatus("error");
        setFormErrorMessage(res.message);
      }
    } catch (err) {
      setFormStatus("error");
      setFormErrorMessage(
        "Could not submit your request. Please call 0489 293 000.",
      );
    }
  };

  return (
    <main className="gs-page">
      {/* LANDING HEADER */}
      <header className="gs-header">
        <a href="/" className="gs-header-logo" aria-label="Valen Health">
          <img
            src="/images/logo/1.png"
            alt="Valen Health"
            className="gs-header-logo-mark"
          />
          <span className="gs-header-logo-text">VALEN HEALTH</span>
        </a>
        <div className="gs-header-actions">
          <a
            href="tel:0489293000"
            className="gs-header-phone"
            onClick={handlePhoneClick}
          >
            0489 293 000
          </a>
          <a href="#assessment-form" className="gs-header-cta">
            Book Your Assessment
          </a>
        </div>
      </header>

      {/* GOOGLE REVIEWS BAR */}
      <div className="gs-google-bar">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.08H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.92l2.85-2.22-.19-.6z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1.5 12 1.5 7.7 1.5 3.99 3.97 2.18 7.08l3.66 2.84c.87-2.6 3.3-4.54 6.16-4.54z"
          />
        </svg>
        <span className="gs-google-score">5.0</span>
        <span className="gs-google-stars">★★★★★</span>
        <span className="gs-google-count">
          30+ reviews on{" "}
          <a
            href="https://g.page/r/CWPLt75Wh5n3EBM"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google
          </a>
        </span>
      </div>

      {/* HERO */}
      <section className="gs-hero">
        <div className="gs-hero-grid">
          <div>
            <div className="gs-hero-eyebrow">
              Exercise Physiology · 24/7 Gym · Spearwood
              <span ref={eyebrowSuffixRef} />
            </div>
            <h1 className="gs-hero-title">
              A program built for <span className="gs-orange-text">your</span>{" "}
              body.
              <br />
              No guesswork.
            </h1>
            <p className="gs-hero-body">
              An ache that won&apos;t go. A condition you&apos;re managing. Or
              simply wanting to get stronger. You see an Exercise
              Physiologist, get a program built around you, and train in our
              24/7 gym — same room, whenever suits, with someone who knows
              your history.
            </p>
            <div className="gs-hero-ctas">
              <a href="#assessment-form" className="gs-btn gs-btn-primary">
                Book Your Assessment
              </a>
              <a
                href="tel:0489293000"
                className="gs-btn gs-btn-outline"
                onClick={handlePhoneClick}
              >
                Call 0489 293 000
              </a>
            </div>
            <div className="gs-hero-checklist">
              {HERO_CHECKLIST.map((item) => (
                <div className="gs-check-item" key={item}>
                  <span className="gs-check-mark">✓</span>
                  <span className="gs-check-text">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ASSESSMENT FORM CARD */}
          <div className="gs-form-card" id="assessment-form">
            {formStatus === "success" ? (
              <div className="gs-form-success">
                <div className="gs-success-icon">✓</div>
                <h3 className="gs-success-title">Assessment Requested!</h3>
                <p className="gs-success-body">
                  Thank you, <strong>{firstName}</strong>. We have received your
                  assessment request for <em>{selectedConcern}</em> and will
                  review it and get in touch with you the same working day.
                </p>
                <div className="gs-success-contact">
                  Need immediate assistance?{" "}
                  <a href="tel:0489293000" onClick={handlePhoneClick}>
                    Call 0489 293 000
                  </a>
                </div>
                <button
                  type="button"
                  className="gs-success-reset-btn"
                  onClick={() => {
                    setFormStatus("idle");
                    setCurrentStep(1);
                    setSelectedConcern("Back or neck pain");
                    setSelectedFunding("Private");
                    setFirstName("");
                    setPhone("");
                    setEmail("");
                    setAgreeConsent(false);
                  }}
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <>
                <div className="gs-form-card-header">
                  <h2 className="gs-form-card-title">Book Your Assessment.</h2>
                  <span className="gs-form-step">Step {currentStep} of 3</span>
                </div>
                <p className="gs-form-sub">
                  Takes around 30 seconds. We respond the same working day.
                </p>
                <div className="gs-progress-track">
                  <div
                    className="gs-progress-fill"
                    style={{
                      width:
                        currentStep === 1
                          ? "33.3%"
                          : currentStep === 2
                            ? "66.6%"
                            : "100%",
                    }}
                  />
                </div>

                {/* STEP 1 OF 3 */}
                {currentStep === 1 && (
                  <div className="gs-form-step-content">
                    <div className="gs-form-label">
                      What would you like help with?
                    </div>
                    <div className="gs-option-grid">
                      {CONCERNS.map((concern) => (
                        <button
                          key={concern}
                          type="button"
                          className={`gs-option-btn ${selectedConcern === concern ? "selected" : ""}`}
                          onClick={() => setSelectedConcern(concern)}
                          aria-pressed={selectedConcern === concern}
                        >
                          {concern}
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="gs-continue-btn"
                      disabled={!selectedConcern}
                      onClick={handleStep1Continue}
                    >
                      Continue
                    </button>
                  </div>
                )}

                {/* STEP 2 OF 3 */}
                {currentStep === 2 && (
                  <div className="gs-form-step-content">
                    <div className="gs-form-label">
                      How will your sessions be funded?
                    </div>
                    <div className="gs-option-grid">
                      {FUNDING_OPTIONS.map((funding) => (
                        <button
                          key={funding}
                          type="button"
                          className={`gs-option-btn ${selectedFunding === funding ? "selected" : ""}`}
                          onClick={() => setSelectedFunding(funding)}
                          aria-pressed={selectedFunding === funding}
                        >
                          {funding}
                        </button>
                      ))}
                    </div>
                    <div className="gs-form-step2-actions">
                      <button
                        type="button"
                        className="gs-back-btn"
                        onClick={() => setCurrentStep(1)}
                      >
                        ← Back
                      </button>
                    </div>
                    <button
                      type="button"
                      className="gs-continue-btn"
                      disabled={!selectedFunding}
                      onClick={handleStep2Continue}
                    >
                      Continue
                    </button>
                  </div>
                )}

                {/* STEP 3 OF 3 */}
                {currentStep === 3 && (
                  <form
                    onSubmit={handleFinalSubmit}
                    className="gs-form-step-content"
                  >
                    <div className="gs-form-label">How can we contact you?</div>

                    <div className="gs-input-group">
                      <label className="gs-input-label" htmlFor="gs-firstName">
                        First name
                      </label>
                      <input
                        id="gs-firstName"
                        type="text"
                        required
                        className="gs-input-field"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Your first name"
                      />
                    </div>

                    <div className="gs-input-group">
                      <label className="gs-input-label" htmlFor="gs-phone">
                        Mobile
                      </label>
                      <input
                        id="gs-phone"
                        type="tel"
                        required
                        className="gs-input-field"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0400 000 000"
                      />
                    </div>

                    <div className="gs-input-group">
                      <label className="gs-input-label" htmlFor="gs-email">
                        Email
                      </label>
                      <input
                        id="gs-email"
                        type="email"
                        required
                        className="gs-input-field"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                      />
                    </div>

                    <label className="gs-checkbox-label">
                      <input
                        type="checkbox"
                        checked={agreeConsent}
                        onChange={(e) => setAgreeConsent(e.target.checked)}
                        className="gs-checkbox-input"
                      />
                      <span className="gs-checkbox-text">
                        I agree to Valen Health collecting and handling my
                        health information in line with the{" "}
                        <a
                          href="/privacy"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Privacy Policy
                        </a>
                        , so you can contact me about my enquiry.
                      </span>
                    </label>

                    {formErrorMessage && (
                      <div className="gs-form-error">{formErrorMessage}</div>
                    )}

                    <button
                      type="submit"
                      className="gs-continue-btn"
                      disabled={
                        formStatus === "loading" ||
                        !agreeConsent ||
                        !firstName ||
                        !phone ||
                        !email
                      }
                    >
                      {formStatus === "loading"
                        ? "Requesting..."
                        : "Request My Assessment"}
                    </button>

                    <div className="gs-form-step3-actions">
                      <button
                        type="button"
                        className="gs-back-btn"
                        onClick={() => setCurrentStep(2)}
                      >
                        ← Back
                      </button>
                    </div>
                  </form>
                )}

                <p className="gs-form-footnote">
                  No obligation. We&apos;ll call you back and talk it through
                  before you commit to anything.
                  <br />
                  Not ready to book?{" "}
                  <a href="tel:0489293000" onClick={handlePhoneClick}>
                    Call us
                  </a>{" "}
                  and talk it through first — no booking needed.
                </p>
                <div className="gs-form-trust-row">
                  <span>✓ ESSA Accredited</span>
                  <span>✓ No lock-in</span>
                  <span>✓ Your details stay with us</span>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* PRIVATE HEALTH / FUNDING BAND */}
      <section className="gs-funding-band">
        <div className="gs-funding-inner">
          <div className="gs-funding-copy">
            <h2 className="gs-funding-title">
              Covered by private health?
              <br />
              Claim it before you leave.
            </h2>
            <p className="gs-funding-body">
              HICAPS is at the front desk, so your rebate comes off there and
              then and you only pay the difference. No forms to post, no
              waiting weeks to get money back. NDIS and DVA are handled here
              too.
            </p>
          </div>
          <div className="gs-funding-rows">
            {FUNDING_ROWS.map((row) => (
              <div className="gs-funding-row" key={row.label}>
                <span className="gs-funding-row-label">{row.label}</span>
                <span className="gs-funding-row-sep">·</span>
                <span className="gs-funding-row-value">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUR STEPS */}
      <section className="gs-section gs-section--cream">
        <div className="gs-section-inner">
          <h2 className="gs-h2 gs-ink">Four steps. That&apos;s the whole thing.</h2>
          <p className="gs-lead gs-ink-soft">
            No jargon, no mystery. Here&apos;s exactly how it goes.
          </p>
          <div className="gs-steps-grid">
            {FOUR_STEPS.map((step, index) => (
              <div className="gs-step-card" key={step.title}>
                <div className="gs-step-num">{index + 1}</div>
                <div className="gs-step-tag">{step.tag}</div>
                <h3 className="gs-step-title">{step.title}</h3>
                <p className="gs-step-body">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY WE MEASURE FIRST — VALD */}
      <section className="gs-section gs-section--dark">
        <div className="gs-section-inner">
          <div className="gs-eyebrow">Why We Measure First</div>
          <h2 className="gs-h2">
            The same equipment AFL and NFL teams use on their players.
          </h2>
          <p className="gs-lead gs-lead-dark">
            Professional clubs use it to work out exactly where an athlete is
            weak, so they don&apos;t guess with a million-dollar player.
            We&apos;ve taken the same gear and pointed it at ordinary people
            with sore backs and dodgy knees. You stand on a plate for a few
            seconds. That&apos;s the whole test — no needles, no scans,
            nothing uncomfortable.
          </p>
          <div className="gs-vald-columns">
            {VALD_COLUMNS.map((col) => (
              <div className="gs-vald-col" key={col.title}>
                <div className="gs-vald-col-title">{col.title}</div>
                <p className="gs-vald-col-body">{col.body}</p>
              </div>
            ))}
          </div>

          <div className="gs-results-panel">
            <div className="gs-results-card">
              <div className="gs-results-image-wrap">
                <Image
                  src="/images/getstarted/whywemessureleft.png"
                  alt="Results screen on the Valen app showing strength test scores"
                  width={376}
                  height={772}
                  quality={100}
                  className="gs-results-image"
                />
              </div>
              <p className="gs-mockup-caption">
                <strong>What you see.</strong> Your own numbers on your phone,
                with the gap spelled out in plain English —
                &ldquo;your left max force is 1.7 kg more than your
                right.&rdquo;
              </p>
            </div>

            <div className="gs-stats-panel">
              <div className="gs-stats-image-wrap">
                <Image
                  src="/images/getstarted/whywemessureright.png"
                  alt="Exercise Physiologist dashboard showing every test side by side with trend lines"
                  width={2396}
                  height={1560}
                  className="gs-stats-image"
                />
              </div>
              <p className="gs-mockup-caption">
                <strong>What your Exercise Physiologist sees.</strong> Every
                test side by side — strength, balance, both sides of your
                body — with the trend line for each one. This is what your
                program gets built from, and what changes when you re-test.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHO YOU'LL ACTUALLY SEE */}
      <section className="gs-section gs-section--cream">
        <div className="gs-section-inner">
          <div className="gs-eyebrow">Who You&apos;ll Actually See</div>
          <h2 className="gs-h2 gs-ink">The same people, every session.</h2>
          <p className="gs-lead gs-ink-soft">
            Not a rotating roster. You get one Exercise Physiologist who
            learns your history and stays with you.
          </p>
          <div className="gs-clinicians-grid">
            {CLINICIANS.map((clinician) => (
              <div className="gs-clinician-card" key={clinician.name}>
                <div className="gs-clinician-photo-wrap">
                  <Image
                    src={clinician.image}
                    alt={clinician.name}
                    width={290}
                    height={340}
                    className="gs-clinician-img"
                  />
                </div>
                <div className="gs-clinician-info">
                  <h3 className="gs-clinician-name">{clinician.name}</h3>
                  <div className="gs-clinician-role">{clinician.role}</div>
                  <p className="gs-clinician-bio">{clinician.bio}</p>
                  <div className="gs-clinician-badge">{clinician.tag}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* YOUR PROGRAM, ON YOUR PHONE */}
      <section className="gs-section gs-section--white">
        <div className="gs-section-inner gs-schedule-grid">
          <div className="gs-schedule-image-wrap">
            <Image
              src="/images/getstarted/Yourprogramonyourphone.png"
              alt="Today's schedule screen on the Valen app showing exercises for each day"
              width={447}
              height={855}
              quality={100}
              className="gs-schedule-image"
            />
          </div>
          <div>
            <div className="gs-eyebrow">Your Program, On Your Phone</div>
            <h2 className="gs-h2 gs-ink">
              You&apos;ll never stand there wondering what to do next.
            </h2>
            <p className="gs-lead gs-ink-soft">
              Every exercise has a short video showing exactly what to do —
              and where it&apos;s on one of our machines, that&apos;s the
              machine you&apos;ll be standing at. Sets, reps and weights are
              written down. You tick them off as you go.
            </p>
            <div className="gs-hero-checklist gs-checklist-light">
              {SCHEDULE_CHECKLIST.map((item) => (
                <div className="gs-check-item" key={item}>
                  <span className="gs-check-mark">✓</span>
                  <span className="gs-check-text gs-check-text-dark">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* THE CLINIC IS THE GYM */}
      <section className="gs-section gs-section--dark">
        <div className="gs-section-inner">
          <div className="gs-clinic-top">
            <div>
              <div className="gs-eyebrow">The Clinic Is The Gym</div>
              <h2 className="gs-h2">You don&apos;t have to go anywhere else.</h2>
              <p className="gs-lead gs-lead-dark">
                Most clinics assess you, hand you a sheet of exercises and
                send you off to find a gym on your own. We are the gym. Full
                strength floor, open 24/7, and the people who wrote your
                program are on the same floor. When your program finishes,
                you join the gym and keep going — same room, same faces.
              </p>
            </div>
            <div className="gs-clinic-open">
              <span className="gs-clinic-open-num">24/7</span>
              <span className="gs-clinic-open-body">
                Open any hour. No lock-in contract. Free parking at the door.
              </span>
            </div>
          </div>

          <div className="gs-gym-photo-wrap">
            <Image
              src="/images/GYM/GYM_A738781.jpg"
              alt="The Valen Health gym floor"
              width={1400}
              height={933}
              className="gs-gym-photo"
              sizes="(max-width: 900px) 100vw, 1184px"
            />
          </div>
          <p className="gs-gym-caption">
            The floor you&apos;ll be training on. Same room as the clinic.
          </p>
          <p className="gs-gym-location">
            <strong>Spearwood, Rockingham Road.</strong> People come to us
            from Hamilton Hill, Coogee, Munster, Beeliar, Yangebup, Bibra
            Lake, Cockburn, Jandakot, Success, Atwell, Hammond Park, Kardinya,
            Melville, Fremantle and everywhere in between. Free parking out
            the front.
          </p>
        </div>
      </section>

      {/* THREE REASONS PEOPLE WALK IN */}
      <section className="gs-section gs-section--white">
        <div className="gs-section-inner">
          <h2 className="gs-h2 gs-ink">Three reasons people walk in.</h2>
          <p className="gs-lead gs-ink-soft">
            Only one of them involves pain. All three get the same thing: an
            assessment, a program built for you, and a gym to do it in.
          </p>
          <div className="gs-reasons-3col">
            {THREE_REASONS.map((col) => (
              <div className="gs-reasons-3col-card" key={col.title}>
                <h3 className="gs-reasons-3col-title">{col.title}</h3>
                <ul className="gs-reasons-3col-list">
                  {col.items.map((item) => (
                    <li key={item}>
                      <span className="gs-check-mark">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT PEOPLE SAY AFTERWARDS */}
      <section className="gs-section gs-section--cream">
        <div className="gs-section-inner">
          <h2 className="gs-h2 gs-ink">What people say afterwards.</h2>
          <p className="gs-lead gs-ink-soft">Thirty-plus reviews, all five stars.</p>
          <div className="gs-reviews-grid gs-reviews-grid-light">
            {REVIEWS.map((review) => (
              <div className="gs-review-card gs-review-card-light" key={review.name}>
                <div className="gs-review-stars">★★★★★</div>
                <p className="gs-review-text gs-review-text-dark">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="gs-review-footer">
                  <span className="gs-review-author-name-light">
                    {review.name}
                  </span>
                  <span className="gs-review-date-light"> · {review.source}</span>
                </div>
              </div>
            ))}
            <div className="gs-review-card gs-review-card-placeholder">
              <div className="gs-review-stars">★★★★★</div>
              <p className="gs-review-placeholder-text">
                Reserved for a review from an EP patient whose pain or
                condition improved — ask a recently discharged client this
                week.
              </p>
              <div className="gs-review-footer">
                <span className="gs-review-author-name-light">
                  First name, suburb
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="gs-section gs-section--white">
        <div className="gs-section-inner gs-faq-inner">
          <h2 className="gs-h2 gs-ink">
            The things people ask before they book.
          </h2>
          <div className="gs-faq-card">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  className={`gs-faq-item gs-faq-item-light ${isOpen ? "open" : ""}`}
                  key={faq.q}
                >
                  <button
                    type="button"
                    className="gs-faq-question gs-faq-question-light"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  >
                    <span className="gs-faq-q-text gs-faq-q-text-light">
                      {faq.q}
                    </span>
                    <span className="gs-faq-toggle" aria-hidden="true">
                      +
                    </span>
                  </button>
                  <div className="gs-faq-answer">
                    <p className="gs-faq-answer-body gs-faq-answer-body-light">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="gs-final-cta">
        <h2 className="gs-final-cta-title">
          Tell us what you&apos;re after. We&apos;ll take it from there.
        </h2>
        <p className="gs-final-cta-sub">
          Thirty seconds to fill in. We&apos;ll ring you back the same working
          day and talk it through — no obligation, no pressure.
        </p>
        <div className="gs-final-cta-actions">
          <a href="#assessment-form" className="gs-btn gs-btn-primary">
            Book Your Assessment
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="gs-footer">
        <div className="gs-footer-inner">
          <div className="gs-footer-top">
            <div className="gs-footer-brand">
              <div className="gs-footer-logo-row">
                <span className="gs-footer-eyebrow">Valen Health</span>
              </div>
              <div className="gs-footer-address">
                Unit 4, 235 Rockingham Rd, Spearwood WA 6163
                <br />
                Mon–Fri 9am–6pm · Gym open 24/7 · Free parking
              </div>
            </div>
            <div className="gs-footer-brand">
              <span className="gs-footer-eyebrow">Ready when you are</span>
              <div className="gs-footer-address">
                <a href="tel:0489293000" onClick={handlePhoneClick}>
                  0489 293 000
                </a>
                <br />
                <a href="#assessment-form">Book your assessment</a>
              </div>
            </div>
            <div className="gs-footer-brand">
              <div className="gs-trust-stars">★★★★★</div>
              <div className="gs-footer-address">
                5.0 from 30+ Google reviews
              </div>
            </div>
          </div>
          <nav className="gs-footer-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms</a>
            <a href="/contact">Contact</a>
          </nav>
        </div>
        <div className="gs-footer-accent" />
      </footer>

      {/* STICKY MOBILE CTA */}
      <div className="gs-sticky-bar">
        <a
          href="tel:0489293000"
          className="gs-sticky-btn gs-sticky-call"
          onClick={handlePhoneClick}
        >
          Call Now
        </a>
        <a href="#assessment-form" className="gs-sticky-btn gs-sticky-book">
          Book Your Assessment
        </a>
      </div>
    </main>
  );
}
