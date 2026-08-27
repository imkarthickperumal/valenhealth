"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { sendContactEmail, type ContactFormState } from "./actions";
import * as fpixel from "../../lib/fpixel";
import { trackConversion } from "../../lib/gtag";

const initialState: ContactFormState = { status: "idle", message: "" };

export default function ContactClient() {
  const [state, formAction, isPending] = useActionState(sendContactEmail, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const [subjectParam, setSubjectParam] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sub = params.get("subject");
    if (sub) {
      setSubjectParam(sub);
    }
  }, []);

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
    return () => observer.disconnect();
  }, []);

  // Track Lead event on success and reset the form
  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      fpixel.event("Lead", {
        content_name: "Contact Form",
        status: "success",
      });
      // Google Ads conversion tracking
      trackConversion();
    }
  }, [state.status]);

  return (
    <>
      <Header />
      <main className="contact-page">
        {/* HERO */}
        <section className="contact-hero">
          <div className="contact-hero-inner">
            <div className="contact-hero-eyebrow">Get in touch</div>
            <h1 className="contact-hero-title">Contact <span className="accent">us.</span></h1>
            <p className="contact-hero-sub">We can&apos;t wait to start this journey with you. Whether you&apos;re ready to begin or just have a few questions — drop us a line, give us a call, or come down and say hi.</p>
            <p className="contact-hero-tagline">Let&apos;s build a healthy future <span className="accent">together.</span></p>
          </div>
        </section>

        {/* DETAILS */}
        <section className="contact-details">
          <div className="contact-details-inner">
            <a href="tel:0489293000" className="contact-detail-card reveal" onClick={() => trackConversion()}>
              <div className="contact-detail-card-label">Mobile</div>
              <div className="contact-detail-card-value">0489 293 000</div>
              <div className="contact-detail-card-sub">Mon–Fri, business hours</div>
            </a>
            <a href="tel:0894393363" className="contact-detail-card reveal" onClick={() => trackConversion()}>
              <div className="contact-detail-card-label">Landline</div>
              <div className="contact-detail-card-value">(08) 9439 3363</div>
              <div className="contact-detail-card-sub">Mon–Fri, business hours</div>
            </a>
            <a href="mailto:admin@valenhealth.com.au" className="contact-detail-card reveal">
              <div className="contact-detail-card-label">Email</div>
              <div className="contact-detail-card-value">admin@valenhealth.com.au</div>
              <div className="contact-detail-card-sub">We reply within one business day</div>
            </a>
            <a href="https://maps.google.com/?q=Unit+4+235+Rockingham+Road+Spearwood+WA+6163" target="_blank" rel="noopener noreferrer" className="contact-detail-card reveal">
              <div className="contact-detail-card-label">Address</div>
              <div className="contact-detail-card-value">Unit 4, 235 Rockingham Road</div>
              <div className="contact-detail-card-sub">Spearwood WA 6163</div>
            </a>
          </div>

          <div className="contact-visit-banner reveal">
            <div className="contact-visit-banner-text">
              <div className="contact-visit-banner-eyebrow">Drop in</div>
              <div className="contact-visit-banner-title">Pop down for a tour and a chat — or get booked in.</div>
            </div>
            <a href="#contact-form" className="contact-visit-banner-cta" onClick={() => trackConversion()}>Book a Tour</a>
          </div>
        </section>

        {/* FORM */}
        <section id="contact-form" className="contact-form">
          <div className="contact-form-inner">
            <div className="contact-form-header reveal">
              <h2 className="section-heading">Send us a <span className="italic-orange">message.</span></h2>
              <p className="lead">Drop your details below and we&apos;ll get back to you — usually within a business day.</p>
            </div>

            {/* Success / Error Alerts */}
            {state.status === "success" && (
              <div className="contact-alert contact-alert--success">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '8px', flexShrink: 0 }}>
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>{state.message}</span>
              </div>
            )}
            
            {state.status === "error" && (
              <div className="contact-alert contact-alert--error">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '8px', flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{state.message}</span>
              </div>
            )}

            <form ref={formRef} action={formAction} className="contact-form-grid reveal">
              <input type="hidden" name="subject" value={subjectParam} />
              <div className="contact-form-row">
                <div className="contact-form-field">
                  <label htmlFor="name">Your name</label>
                  <input type="text" id="name" name="name" placeholder="First and last name" required />
                </div>
                <div className="contact-form-field">
                  <label htmlFor="phone">Phone number</label>
                  <input type="tel" id="phone" name="phone" placeholder="04XX XXX XXX" />
                </div>
              </div>
              <div className="contact-form-field">
                <label htmlFor="email">Email address</label>
                <input type="email" id="email" name="email" placeholder="you@example.com" required />
              </div>
              <div className="contact-form-field">
                <label htmlFor="message">Your message</label>
                <textarea id="message" name="message" placeholder="Tell us a bit about what you're looking for..." required></textarea>
              </div>
              <div className="contact-form-submit-row">
                <button type="submit" className="contact-form-submit" disabled={isPending}>
                  {isPending ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* MAP */}
        <section className="contact-map">
          <div className="contact-map-inner">
            <div className="contact-map-header reveal">
              <h2 className="section-heading">Find <span className="italic-orange">us.</span></h2>
              <p className="lead">Unit 4, 235 Rockingham Road, Spearwood — easy and free parking right out front.</p>
            </div>
          </div>
          <iframe
            className="contact-map-embed reveal"
            src="https://www.google.com/maps?q=Unit+4+235+Rockingham+Road+Spearwood+WA+6163&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Valen Health location map"
          ></iframe>
        </section>
      </main>
      <Footer />
    </>
  );
}
