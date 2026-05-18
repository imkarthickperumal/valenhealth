"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import "./RegistrationForm.css";
import * as fpixel from "../../lib/fpixel";

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
    
    // Track complete registration event on Meta Pixel
    fpixel.event("CompleteRegistration", {
      content_name: "Gym Registration Form",
      status: "success",
    });

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
        <div className="form-header">
          <h2 className="form-title">Gym Registration</h2>
          <p className="form-sub">Start your journey with Valen Health today.</p>
        </div>

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

        <div className="form-group form-group-full">
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


    </div>
  );
}
