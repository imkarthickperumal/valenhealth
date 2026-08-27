"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackConversion } from "../lib/gtag";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/gym", label: "Gym" },
    { href: "/blog", label: "Blog" },
    { href: "/exercise-physiology", label: "Exercise Physiology" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <header className="sub-header">
      <Link href="/" className="sub-logo" onClick={closeMenu}>
        <img src="/images/logo/3.png" alt="Valen Health" style={{ height: '56px', width: 'auto', display: 'block' }} />
      </Link>

      <nav className={`sub-nav ${isMenuOpen ? "mobile-open" : ""}`}>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={pathname === link.href ? "active" : ""}
            onClick={closeMenu}
          >
            {link.label}
          </Link>
        ))}
        <a href="tel:0489293000" className="mobile-cta" onClick={() => { trackConversion(); closeMenu(); }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', verticalAlign: '-2px', display: 'inline-block' }}>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          Call Us
        </a>
        <Link href="/contact#contact-form" className="mobile-cta" onClick={() => { trackConversion(); closeMenu(); }}>
          Book a Tour
        </Link>
        <Link href="/gym#memberships" className="mobile-cta" onClick={closeMenu}>
          Join Now
        </Link>
        <Link href="/referral" className="mobile-cta" onClick={closeMenu}>
          Referral
        </Link>
      </nav>

      <div className="header-actions">
        <a href="tel:0489293000" className="sub-header-phone" onClick={() => trackConversion()} aria-label="Call Valen Health on 0489 293 000">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', verticalAlign: '-1px', display: 'inline-block' }}>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          0489 293 000
        </a>
        <Link href="/contact#contact-form" className="sub-header-cta" onClick={() => { trackConversion(); closeMenu(); }}>
          Book a Tour
        </Link>
        <Link href="/gym#memberships" className="sub-header-cta" onClick={closeMenu}>
          Join Now
        </Link>
        <Link href="/referral" className="sub-header-cta" onClick={closeMenu}>
          Referral
        </Link>
      </div>

      <button
        className={`sub-hamburger ${isMenuOpen ? "open" : ""}`}
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
