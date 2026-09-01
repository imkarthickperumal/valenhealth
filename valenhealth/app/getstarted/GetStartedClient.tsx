"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { trackCallConversion, trackFormLeadConversion } from "../../lib/gtag";
import { sendAssessmentEmail } from "./actions";
import "./get-started.css";

const CONCERNS = [
  "Back or neck pain",
  "Knee, hip or shoulder",
  "Osteoporosis / bone health",
  "Chronic condition",
  "Post-surgery rehab",
  "Strength & longevity",
  "Workplace injury",
  "Another concern",
];

const FUNDING_OPTIONS = [
  "Private",
  "Private health fund",
  "Medicare plan",
  "WorkCover",
  "NDIS",
  "DVA",
  "I'm not sure",
];

const CHECKLIST = [
  "VALD ForceDecks & DynaMo — peak force, range of motion and left–right asymmetry, quantified",
  "Graded, progressive loading — never more than your current tolerance allows",
  "Re-tested at midpoint and completion, so change is measured against your baseline",
  "ESSA-accredited Exercise Physiologists, supervising every session on site",
];

const REASONS = [
  {
    title: "Fear of re-injury.",
    body: "You have been told to stay active, but nobody has established what load is safe for your diagnosis — so you do less, or nothing.",
  },
  {
    title: "Disuse deconditioning.",
    body: "Activity reduced, strength followed, and the tissue is now less tolerant than before — which makes the pain easier to provoke.",
  },
  {
    title: "Persistent pain.",
    body: "Symptoms have outlasted normal tissue healing times, and the usual advice to rest has stopped producing any change.",
  },
  {
    title: "Imaging without a plan.",
    body: "You have a scan, a diagnosis and a good deal of advice, but no prescribed, progressive program.",
  },
  {
    title: "Low bone mineral density.",
    body: "A DEXA result you have been told to manage — usually by avoiding exactly the loading that the evidence says builds bone.",
  },
  {
    title: "Age-related loss of muscle.",
    body: "Strength, balance and bone decline measurably with age unless they are deliberately loaded against.",
  },
];

const WHY_CARDS = [
  {
    title: "Your Load Tolerance, Quantified",
    body: "VALD ForceDecks and DynaMo establish peak force, range of motion and asymmetry against normative data. Prescription starts beneath your measured tolerance, which is why it is safe to begin.",
  },
  {
    title: "Adherence Made Visible",
    body: "MoveHealth+ holds your assessment data, your daily prescription and video guidance for every exercise. Every set and load is logged, so your EP reviews actual adherence rather than recall.",
  },
  {
    title: "Maintenance, Not Relapse",
    body: "Strength and bone density regress once loading stops. Training continues in the same facility with the same clinicians, open 24 hours, so the gains you have made are held.",
  },
];

const TREAT_CARDS = [
  {
    title: "Persistent Back\n& Neck Pain",
    body: "Persistent and recurrent pain, disc-related presentations and the disuse deconditioning that follows. Managed by graded exposure and progressive loading rather than continued rest.",
  },
  {
    title: "Osteoporosis\n& Osteopenia",
    body: "Supervised high-intensity resistance and impact loading. In the LIFTMOR randomised trial, this approach improved lumbar spine and femoral neck bone mineral density in postmenopausal women with a T-score below −1.0, with no vertebral fractures recorded.",
  },
  {
    title: "Osteoarthritis\n& Tendinopathy",
    body: "Osteoarthritis and tendinopathy, where exercise is first-line care. We build the load tolerance of the tendon and the musculature supporting the joint, rather than unloading it.",
  },
  {
    title: "Post-Surgical\nRehabilitation",
    body: "Arthroplasty, reconstruction and repair. Staged from early range of motion and neuromuscular control through to restoring symmetrical strength and full functional capacity.",
  },
  {
    title: "Chronic Conditions",
    body: "Type 2 diabetes, cardiovascular disease, inflammatory arthritis and neurological conditions, with intensity, volume and modality prescribed to your diagnosis and medications.",
  },
  {
    title: "Sarcopenia &\nHealthy Ageing",
    body: "Sarcopenia and age-related decline in bone density and balance are measurable, and they respond to resistance training. We test your baseline, then load against it.",
  },
];

