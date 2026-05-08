"use client";

import { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./contact.css";

export default function ContactPage() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent (demo). Wire this form up to your backend or service like Formspree.");
  };

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
            <a href="tel:0894186388" className="contact-detail-card reveal">
              <div className="contact-detail-card-label">Home</div>
              <div className="contact-detail-card-value">(08) 9418 6388</div>
              <div className="contact-detail-card-sub">Mon–Fri, business hours</div>
            </a>
            <a href="tel:0489293000" className="contact-detail-card reveal">
              <div className="contact-detail-card-label">Mobile</div>
              <div className="contact-detail-card-value">0489 293 000</div>
              <div className="contact-detail-card-sub">Available any time</div>
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
            <a href="#" className="contact-visit-banner-cta">Book a Tour</a>
          </div>
        </section>

        {/* FORM */}
        <section className="contact-form">
          <div className="contact-form-inner">
            <div className="contact-form-header reveal">
              <h2 className="section-heading">Send us a <span className="italic-orange">message.</span></h2>
              <p className="lead">Drop your details below and we&apos;ll get back to you — usually within a business day.</p>
            </div>
            <form className="contact-form-grid reveal" onSubmit={handleSubmit}>
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
                <button type="submit" className="contact-form-submit">Send Message</button>
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
