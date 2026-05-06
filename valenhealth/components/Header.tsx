"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

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
        <Link href="/" className={pathname === '/' ? 'active' : ''} onClick={closeMenu}>HOME</Link>
        <Link href="/#gym" onClick={closeMenu}>GYM</Link>
        <Link href="/exercise-physiology" className={pathname === '/exercise-physiology' ? 'active' : ''} onClick={closeMenu}>EXERCISE PHYSIOLOGY</Link>
        <Link href="/#memberships" onClick={closeMenu}>MEMBERSHIPS</Link>
        <Link href="/about" className={pathname === '/about' ? 'active' : ''} onClick={closeMenu}>ABOUT</Link>
        <Link href="/#contact" onClick={closeMenu}>CONTACT</Link>
        <Link className="mobile-only-link" href="#" onClick={closeMenu}>REFER →</Link>
      </nav>
      
      <div className="header-cta">
        <Link className="btn btn-ghost-w" href="#">REFER →</Link>
        <Link className="btn btn-outline-white" href="/#book">BOOK NOW</Link>
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
