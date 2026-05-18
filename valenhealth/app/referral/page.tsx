"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./referral.css";

export default function ReferralPage() {
  return (
    <>
      <Header />
      <main className="referral-page">
        <div className="referral-container">
          <div className="referral-header">
            <h1>MAKE A REFERRAL</h1>
          </div>
          
          <p className="referral-intro" style={{ marginBottom: "32px" }}>
            Please fill in the form below to make a referral to Valen health. A member of the team will be in touch within 24 hour after referral has been received.
          </p>

          <form className="referral-form" onSubmit={(e) => e.preventDefault()}>
            
            {/* YOUR DETAILS */}
            <div className="referral-section">
              <h2 className="referral-section-title">YOUR DETAILS</h2>
              <div className="referral-grid">
                <div className="form-group">
                  <label className="form-label">Your Full Name <span>*</span></label>
                  <input type="text" className="form-input" placeholder="Name" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Your Email <span>*</span></label>
                  <input type="email" className="form-input" placeholder="Email" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Your Mobile <span>*</span></label>
                  <input type="tel" className="form-input" placeholder="Mobile" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Please Select relevant Scheme <span>*</span></label>
                  <select className="form-select" required defaultValue="">
                    <option value="" disabled>Workers Compensation</option>
                    <option value="workers_comp">Workers Compensation</option>
                    <option value="ctp_mva">CTP/MVA</option>
                    <option value="ndis">NDIS</option>
                    <option value="life_insurance">Life Insurance</option>
                    <option value="medicare">Medicare</option>
                    <option value="dva">DVA</option>
                    <option value="private">Private</option>
                    <option value="others">Others</option>
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
                  <input type="text" className="form-input" placeholder="Name" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Clients Email <span>*</span></label>
                  <input type="email" className="form-input" placeholder="Email" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Clients Mobile <span>*</span></label>
                  <input type="tel" className="form-input" placeholder="Mobile" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Claim Number <span>*</span></label>
                  <input type="text" className="form-input" placeholder="Claim Number" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Injury Condition <span>*</span></label>
                  <input type="text" className="form-input" placeholder="Injury Condition" required />
                </div>
                <div className="form-group full-width" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label">Current Certification <span>*</span></label>
                  <textarea className="form-textarea" placeholder="Please provide hours & restrictions" required></textarea>
                </div>
              </div>
            </div>

            {/* AGENT/INSURANCE DETAILS */}
            <div className="referral-section">
              <h2 className="referral-section-title">AGENT/INSURANCE DETAILS</h2>
              <div className="referral-grid">
                <div className="form-group">
                  <label className="form-label">Name Of The Company <span>*</span></label>
                  <input type="text" className="form-input" placeholder="Name Of The Company" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Contact Person <span>*</span></label>
                  <input type="text" className="form-input" placeholder="Contact Person" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-input" placeholder="Email" />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone <span>*</span></label>
                  <input type="tel" className="form-input" placeholder="Phone" required />
                </div>
              </div>
            </div>

            {/* TREATING DOCTOR DETAILS */}
            <div className="referral-section">
              <h2 className="referral-section-title">TREATING DOCTOR DETAILS</h2>
              <div className="referral-grid">
                <div className="form-group">
                  <label className="form-label">Doctor Name <span>*</span></label>
                  <input type="text" className="form-input" placeholder="Doctor Name" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Name of Practice <span>*</span></label>
                  <input type="text" className="form-input" placeholder="Name of Practice" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-input" placeholder="Email" />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone <span>*</span></label>
                  <input type="tel" className="form-input" placeholder="Phone" required />
                </div>
                <div className="form-group full-width" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label">Street Address</label>
                  <input type="text" className="form-input" placeholder="Street Address" />
                </div>
              </div>
              <div className="referral-grid four-cols" style={{ marginTop: '20px' }}>
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input type="text" className="form-input" placeholder="City" />
                </div>
                <div className="form-group">
                  <label className="form-label">State</label>
                  <input type="text" className="form-input" placeholder="State" />
                </div>
                <div className="form-group">
                  <label className="form-label">Postcode</label>
                  <input type="text" className="form-input" placeholder="Postcode" />
                </div>
              </div>
            </div>

            {/* EMPLOYER DETAILS */}
            <div className="referral-section">
              <h2 className="referral-section-title">EMPLOYER DETAILS</h2>
              <div className="referral-grid">
                <div className="form-group">
                  <label className="form-label">Name of Company <span>*</span></label>
                  <input type="text" className="form-input" placeholder="Name of Company" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Contact Person <span>*</span></label>
                  <input type="text" className="form-input" placeholder="Contact Person" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Email <span>*</span></label>
                  <input type="email" className="form-input" placeholder="Email" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone <span>*</span></label>
                  <input type="tel" className="form-input" placeholder="Phone" required />
                </div>
              </div>
            </div>

            {/* OTHER ALLIED HEALTH */}
            <div className="referral-section">
              <h2 className="referral-section-title">OTHER ALLIED HEALTH</h2>
              <div className="referral-grid">
                <div className="form-group">
                  <label className="form-label">Name of Company <span>*</span></label>
                  <input type="text" className="form-input" placeholder="Name of Company" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Contact Person <span>*</span></label>
                  <input type="text" className="form-input" placeholder="Contact Person" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Email <span>*</span></label>
                  <input type="email" className="form-input" placeholder="Email" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone <span>*</span></label>
                  <input type="tel" className="form-input" placeholder="Phone" required />
                </div>
              </div>
            </div>

            {/* ADDITIONAL COMMENTS/INFORMATION */}
            <div className="referral-section">
              <h2 className="referral-section-title">ADDITIONAL COMMENTS/INFORMATION</h2>
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label">Fill Out/Attach Information</label>
                <textarea className="form-textarea" placeholder="Fill Out/Attach Information"></textarea>
              </div>
              <div className="form-group">
                <input type="file" className="form-file" />
              </div>
            </div>

            <button type="submit" className="referral-submit">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
              SEND NOW
            </button>

          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
