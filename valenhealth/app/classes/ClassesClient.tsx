"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ClassSchedule from "../../components/ClassSchedule/ClassSchedule";
import ReadyToStart from "../../components/ReadyToStart/ReadyToStart";

export default function ClassesClient() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "50px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    const checkVisibility = () => {
      document.querySelectorAll(".reveal:not(.visible)").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add("visible");
        }
      });
    };
    setTimeout(checkVisibility, 100);
    setTimeout(checkVisibility, 500);
  }, []);

  return (
    <div className="classes-page">
      <Header />

      {/* HERO SECTION */}
      <section className="classes-hero">
        <div className="classes-hero-inner reveal">
          <span className="classes-badge">Spearwood Group Fitness & EP Classes</span>
          <h1>
            Weekly <span className="orange">Classes</span> Timetable
          </h1>
          <p>
            Whether you are looking for high-energy group fitness or structured,
            Exercise Physiology-led clinical movement, our weekly classes in
            Spearwood are designed to elevate your health and routine.
          </p>
          <div className="classes-hero-actions">
            <a href="tel:0489293000" className="btn-primary-orange">
              Ask Staff To Get Booked In
            </a>
            <Link href="/contact" className="btn-secondary-outline">
              Contact Clinic
            </Link>
          </div>
        </div>
      </section>

      {/* WEEKLY TIMETABLE COMPONENT */}
      <div id="timetable">
        <ClassSchedule />
      </div>

      {/* CLASS DESCRIPTIONS */}
      <section className="class-details-section">
        <div className="class-details-header reveal">
          <h2>Our Class Programs</h2>
          <p style={{ color: "#666", fontSize: "16px", maxWidth: "600px", margin: "0 auto" }}>
            Tailored group sessions guided by qualified Exercise Physiologists and fitness professionals.
          </p>
        </div>

        <div className="class-cards-grid">
          {/* CIRCUIT CLASS */}
          <div className="class-info-card reveal">
            <div>
              <span className="class-card-tag circuit">Fun, Interactive, Fast Paced</span>
              <h3>Circuit Classes</h3>
              <p>
                A high-energy group workout combining functional exercises, cardiovascular intervals,
                and strength training. Perfect for building stamina, burning calories, and training in a supportive group environment.
              </p>
              <ul className="class-features-list">
                <li><span className="dot">✓</span> Dynamic station-based workouts</li>
                <li><span className="dot">✓</span> Suitable for all fitness levels with scalable exercises</li>
                <li><span className="dot">✓</span> High-energy group atmosphere</li>
                <li><span className="dot">✓</span> Mondays & Tuesdays at 5:30PM | Thursdays at 9:00AM</li>
              </ul>
            </div>
            <a href="tel:0489293000" className="btn-primary-orange" style={{ textAlign: "center", justifyContent: "center" }}>
              Book Circuit Class
            </a>
          </div>

          {/* FIT AND FAB (CLINICAL CLASS) */}
          <div className="class-info-card reveal">
            <div>
              <span className="class-card-tag clinical">Structure and Routine</span>
              <h3>Fit and Fab (Clinical Classes)</h3>
              <p>
                Supervised by Accredited Exercise Physiologists, Fit and Fab focuses on structured movement routines,
                posture, joint stability, mobility, and progressive strength safely tailored to your medical history.
              </p>
              <ul className="class-features-list">
                <li><span className="dot">✓</span> Clinically supervised for safety and targeted progress</li>
                <li><span className="dot">✓</span> Ideal for chronic condition management and injury rehab</li>
                <li><span className="dot">✓</span> Structured, routine-focused exercise prescription</li>
                <li><span className="dot">✓</span> Mon, Wed, Thu, Fri at 9:00AM | Tuesdays at 10:00AM</li>
              </ul>
            </div>
            <a href="tel:0489293000" className="btn-primary-orange" style={{ textAlign: "center", justifyContent: "center" }}>
              Book Clinical Class
            </a>
          </div>
        </div>
      </section>

      <ReadyToStart />
      <Footer />
    </div>
  );
}
