"use client";

import { useState } from "react";
import Link from "next/link";
import { trackConversion } from "../lib/gtag";

export default function HomeHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="home-header">
      <Link href="/" className="home-logo" aria-label="Valen Health home" onClick={closeMenu}>
        <img src="/images/logo/3.png" alt="Valen Health" style={{ height: '64px', width: 'auto', display: 'block' }} />
      </Link>

      <nav className={`home-nav ${isMenuOpen ? "mobile-open" : ""}`}>
        <Link href="/" onClick={closeMenu}>Home</Link>
        <Link href="/about" onClick={closeMenu}>About Us</Link>
        <Link href="/gym#memberships" onClick={closeMenu}>Memberships</Link>
        <Link href="/exercise-physiology" onClick={closeMenu}>Exercise Physiology</Link>
        <Link href="/gym" onClick={closeMenu}>Gym</Link>
        <Link href="/blog" onClick={closeMenu}>Blog</Link>
        <Link href="/contact" onClick={closeMenu}>Contact Us</Link>
        <a href="tel:0489293000" className="mobile-cta" onClick={() => { trackConversion(); closeMenu(); }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', verticalAlign: '-2px', display: 'inline-block' }}>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          Call Us
        </a>
        <Link href="/contact#contact-form" className="mobile-cta" onClick={() => { trackConversion(); closeMenu(); }}>Book a Tour</Link>
        <Link href="/gym#memberships" className="mobile-cta" onClick={closeMenu}>Join Now</Link>
        <Link href="/referral" className="mobile-cta" onClick={closeMenu}>Referral</Link>
      </nav>

      <div className="header-actions">
        <a href="tel:0489293000" className="home-header-phone" onClick={() => trackConversion()} aria-label="Call Valen Health on 0489 293 000">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', verticalAlign: '-1px', display: 'inline-block' }}>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          0489 293 000
        </a>
        <Link href="/contact#contact-form" className="home-header-cta" onClick={() => { trackConversion(); closeMenu(); }}>Book a Tour</Link>
        <Link href="/gym#memberships" className="home-header-cta" onClick={closeMenu}>Join Now</Link>
        <Link href="/referral" className="home-header-cta" onClick={closeMenu}>Referral</Link>
      </div>

      <button
        className={`home-hamburger ${isMenuOpen ? "open" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  );
}