const PROCESS_STEPS = [
  {
    title: "Objective Baseline Assessment",
    body: "Sixty minutes on VALD ForceDecks and DynaMo, the same technology used across elite sport. Force, range of motion and left–right asymmetry are measured against normative data for your age and presentation.",
    highlight: "Your starting capacity, measured — not estimated.",
  },
  {
    title: "Individualised Exercise Prescription",
    body: "Your Exercise Physiologist prescribes from your results and the outcomes that matter to you — returning to work, lifting your children, walking without consequence the following day. Every exercise is filmed on our own equipment, so the technique and the machine are never in question.",
    highlight: "Dosed to your diagnosis and your measured tolerance.",
  },
  {
    title: "Delivered Through MoveHealth+",
    body: "Your program and your assessment data are delivered to your phone. Video guidance for every exercise, sets, repetitions and loads scheduled day by day, and the ability to record how a session felt. Your EP reviews your notes before your next appointment.",
    highlight: "Prescription, adherence and results in one clinical record.",
  },
  {
    title: "Objective Re-Assessment",
    body: "The same battery of tests is repeated at the midpoint and on completion. Force, range of motion and asymmetry, presented alongside your baseline.",
    highlight:
      "Change demonstrated against baseline, not reported by impression.",
  },
];

const FEES = [
  {
    label: "Initial Assessment",
    price: "$124",
    body: "Sixty minutes, including VALD assessment and your prescribed program.",
    highlighted: true,
  },
  {
    label: "Follow-Up Session",
    price: "$85",
    body: "Supervised session with review and progression of your program.",
  },
  {
    label: "Extended Session",
    price: "$180",
    body: "For complex presentations requiring additional time.",
  },
  {
    label: "Gym Membership",
    price: "$18",
    unit: "/wk",
    body: "24-hour access, so training continues between appointments.",
  },
];

const CLINICIANS = [
  {
    name: "Aaron Dean",
    role: "Clinical Lead · AEP",
    bio: "ESSA-accredited Exercise Physiologist leading clinical delivery at Valen.",
  },
  {
    name: "Kaylee van Schalkwyk",
    role: "Exercise Physiologist · AEP",
    bio: "ESSA-accredited Exercise Physiologist working across rehabilitation and chronic conditions.",
  },
];

const REVIEW_SLOTS = [
  "Paste a real Google review here — verbatim, with the reviewer's first name and last initial. Pick one about pain or getting back to something specific.",
  "Second real Google review. Ideally a different condition to the first so the page covers more ground.",
  "Third real Google review, plus the live star rating and total review count pulled from the Google Business Profile.",
];

