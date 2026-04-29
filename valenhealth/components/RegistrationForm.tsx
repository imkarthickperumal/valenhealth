"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  membershipType: string;
  comments: string;
};

export default function RegistrationForm() {
  const [showSuccess, setShowSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Form submitted:", data);
    setShowSuccess(true);
    reset();
    
    // Hide snackbar after 5 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  return (
    <div className="form-container">
      {showSuccess && (
        <div className="snackbar">
          <div className="snackbar-content">
            <span className="check-icon">✓</span>
            <div>
              <strong>Success!</strong>
              <p>Your registration has been submitted.</p>
            </div>
          </div>
          <button onClick={() => setShowSuccess(false)} className="close-btn">×</button>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="reg-form">
        <h2 className="form-title">Gym Registration</h2>
        <p className="form-sub">Start your journey with Valen Health today.</p>

        <div className="form-group">
          <label>Full Name</label>
          <input
            {...register("fullName", { required: "Full name is required" })}
            placeholder="John Doe"
            className={errors.fullName ? "error" : ""}
          />
          {errors.fullName && <span className="error-msg">{errors.fullName.message}</span>}
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            placeholder="john@example.com"
            className={errors.email ? "error" : ""}
          />
          {errors.email && <span className="error-msg">{errors.email.message}</span>}
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            {...register("phone", { required: "Phone number is required" })}
            placeholder="0400 000 000"
            className={errors.phone ? "error" : ""}
          />
          {errors.phone && <span className="error-msg">{errors.phone.message}</span>}
        </div>

        <div className="form-group">
          <label>Membership Type</label>
          <select {...register("membershipType", { required: "Please select a membership" })}>
            <option value="">Select a plan...</option>
            <option value="basic">Basic Gym - $17.88/wk</option>
            <option value="performance">Performance Lab - $24.95/wk</option>
            <option value="ep">Exercise Physiology - Rebated</option>
          </select>
          {errors.membershipType && <span className="error-msg">{errors.membershipType.message}</span>}
        </div>

        <div className="form-group">
          <label>Additional Comments (Optional)</label>
          <textarea
            {...register("comments")}
            placeholder="Any health goals or injuries we should know about?"
            rows={3}
          />
        </div>

        <button type="submit" disabled={isSubmitting} className="btn btn-orange btn-full">
          {isSubmitting ? "Submitting..." : "Submit Registration"}
        </button>
      </form>

      <style jsx>{`
        .form-container {
          max-width: 500px;
          margin: 40px auto;
          padding: 40px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .form-title {
          font-family: var(--font-league-spartan), sans-serif;
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 8px;
          color: var(--ink);
        }
        .form-sub {
          font-size: 14px;
          color: var(--stone-500);
          margin-bottom: 32px;
        }
        .form-group {
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        label {
          font-family: var(--font-league-spartan), sans-serif;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--stone-500);
        }
        input, select, textarea {
          padding: 12px 16px;
          border: 1px solid var(--stone-200);
          border-radius: 6px;
          font-size: 15px;
          transition: border-color 0.2s;
        }
        input:focus, select:focus, textarea:focus {
          outline: none;
          border-color: var(--orange);
        }
        input.error {
          border-color: #ff4d4d;
        }
        .error-msg {
          color: #ff4d4d;
          font-size: 12px;
        }
        .snackbar {
          position: fixed;
          top: 24px;
          right: 24px;
          background: #333;
          color: white;
          padding: 16px 24px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          z-index: 1000;
          animation: slideIn 0.3s ease-out;
          border-left: 4px solid var(--orange);
        }
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .snackbar-content {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .check-icon {
          background: var(--orange);
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }
        .snackbar p {
          font-size: 13px;
          opacity: 0.8;
          margin: 0;
        }
        .snackbar strong {
          font-size: 15px;
        }
        .close-btn {
          background: none;
          border: none;
          color: white;
          font-size: 20px;
          cursor: pointer;
          opacity: 0.5;
        }
        .close-btn:hover {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
