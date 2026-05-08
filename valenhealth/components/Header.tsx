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
    { href: "/exercise-physiology", label: "Exercise Physiology" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <header className="sub-header">
      <Link href="/" className="sub-logo" onClick={closeMenu}>
        VALEN HEALTH
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
      </nav>

      <Link href="/contact" className="sub-header-cta" onClick={closeMenu}>
        Book a Tour
      </Link>

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