const FAQS = [
  {
    q: "Will exercise make my pain worse?",
    a: "This is the concern we hear most often, and it is well recognised clinically — fear of movement affects an estimated 50 to 70% of people with chronic musculoskeletal pain. It is also treatable. The approach is graded exposure: we establish your current load tolerance by measurement rather than guesswork, prescribe beneath it, and progress only when your re-testing supports it. Sessions are supervised throughout, so nothing is attempted at an intensity your assessment has not already cleared.",
  },
  {
    q: "What actually happens in the first appointment?",
    a: "Sixty minutes. We take a full clinical history, screen your movement, and complete VALD ForceDecks and DynaMo testing to quantify peak force, range of motion and left–right asymmetry against normative data for your age and presentation. You leave understanding your baseline measurements and the program being commenced from them.",
  },
  {
    q: "What happens after the assessment?",
    a: "Your Exercise Physiologist prescribes a program from your assessment data and your goals, delivered to your phone through the MoveHealth+ app — scheduled day by day, with video guidance and your sets, repetitions and loads specified. You record each session as you complete it and may note anything that did not feel right; your EP reviews this before your next appointment. We re-test at the midpoint and on completion so improvement can be measured against your baseline.",
  },
  {
    q: "Do I receive my test results?",
    a: "You receive them. Your VALD results are held in the app alongside your program and updated at every re-test, so your progress is documented and available to you rather than reported second-hand.",
  },
  {
    q: "Do I need to be fit already?",
    a: "No, and it is not expected. Most people we assess present deconditioned after a period of avoidance. Your program is prescribed from your measured capacity on the day, whatever that capacity happens to be.",
  },
  {
    q: "Can I claim this on private health?",
    a: "Yes, provided your policy includes Exercise Physiology under extras cover. HICAPS is available on site, so your rebate is processed at the time of your appointment and you settle only the gap.",
  },
  {
    q: "I have osteoporosis. Isn't lifting weights dangerous?",
    a: "It is the assumption most people arrive with, and the evidence does not support it. The LIFTMOR randomised controlled trial supervised postmenopausal women with low bone mass through twice-weekly high-intensity resistance and impact training. It improved bone mineral density at the lumbar spine and femoral neck, improved thoracic kyphosis, and recorded no vertebral fractures. The critical words are supervised and progressive — which is precisely why it is prescribed and monitored by an Accredited Exercise Physiologist rather than attempted alone.",
  },
  {
    q: "How is this different from general gym training?",
    a: "No. Accredited Exercise Physiologists are university-qualified allied health professionals, accredited through ESSA and trained to prescribe exercise for injury and chronic disease. This is why sessions attract Medicare, health fund, WorkCover, NDIS and DVA funding.",
  },
  {
    q: "Can I continue training after my program ends?",
    a: "The training facility is in the same building and open 24 hours. Most clients move onto a membership on completion of their program, so the capacity they have built is maintained.",
  },
  {
    q: "Where are you located, and is parking available?",
    a: "Unit 4, 235 Rockingham Road, Spearwood WA 6163, with complimentary on-site parking. Exercise Physiology appointments are available Monday to Friday, 9am–6pm.",
  },
];

const BADGES = [
  "ESSA ACCREDITED",
  "HICAPS ON-SITE",
  "MEDICARE",
  "WORKCOVER WA",
  "NDIS",
  "DVA",
  "VALD TESTING",
];

const VARIANTS = [
  {
    adGroup: "EP Service (General)",
    url: "/exercise-physiology",
    h1: "We don't guess. We assess.",
    sub: "Objective testing, an exact plan for your goals, and every result in one place on your phone.",
  },
  {
    adGroup: "Condition-Specific",
    url: "/chronic-pain",
    h1: "We don't guess. We test, then build your plan.",
    sub: "Back pain, osteoporosis, arthritis, post-surgery — supervised exercise prescribed for your condition, not a template.",
  },
  {
    adGroup: "Local / Suburb",
    url: "/exercise-physiologist-spearwood",
    h1: "Exercise Physiology in Spearwood. We don't guess — we assess.",
    sub: "Clinic and 24/7 gym on Rockingham Road, with free parking. Same clinician from assessment to long-term training.",
  },
  {
    adGroup: "Medicare / Funding",
    url: "/medicare-exercise-physiology",
    h1: "Exercise Physiology, covered.",
    sub: "Medicare, private health, WorkCover, NDIS and DVA. We check what you're eligible for and handle the billing.",
  },
];

const FORM_WIRING_STEPS = [
  "The form is 3 steps and already works client-side — tapping a chip auto-advances, no Continue tap needed.",
  "On submit, POST the payload to Brevo (and/or create the PracSuite enquiry). The hook is marked // TAMIL: POST the payload here in the script at the bottom.",
  "Then call window.trackConversion() — already stubbed in, it just needs the real submit to reach it. This is what tells Google Ads a lead came in.",
  "Email the enquiry to admin@valenhealth.com.au so nothing sits unanswered.",
  "The consent checkbox is required and links to /privacy. That page must exist before the ads run.",
];

