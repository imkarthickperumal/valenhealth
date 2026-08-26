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
        <a href="tel:0489293000" className="mobile-cta" onClick={() => { trackConversion(); closeMenu(); }}>Call 0489 293 000</a>
        <Link href="/contact#contact-form" className="mobile-cta" onClick={() => { trackConversion(); closeMenu(); }}>Book a Tour</Link>
        <Link href="/gym#memberships" className="mobile-cta" onClick={closeMenu}>Join Now</Link>
        <Link href="/referral" className="mobile-cta" onClick={closeMenu}>Referral</Link>
      </nav>

      <div className="header-actions">
        <a href="tel:0489293000" className="home-header-phone" onClick={() => trackConversion()} aria-label="Call Valen Health on 0489 293 000">0489 293 000</a>
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
