"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/gym", label: "Gym" },
    // { href: "/blog", label: "Blog" },
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
        <Link href="/contact#contact-form" className="mobile-cta" onClick={closeMenu}>
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
        <Link href="/contact#contact-form" className="sub-header-cta" onClick={closeMenu}>
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