const STILL_NEEDED = [
  {
    title: "Real Photos",
    body: "Headshots for both clinicians, plus 2–3 shots of the clinic and gym floor. No stock imagery — it reads as fake and costs conversions.",
  },
  {
    title: "Real Reviews",
    body: "Three Google reviews verbatim with first name + last initial, plus the live star rating and total count for the strip under the hero.",
  },
];

const BUILD_DECISIONS = [
  {
    decision: "Embedded 3-step form",
    reason:
      "Not one competitor has a lead form on their EP page. Multi-step forms convert 14–86% above single-step because the first tap is effortless and the progress bar raises the cost of quitting.",
  },
  {
    decision: "Prices shown",
    reason:
      'Nobody in the set publishes pricing. "How much?" is the silent objection that sends people back to the search results.',
  },
  {
    decision: 'FAQ answering "will it hurt more?"',
    reason:
      "Fear of making pain worse is the single biggest barrier for this audience. No competitor page addresses it. It leads our FAQ.",
  },
  {
    decision: "Reviews and rating high on the page",
    reason:
      "South Coast Physiotherapy hit 26% conversion — against a 2–3% site average and 7.4% healthcare landing-page average — on large booking buttons and prominent reviews.",
  },
  {
    decision: "Address + phone above the fold",
    reason:
      'Local intent. People scan for "are they actually near me" before anything else.',
  },
  {
    decision: "Sticky call bar on mobile",
    reason:
      "70%+ of this traffic is mobile, and phone leads convert several times better than form fills. Both options stay in thumb reach at all times.",
  },
  {
    decision: "No referral language",
    reason:
      'Better Rehab and Physio Inq both lead with "Make a referral" — that raises a barrier before anyone has decided to come in.',
  },
  {
    decision: "Clinic + 24/7 gym as the hook",
    reason: "The one thing in this set nobody else can claim.",
  },
];

