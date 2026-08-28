"use client";

import { useState , useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackConversion } from "../lib/gtag";


export default function HomeHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
   const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null); // which nav item's dropdown is open
  
 const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
     { href: "/menberships", label: "Member ships" },

    {
      href: "/gym",
      label: "Gym",
      subLinks: [
        { href: "/gym#memberships", label: "Memberships" },
        { href: "/gym#classes", label: "Weekly Classes" },
        { href: "/gym#amenities", label: "Amenities" },
        { href: "/gym#vald", label: "VALD Technology" },
      ],
    },
    { href: "/blog", label: "Blog" },
    {
      href: "/exercise-physiology",
      label: "Exercise Physiology",
      subLinks: [
        { href: "/gym#memberships", label: "Memberships" },
        { href: "/exercise-physiology#what-is-ep", label: "What is an EP?" },
        { href: "/exercise-physiology#funding", label: "Funding Options" },
        { href: "/exercise-physiology#treats", label: "What We Treat" },
      ],
    },
    { href: "/contact", label: "Contact Us" },
  ];
  const handleDropdownEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  };
  const handleDropdownLeave = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  return (
    
    <header className="home-header">
      <Link href="/" className="home-logo" aria-label="Valen Health home" onClick={closeMenu} >
        <img src="/images/logo/3.png" alt="Valen Health" style={{ height: '64px', width: 'auto', display: 'block' }} />
      </Link>

       <nav   className={`sub-nav ${isMenuOpen ? "mobile-open" : ""}`}>
        {navLinks.map((link) =>
          link.subLinks ? (
           <div
          key={link.href}
          className="nav-dropdown-wrap"
          onMouseEnter={() => handleDropdownEnter(link.label)}
          onMouseLeave={handleDropdownLeave}
          style={{ position: "relative", display: "inline-flex", alignItems: "center" }}
        >
          <Link
            href={link.href}
            className={`nav-dropdown-link ${pathname === link.href ? "active" : ""}`}
            onClick={closeMenu}
            style={{ display: "inline-flex", alignItems: "center", gap: "4px", color: "#fff" }}
          >
            {link.label}
          <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (closeTimer.current) clearTimeout(closeTimer.current); // 👈 add this line
            setOpenDropdown((prev) => (prev === link.label ? null : link.label));
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
          </Link>

          {openDropdown === link.label && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                minWidth: "210px",
                background: "#ffffff",
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                borderRadius: "8px",
                padding: "8px 0",
                zIndex: 1000,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {link.subLinks.map((sub) => (
                <Link
                  key={sub.href}
                  href={sub.href}
                  onClick={closeMenu}
                  style={{
                    padding: "10px 18px",
                    whiteSpace: "nowrap",
                    color: "#1a1a1a",
                    display: "block",
                  }}
                >
                  {sub.label}
                </Link>
              ))}
            </div>
          )}
        </div>
          ) : (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "active" : ""}
              onClick={closeMenu}
               style={{ color: "#fff" }}
            >
              {link.label}
            </Link>
          )
        )}

        
        <a href="tel:0489293000" className="mobile-cta" onClick={() => { trackConversion(); closeMenu(); }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', verticalAlign: '-2px', display: 'inline-block' }}>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          Call Us
        </a>
     
        <Link href="/gym#memberships" className="mobile-cta" onClick={closeMenu}>Join Now</Link>
        <Link href="/referral" className="mobile-cta" onClick={closeMenu}>Referral</Link>
      </nav>

      <div className="header-actions">
        <a href="tel:0489293000" className="home-header-cta" onClick={() => trackConversion()} aria-label="Call Valen Health on 0489 293 000">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', verticalAlign: '-1px', display: 'inline-block' }}>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          Call Us
        </a>

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

      <style jsx>{`
  @media (max-width: 768px) {
    .nav-dropdown-wrap {
      display: flex !important;
      width: 100% !important;
    }
    .nav-dropdown-link {
      width: 100% !important;
      justify-content: flex-start !important;
    }
  }
`}</style>
    </header>
  );
}
