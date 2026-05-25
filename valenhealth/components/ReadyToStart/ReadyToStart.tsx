"use client";

import React, { useState } from "react";
import Link from "next/link";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import "./ReadyToStart.css";

export default function ReadyToStart() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
    if (typeof window !== 'undefined') {
      document.body.style.overflow = "hidden";
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (typeof window !== 'undefined') {
      document.body.style.overflow = "auto";
    }
  };

  return (
    <>
      <section className="rts-section">
        <div className="rts-inner">
          <h2 className="rts-title">
            Ready to <span className="rts-italic">start?</span>
          </h2>
          <p className="rts-body">
            Pick whichever first step feels right — we&apos;ll take it from there.
          </p>
          <div className="rts-actions">
            <Link href="/contact#contact-form" className="btn-primary">Book a Tour</Link>
            <a href="https://valenhealth.bookings.pracsuite.com/guest" target="_blank" rel="noopener noreferrer" className="btn-secondary">Book an Assessment</a>
            <Link href="/gym#memberships" className="btn-secondary">Find Out About Memberships</Link>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div 
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="modal-close-btn"
              onClick={closeModal}
              aria-label="Close modal"
            >
              &times;
            </button>
            <RegistrationForm />
          </div>
        </div>
      )}
    </>
  );
}