export default function GetStartedClient() {
  const router = useRouter();
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
  const [selectedFee, setSelectedFee] = useState<string>("Initial Assessment");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

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
            onClick={() => trackCallConversion()}
          >
            0489 293 000
          </a>
          <a
            href="#assessment-form"
            className="gs-header-cta"
            onClick={() => trackFormLeadConversion()}
          >
            Book Assessment
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="gs-hero">
        <div className="gs-hero-grid">
          <div>
            <div className="gs-hero-eyebrow">
              Exercise Physiology · Spearwood
            </div>
            <h1 className="gs-hero-title">
              We don&apos;t guess —<br />
              we assess.
            </h1>
            <p className="gs-hero-body">
              Persistent pain, low bone density, a joint that will not settle.
              We measure it objectively on VALD force plates, then prescribe
              load at an intensity matched to your diagnosis — supervised, and
              progressed at your pace.
            </p>
            <div className="gs-hero-ctas">
              <a
                href="#assessment-form"
                className="gs-btn gs-btn-primary"
                onClick={() => trackFormLeadConversion()}
              >
                Book Your Assessment
              </a>
              <a
                href="tel:0489293000"
                className="gs-btn gs-btn-outline"
                onClick={() => trackCallConversion()}
              >
                Call 0489 293 000
              </a>
            </div>
            <div className="gs-hero-checklist">
              {CHECKLIST.map((item) => (
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
                  <a
                    href="tel:0489293000"
                    onClick={() => trackCallConversion()}
                  >
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
              </>
            )}
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="gs-trust-bar">
        <div className="gs-trust-inner">
          <div className="gs-trust-top">
            <span className="gs-trust-stars">★★★★★</span>
            <span className="gs-trust-rating-text">
              <strong>[5.0]</strong> from <strong>[30+]</strong> Google reviews
            </span>
          </div>
          <div className="gs-trust-meta">
            4/235 Rockingham Rd, Spearwood WA 6163 ·{" "}
            <a
              href="tel:0489293000"
              className="gs-trust-phone"
              onClick={() => trackCallConversion()}
            >
              0489 293 000
            </a>{" "}
            · Mon–Fri 9am–6pm
          </div>
          <div className="gs-trust-badges">
            {BADGES.map((badge) => (
              <span className="gs-trust-badge" key={badge}>
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* WHY REFERRED & REASONS */}
      <section className="gs-statement">
        <div className="gs-statement-eyebrow">
          Why People Are Referred To Us
        </div>
        <h2 className="gs-statement-title">
          If you have stopped moving because it hurts, you are the majority.
        </h2>
        <p className="gs-statement-body">
          Fear of movement — clinically, kinesiophobia — affects an estimated 50
          to 70% of people living with chronic musculoskeletal pain, and it
          independently predicts worse recovery. It is the single most common
          presentation we assess.
        </p>

        <div className="gs-reasons-list">
          {REASONS.map((reason, index) => (
            <div className="gs-reason-row" key={reason.title}>
              <div className="gs-reason-num">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="gs-reason-text">
                <strong>{reason.title}</strong> {reason.body}
              </div>
            </div>
          ))}
        </div>

        <div className="gs-reasons-cta-wrap">
          <a
            href="#assessment-form"
            className="gs-reasons-cta"
            onClick={() => trackFormLeadConversion()}
          >
            Book Your Assessment
          </a>
        </div>
      </section>

      {/* WHY VALEN */}
      <section className="gs-why">
        <div className="gs-why-eyebrow">Why Valen</div>
        <h2 className="gs-why-title">
          Measured, prescribed,
          <br />
          supervised, re-tested.
        </h2>
        <p className="gs-why-body">
          Most rehabilitation ends the day the sessions run out. Ours does not —
          you continue training in the same facility, with the same clinician
          who assessed you.
        </p>
        <div className="gs-why-grid">
          {WHY_CARDS.map((card) => (
            <div className="gs-why-card" key={card.title}>
              <h3 className="gs-why-card-title">{card.title}</h3>
              <p className="gs-why-card-body">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT WE TREAT */}
      <section className="gs-treat">
        <div className="gs-treat-eyebrow">Areas Of Practice</div>
        <h2 className="gs-treat-title">What we treat.</h2>
        <div className="gs-treat-grid">
          {TREAT_CARDS.map((card) => (
            <div className="gs-treat-card" key={card.title}>
              <h3 className="gs-treat-card-title">
                {card.title.split("\n").map((line, i) => (
                  <span key={i}>
                    {i > 0 && <br />}
                    {line}
                  </span>
                ))}
              </h3>
              <p className="gs-treat-card-body">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* OUR PROCESS */}
      <section className="gs-process">
        <div className="gs-process-eyebrow">Our Process</div>
        <h2 className="gs-process-title">
          The assessment is where
          <br />
          your program begins.
        </h2>
        <p className="gs-process-body">
          An assessment is only clinically useful if a prescribed, progressive
          program follows it. This is what the next twelve weeks involve.
        </p>
        <div className="gs-process-grid">
          {PROCESS_STEPS.map((step, index) => (
            <div className="gs-process-card" key={step.title}>
              <div className="gs-process-step">{`Step ${String(index + 1).padStart(2, "0")}`}</div>
              <h3 className="gs-process-card-title">{step.title}</h3>
              <p className="gs-process-card-body">{step.body}</p>
              <div className="gs-process-highlight">{step.highlight}</div>
            </div>
          ))}
        </div>

        <div className="gs-afterwards-card">
          <div className="gs-process-eyebrow">Afterwards</div>
          <h3 className="gs-afterwards-title">Continuity After Discharge</h3>
          <p className="gs-afterwards-body">
            On completion, training continues in the facility you rehabilitated
            in — open 24 hours, with the same clinicians present. Most clients
            move onto a membership and retain the capacity they have spent
            months building.
          </p>
          <div className="gs-process-highlight">
            Care that outlasts the program.
          </div>
        </div>

        <a
          href="#assessment-form"
          className="gs-btn gs-btn-primary gs-afterwards-cta"
          onClick={() => trackFormLeadConversion()}
        >
          Book Your Assessment
        </a>
      </section>

      {/* FEES */}
      <section className="gs-fees">
        <div className="gs-fees-eyebrow">Fees</div>
        <h2 className="gs-fees-title">What it costs.</h2>
        <p className="gs-fees-body">
          Our fees are published in full. Private health rebates are processed
          on site through HICAPS, so you settle only the gap.
        </p>
        <div className="gs-fees-grid">
          {FEES.map((fee) => (
            <div
              className={`gs-fee-card ${selectedFee === fee.label ? "highlighted" : ""}`}
              key={fee.label}
              onClick={() => setSelectedFee(fee.label)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSelectedFee(fee.label);
                }
              }}
            >
              <div className="gs-fee-label">{fee.label}</div>
              <div className="gs-fee-price">
                {fee.price}
                {fee.unit && <span className="gs-fee-unit">{fee.unit}</span>}
              </div>
              <p className="gs-fee-card-body">{fee.body}</p>
            </div>
          ))}
        </div>
        <p className="gs-fees-footnote">
          WorkCover, NDIS and DVA are invoiced directly to the relevant scheme,
          with no out-of-pocket cost to you.
        </p>
      </section>

      {/* OUR CLINICIANS */}
      <section className="gs-clinicians">
        <div className="gs-clinicians-eyebrow">Our Clinicians</div>
        <h2 className="gs-clinicians-title">Who you will see.</h2>
        <div className="gs-clinicians-grid">
          {CLINICIANS.map((clinician) => (
            <div className="gs-clinician-card" key={clinician.name}>
              <div className="gs-clinician-photo">
                Add
                <br />
                Photo
              </div>
              <div>
                <h3 className="gs-clinician-name">{clinician.name}</h3>
                <div className="gs-clinician-role">{clinician.role}</div>
                <p className="gs-clinician-bio">{clinician.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PATIENT FEEDBACK */}
      <section className="gs-feedback">
        <div className="gs-feedback-eyebrow">Patient Feedback</div>
        <h2 className="gs-feedback-title">What our patients say.</h2>
        <div className="gs-feedback-slots">
          {REVIEW_SLOTS.map((text, index) => (
            <div className="gs-feedback-slot" key={index}>
              <div className="gs-feedback-slot-label">{`Review Slot ${index + 1}`}</div>
              <p className="gs-feedback-slot-text">{text}</p>
            </div>
          ))}
        </div>
        <div className="gs-feedback-preview">
          <div className="gs-feedback-preview-stars">★★★★★</div>
          <p className="gs-feedback-preview-quote">
            This is the layout each review will use once the real quotes are in.
          </p>
          <div className="gs-feedback-preview-attr">
            First name L. · Condition
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="gs-faq">
        <div className="gs-faq-eyebrow">Common Questions</div>
        <h2 className="gs-faq-title">Before your first appointment.</h2>
        <div className="gs-faq-list">
          {FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                className={`gs-faq-item ${isOpen ? "open" : ""}`}
                key={faq.q}
              >
                <button
                  type="button"
                  className="gs-faq-question"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                >
                  <span className="gs-faq-q-text">{faq.q}</span>
                  <span className="gs-faq-toggle" aria-hidden="true">
                    +
                  </span>
                </button>
                <div className="gs-faq-answer">
                  <p className="gs-faq-answer-body">{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* BUILD NOTES — REMOVE BEFORE LAUNCH */}
      <section className="gs-notes">
        <div className="gs-notes-eyebrow">
          Build Notes — Remove Before Launch
        </div>

        <h3 className="gs-notes-h3">1. Four Variants, One Template</h3>
        <p className="gs-notes-body">
          Each Google ad group needs its own URL so the headline echoes what the
          person searched. Everything below the hero stays identical — only the
          H1, sub-headline and eyebrow change.
        </p>
        <div className="gs-notes-table-wrap">
          <table className="gs-notes-table">
            <thead>
              <tr>
                <th>Ad Group</th>
                <th>URL</th>
                <th>H1</th>
                <th>Sub-Headline</th>
              </tr>
            </thead>
            <tbody>
              {VARIANTS.map((variant) => (
                <tr key={variant.url}>
                  <td>{variant.adGroup}</td>
                  <td>
                    <code className="gs-code">{variant.url}</code>
                  </td>
                  <td>{variant.h1}</td>
                  <td>{variant.sub}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="gs-notes-body">
          <strong>Important:</strong> the first three must not mention GP
          referrals anywhere — that&apos;s a deliberate strategy call. Referral
          and Medicare language stays on{" "}
          <code className="gs-code">/medicare-exercise-physiology</code> only.
        </p>

        <h3 className="gs-notes-h3">2. Wiring The Form</h3>
        <ol className="gs-notes-list">
          {FORM_WIRING_STEPS.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>

        <h3 className="gs-notes-h3">3. Still Needed From Valen</h3>
        <div className="gs-notes-cards">
          {STILL_NEEDED.map((item) => (
            <div className="gs-notes-card" key={item.title}>
              <h4 className="gs-notes-card-title">{item.title}</h4>
              <p className="gs-notes-card-body">{item.body}</p>
            </div>
          ))}
        </div>

        <h3 className="gs-notes-h3">4. Why The Page Is Built This Way</h3>
        <p className="gs-notes-body">
          Checked against Life Ready, Better Rehab, Physio Inq, O2 Active,
          Revolv Health, Dynamic HEP and Allsports. Every decision below is a
          gap one of them left open.
        </p>
        <div className="gs-notes-table-wrap">
          <table className="gs-notes-table">
            <thead>
              <tr>
                <th>Decision</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {BUILD_DECISIONS.map((row) => (
                <tr key={row.decision}>
                  <td>{row.decision}</td>
                  <td>{row.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="gs-final-cta">
        <h2 className="gs-final-cta-title">Book Your Assessment.</h2>
        <p className="gs-final-cta-sub">
          Sixty minutes to establish exactly where you stand, and the plan to
          move you forward.
        </p>
        <div className="gs-final-cta-actions">
          <a
            href="#assessment-form"
            className="gs-btn gs-btn-primary"
            onClick={() => trackFormLeadConversion()}
          >
            Book Your Assessment
          </a>
          <a
            href="tel:0489293000"
            className="gs-btn gs-btn-outline"
            onClick={() => trackCallConversion()}
          >
            Call 0489 293 000
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="gs-footer">
        <div className="gs-footer-inner">
          <div className="gs-footer-top">
            <div className="gs-footer-brand">
              <div className="gs-footer-logo-row">
                <img
                  src="/images/logo/1.png"
                  alt="Valen Health"
                  className="gs-footer-logo-mark"
                />
                <span className="gs-footer-logo-text">VALEN HEALTH</span>
              </div>
              <div className="gs-footer-address">
                4/235 Rockingham Road, Spearwood WA 6163
                <br />
                EP appointments Mon–Fri 9am–6pm · Gym open 24/7
                <br />
                <a href="tel:0489293000" onClick={() => trackCallConversion()}>
                  0489 293 000
                </a>
              </div>
            </div>
            <nav className="gs-footer-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms</a>
              <a href="/contact">Contact</a>
            </nav>
          </div>
        </div>
        <div className="gs-footer-accent" />
      </footer>
    </main>
  );
}
