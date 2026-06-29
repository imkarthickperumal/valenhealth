"use client";

import { useActionState, useEffect, useRef } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { sendReferralEmail, type FormState } from "./actions";
import * as fpixel from "../../lib/fpixel";

const initialState: FormState = { status: "idle", message: "" };

export default function ReferralClient() {
  const [state, formAction, isPending] = useActionState(sendReferralEmail, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  // Reset form and track lead event on success
  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      fpixel.event("Lead", {
        content_name: "Referral Form",
        status: "success",
      });
    }
  }, [state.status]);

  return (
    <>
      <Header />
      <main className="referral-page">
        <div className="referral-container">
          <div className="referral-header">
            <h1>MAKE A REFERRAL</h1>
          </div>

          {state.status === "success" ? (
            <div className="referral-success-card">
              <div className="success-icon-wrapper">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2>THANK YOU!</h2>
              <p className="success-message">{state.message}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="referral-reset-btn"
              >
                Submit Another Referral
              </button>
            </div>
          ) : (
            <>
              <p className="referral-intro" style={{ marginBottom: "32px" }}>
                Please fill in the form below to make a referral to Valen health. A member of the team will be in touch within 24 hours after the referral has been received.
              </p>

              {/* Error Banner */}
              {state.status === "error" && (
                <div className="referral-alert referral-alert--error">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {state.message}
                </div>
              )}

              <form ref={formRef} className="referral-form" action={formAction}>

                {/* YOUR DETAILS */}
                <div className="referral-section">
                  <h2 className="referral-section-title">YOUR DETAILS</h2>
                  <div className="referral-grid">
                    <div className="form-group">
                      <label className="form-label">Your Full Name <span>*</span></label>
                      <input name="yourName" type="text" className="form-input" placeholder="Name" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Your Email <span>*</span></label>
                      <input name="yourEmail" type="email" className="form-input" placeholder="Email" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Your Mobile <span>*</span></label>
                      <input name="yourMobile" type="tel" className="form-input" placeholder="Mobile" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Please Select relevant Scheme <span>*</span></label>
                      <select name="scheme" className="form-select" required defaultValue="">
                        <option value="" disabled>Select a scheme</option>
                        <option value="Workers Compensation">Workers Compensation</option>
                        <option value="CTP/MVA">CTP/MVA</option>
                        <option value="NDIS">NDIS</option>
                        <option value="Life Insurance">Life Insurance</option>
                        <option value="Medicare">Medicare</option>
                        <option value="DVA">DVA</option>
                        <option value="Private">Private</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* CLIENT DETAILS */}
                <div className="referral-section">
                  <h2 className="referral-section-title">CLIENT DETAILS</h2>
                  <div className="referral-grid">
                    <div className="form-group">
                      <label className="form-label">Clients Full Name <span>*</span></label>
                      <input name="clientName" type="text" className="form-input" placeholder="Name" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Clients Email <span>*</span></label>
                      <input name="clientEmail" type="email" className="form-input" placeholder="Email" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Clients Mobile <span>*</span></label>
                      <input name="clientMobile" type="tel" className="form-input" placeholder="Mobile" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Claim Number <span>*</span></label>
                      <input name="claimNumber" type="text" className="form-input" placeholder="Claim Number" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Injury Condition <span>*</span></label>
                      <input name="injuryCondition" type="text" className="form-input" placeholder="Injury Condition" required />
                    </div>
                    <div className="form-group full-width" style={{ gridColumn: "1 / -1" }}>
                      <label className="form-label">Current Certification <span>*</span></label>
                      <textarea name="certification" className="form-textarea" placeholder="Please provide hours & restrictions" required></textarea>
                    </div>
                  </div>
                </div>

                {/* AGENT/INSURANCE DETAILS */}
                <div className="referral-section">
                  <h2 className="referral-section-title">AGENT/INSURANCE DETAILS</h2>
                  <div className="referral-grid">
                    <div className="form-group">
                      <label className="form-label">Name Of The Company <span>*</span></label>
                      <input name="agentCompany" type="text" className="form-input" placeholder="Name Of The Company" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Contact Person <span>*</span></label>
                      <input name="agentContact" type="text" className="form-input" placeholder="Contact Person" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input name="agentEmail" type="email" className="form-input" placeholder="Email" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone <span>*</span></label>
                      <input name="agentPhone" type="tel" className="form-input" placeholder="Phone" required />
                    </div>
                  </div>
                </div>

                {/* TREATING DOCTOR DETAILS */}
                <div className="referral-section">
                  <h2 className="referral-section-title">TREATING DOCTOR DETAILS</h2>
                  <div className="referral-grid">
                    <div className="form-group">
                      <label className="form-label">Doctor Name <span>*</span></label>
                      <input name="doctorName" type="text" className="form-input" placeholder="Doctor Name" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Name of Practice <span>*</span></label>
                      <input name="practiceName" type="text" className="form-input" placeholder="Name of Practice" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input name="doctorEmail" type="email" className="form-input" placeholder="Email" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone <span>*</span></label>
                      <input name="doctorPhone" type="tel" className="form-input" placeholder="Phone" required />
                    </div>
                    <div className="form-group full-width" style={{ gridColumn: "1 / -1" }}>
                      <label className="form-label">Street Address</label>
                      <input name="streetAddress" type="text" className="form-input" placeholder="Street Address" />
                    </div>
                  </div>
                  <div className="referral-grid four-cols" style={{ marginTop: "20px" }}>
                    <div className="form-group">
                      <label className="form-label">City</label>
                      <input name="city" type="text" className="form-input" placeholder="City" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">State</label>
                      <input name="state" type="text" className="form-input" placeholder="State" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Postcode</label>
                      <input name="postcode" type="text" className="form-input" placeholder="Postcode" />
                    </div>
                  </div>
                </div>

                {/* EMPLOYER DETAILS */}
                <div className="referral-section">
                  <h2 className="referral-section-title">EMPLOYER DETAILS</h2>
                  <div className="referral-grid">
                    <div className="form-group">
                      <label className="form-label">Name of Company <span>*</span></label>
                      <input name="employerCompany" type="text" className="form-input" placeholder="Name of Company" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Contact Person <span>*</span></label>
                      <input name="employerContact" type="text" className="form-input" placeholder="Contact Person" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email <span>*</span></label>
                      <input name="employerEmail" type="email" className="form-input" placeholder="Email" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone <span>*</span></label>
                      <input name="employerPhone" type="tel" className="form-input" placeholder="Phone" required />
                    </div>
                  </div>
                </div>

                {/* OTHER ALLIED HEALTH */}
                <div className="referral-section">
                  <h2 className="referral-section-title">OTHER ALLIED HEALTH</h2>
                  <div className="referral-grid">
                    <div className="form-group">
                      <label className="form-label">Name of Company <span>*</span></label>
                      <input name="alliedCompany" type="text" className="form-input" placeholder="Name of Company" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Contact Person <span>*</span></label>
                      <input name="alliedContact" type="text" className="form-input" placeholder="Contact Person" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email <span>*</span></label>
                      <input name="alliedEmail" type="email" className="form-input" placeholder="Email" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone <span>*</span></label>
                      <input name="alliedPhone" type="tel" className="form-input" placeholder="Phone" required />
                    </div>
                  </div>
                </div>

                {/* ADDITIONAL COMMENTS/INFORMATION */}
                <div className="referral-section">
                  <h2 className="referral-section-title">ADDITIONAL COMMENTS/INFORMATION</h2>
                  <div className="form-group" style={{ marginBottom: "16px" }}>
                    <label className="form-label">Fill Out/Attach Information</label>
                    <textarea name="additionalInfo" className="form-textarea" placeholder="Fill Out/Attach Information"></textarea>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Attach a File</label>
                    <input name="attachment" type="file" className="form-file" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="referral-submit"
                  disabled={isPending}
                  style={{ opacity: isPending ? 0.7 : 1, cursor: isPending ? "not-allowed" : "pointer" }}
                >
                  {isPending ? (
                    <>
                      <span className="referral-spinner" />
                      SENDING...
                    </>
                  ) : (
                    <>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                      SEND NOW
                    </>
                  )}
                </button>

              </form>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
