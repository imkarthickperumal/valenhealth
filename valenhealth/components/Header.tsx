"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="relative">
      <Link href="/" style={{ textDecoration: "none" }} onClick={closeMenu}>
        <svg className="logo-svg" viewBox="0 0 260 60" xmlns="http://www.w3.org/2000/svg">
          <polygon className="v-body" points="4,4 26,4 42,52 28,52"/>
          <polygon className="v-body" points="44,4 58,4 42,52 34,52"/>
          <polygon className="v-body" points="50,0 62,0 46,32 38,32"/>
          <polygon className="v-body" points="62,2 68,2 58,22 53,22"/>
          <text className="wordmark" x="86" y="39" fontSize="26" fill="#FFFFFF">VALEN HEALTH</text>
        </svg>
      </Link>
      
      {/* Desktop & Mobile Nav */}
      <nav 
        className={`nav-menu ${isMenuOpen ? 'mobile-open' : ''}`}
      >
        <a href="/" onClick={closeMenu}>HOME</a>
        <a href="/#gym" onClick={closeMenu}>GYM</a>
        <Link href="/exercise-physiology" onClick={closeMenu}>EXERCISE PHYSIOLOGY</Link>
        <a href="/#memberships" onClick={closeMenu}>MEMBERSHIPS</a>
        <Link href="/about" onClick={closeMenu}>ABOUT</Link>
        <a href="/#contact" onClick={closeMenu}>CONTACT</a>
        <a className="mobile-only-link" href="#" onClick={closeMenu}>REFER →</a>
      </nav>
      
      <div className="header-cta">
        <Link className="btn btn-ghost-w" href="#">REFER →</Link>
        <a className="btn btn-outline-white" href="/#book">BOOK NOW</a>
        <Link className="btn btn-orange" href="/join">JOIN NOW</Link>
      </div>

      {/* Hamburger Icon for Mobile */}
      <button 
        className={`mobile-menu-btn ${isMenuOpen ? 'open' : ''}`}
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
