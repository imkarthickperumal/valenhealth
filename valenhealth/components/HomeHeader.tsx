"use client";

import { useState } from "react";
import Link from "next/link";

export default function HomeHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="home-header">
      <Link href="/" className="home-logo" aria-label="Valen Health home" onClick={closeMenu}>
        <svg width="46" height="52" viewBox="0 0 22 26" aria-hidden="true">
          <path d="M2 2 L11 22 L20 2 L15 2 L11 12 L7 2 Z M14 2 L20 12 L17 2 Z" fill="#000" />
        </svg>
      </Link>

      <nav className={`home-nav ${isMenuOpen ? "mobile-open" : ""}`}>
        <Link href="/" onClick={closeMenu}>Home</Link>
        <Link href="/about" onClick={closeMenu}>About Us</Link>
        <Link href="/gym#memberships" onClick={closeMenu}>Memberships</Link>
        <Link href="/exercise-physiology" onClick={closeMenu}>Exercise Physiology</Link>
        <Link href="/gym" onClick={closeMenu}>Gym</Link>
        <Link href="/contact" onClick={closeMenu}>Contact Us</Link>
      </nav>

      <Link href="/contact" className="home-header-cta" onClick={closeMenu}>Book Now</Link>

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
