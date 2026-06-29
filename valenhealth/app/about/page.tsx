"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ReadyToStart from "../../components/ReadyToStart/ReadyToStart";
import "./about.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Valen Health - EP Clinic & Gym in Spearwood, Perth",
  description: "A clinic and a gym, under one roof. Meet the team behind Spearwood's only combined exercise physiology clinic and 24/7 gym.",
  openGraph: {
    title: "About Valen Health - EP Clinic & Gym in Spearwood",
    description: "Meet the team behind Spearwood's only combined exercise physiology clinic and 24/7 gym.",
    url: "https://valenhealth.com.au/about",
  },
};

export default function AboutPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const services = [
    "Clinical movement screening & health assessment",
    "Personalised exercise prescription",
    "One-on-one coaching and supervision",
    "Long-term strength and conditioning pathways",
    "Group training and clinical classes",
    "Lifestyle support for sustainable, lasting results",
    "24/7 fully equipped gym access"
  ];

  const faqs = [
    {
      q: "What makes Valen Health different from other fitness centers?",
      a: (
        <>
          <p>Valen Health is the only place in Spearwood where <strong>clinical Exercise Physiology, advanced VALD body testing, and 24/7 gym access</strong> exist under one roof. Most fitness centres give you access to equipment and hope you figure the rest out. Most clinics treat you briefly, then discharge you with no plan.</p>
          <p>We do both — and we measure everything. Every program is built by an accredited Exercise Physiologist, grounded in objective testing, and supported long after most clinics would have already said goodbye.</p>
        </>
      )
    },
    {
      q: "Do I need to be in shape to join Valen Health?",
      a: (
        <>
          <p><strong>Not at all — and that's actually the point.</strong> Valen Health was built specifically for people who aren't sure where to start, who've been told to "exercise more" without ever being shown how, or who are returning to movement after injury, surgery, or a chronic condition diagnosis.</p>
          <p>Whether you're 25 or 75, recovering from something or starting from zero, your journey begins with a clinical assessment — not a workout. From there, your Exercise Physiologist builds a program that meets you exactly where you are.</p>
        </>
      )
    },
    {
      q: "How do I get started?",
      a: (
        <>
          <p>Getting started is simple. Book an initial consultation with one of our accredited Exercise Physiologists — this is where we sit down with you, understand your goals, your history, and any limitations, and run a clinical movement screening with our VALD technology.</p>
          <p>From that single session, you'll walk away with a clear picture of where your body is right now and a personalised plan for where it's going next.</p>
        </>
      )
    }
  ];

  return (
    <>
      <Header />
      
      <main className="about-page">
        {/* HERO */}
        <section className="about-hero">
          <div className="about-hero-inner">
            <div className="about-hero-eyebrow">About Valen Health</div>
            <h1 className="about-hero-title about-hero-title--soft">
              A clinic and a gym,<br />
              <span className="accent">under one roof.</span>
            </h1>
          </div>
        </section>

        {/* 1. ABOUT US */}
        <section className="about-us" id="about-us">
          <div className="about-us-inner">
            <div className="reveal">
              <h2 className="section-heading">About <span className="italic-orange">us.</span></h2>
            </div>
            <div className="reveal">
              <div className="about-us-body">
                <p>Valen Health is Spearwood&apos;s <strong>first and only</strong> science-backed gym and Exercise Physiology clinic — purpose-built to bridge the gap between traditional healthcare and everyday fitness.</p>
                <p>We combine the clinical expertise of accredited Exercise Physiologists with a modern, fully equipped 24/7 gym to create a complete health ecosystem designed around long-term vitality.</p>
                <p>It&apos;s not a gym with a clinic attached. It&apos;s not a clinic with some equipment in the corner. It&apos;s one continuous environment — built so your assessment, your program, and your training all live under the same roof, supported by the same team.</p>
                <div className="about-stats">
                  <div>
                    <div className="stat-num">24/7</div>
                    <div className="stat-label">Gym access<br />for members</div>
                  </div>
                  <div>
                    <div className="stat-num">1st</div>
                    <div className="stat-label">Of its kind<br />in Spearwood</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. OUR MISSION */}
        <section className="about-mission" id="our-mission">
          <div className="about-mission-inner reveal">
            <h2 className="about-mission-title">Our <span className="italic-orange">mission.</span></h2>
            <p className="about-mission-statement">
              To transform the way people <span className="italic-orange">move, live,</span> and age.
            </p>
            <p className="about-mission-sub">
              Through evidence-based practice, personalised care, and a genuine understanding of the individual — not generic programs or short-term fixes.
            </p>
          </div>
        </section>

        {/* 3. HOW WE DO IT */}
        <section className="about-how" id="how-we-do-it">
          <div className="about-how-inner">
            <div className="about-how-header reveal">
              <h2 className="section-heading">How we <span className="italic-orange">do it.</span></h2>
              <p className="about-how-intro" style={{ marginTop: '24px' }}>
                At Valen Health, we don&apos;t guess — we assess. Every client journey begins with a comprehensive clinical movement screening using <strong>VALD technology</strong> — the same standard of testing used by elite sporting organisations and hospital rehabilitation programs worldwide. From there, your accredited Exercise Physiologist builds a personalised, science-led program around your body, your limitations, and your goals.
              </p>
            </div>

            <div className="about-equation reveal">
              <div className="eq-term">
                <div className="eq-term-word">Assessment</div>
              </div>
              <div className="eq-op">+</div>
              <div className="eq-term">
                <div className="eq-term-word">Evidence</div>
              </div>
              <div className="eq-op">+</div>
              <div className="eq-term">
                <div className="eq-term-word">Support</div>
              </div>
              <div className="eq-op">=</div>
              <div className="eq-result">Lifelong<br />Results</div>
            </div>

            <div className="about-how-services">
              <aside className="about-how-services-aside reveal">
                <h3 className="about-how-services-title">All under<br />one roof.</h3>
                <p className="about-how-services-sub">From your first clinical assessment to your hundredth training session — every step of your health journey lives in a single space, backed by a single team.</p>
              </aside>

              <ol className="about-services-list">
                {services.map((service, index) => (
                  <li 
                    key={index} 
                    className="about-service-item reveal" 
                    style={{ transitionDelay: `${index * 0.05}s` }}
                  >
                    <div className="about-service-text">{service}</div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* 4. WHY WE DO IT */}
        <section className="about-why" id="why-we-do-it">
          <div className="about-why-inner">
            <div className="reveal">
              <h2 className="about-why-headline">
                Why we <span className="italic-orange">do it.</span>
              </h2>
            </div>

            <p className="about-why-intro reveal">
              Most clinics treat you for a short time, then discharge you with no plan. Most gyms give you access but no guidance, measurement, or proof of success. Valen Health was built to fix this — because we believe the people of Spearwood deserve a place where clinical expertise and everyday fitness aren&apos;t two separate worlds.
            </p>

            <div className="about-why-compare">
              <div className="about-why-col reveal">
                <div className="about-why-col-label">The Clinic Problem</div>
                <h3 className="about-why-col-title">Treated, then released.</h3>
                <p className="about-why-col-body">Most clinics treat you for a short time, then discharge you with no plan, no continued support, and no clear path forward. The acute issue resolves — but long-term capacity is left to chance.</p>
              </div>
              <div className="about-why-col reveal">
                <div className="about-why-col-label">The Gym Problem</div>
                <h3 className="about-why-col-title">Access, not guidance.</h3>
                <p className="about-why-col-body">Most gyms give you equipment but no expert eye, no measurement, and no proof of success. You&apos;re left to figure it out alone — or hope a generic program works for your unique body.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. FAQ */}
        <section className="about-faq" id="faq">
          <div className="about-faq-inner">
            <div className="about-faq-header reveal">
              <h2 className="section-heading">Frequently asked<br /><span className="italic-orange">questions.</span></h2>
            </div>

            <div className="about-faq-list">
              {faqs.map((faq, index) => {
                const numStr = ["i", "ii", "iii", "iv", "v"][index];
                const isOpen = openFaqIndex === index;
                return (
                  <div key={index} className="reveal">
                    <div className={`about-faq-item ${isOpen ? 'open' : ''}`}>
                      <button 
                        className="about-faq-question" 
                        aria-expanded={isOpen}
                        onClick={() => toggleFaq(index)}
                      >
                        <span className="faq-num">{numStr}.</span>
                        <span className="faq-q-text">{faq.q}</span>
                        <span className="faq-toggle" aria-hidden="true"></span>
                      </button>
                      <div className="about-faq-answer">
                        <div className="about-faq-answer-body">
                          {faq.a}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
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
