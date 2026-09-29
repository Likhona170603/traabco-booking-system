
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmailError("");

    if (!email.trim()) {
      setEmailError("Email address is required.");
      return;
    }

    if (!validateEmail(email.trim())) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    // Stay on this page and show the confirmation state.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="lg-page">
        <div className="lg-frame">
          <span className="lg-frame-indicator">Frame</span>

          <div className="lg-brand-section">
            <div className="lg-icon-box">
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>

            <div>
              <h1 className="lg-brand-title">TRAABCO</h1>
              <p className="lg-brand-sub">
                Management portal · Mthatha, EC
              </p>
            </div>
          </div>

          <div className="lg-form">
            <h2 className="lg-form-title">Check your email</h2>

            <p className="lg-form-subtitle">
              If an account exists for <strong>{email}</strong>, we have sent
              instructions to reset your password.
            </p>

            <button
              type="button"
              className="lg-submit-btn"
              onClick={() => navigate("/login")}
            >
              Back to sign in
            </button>

            <div className="lg-call-block">
              <h3>Call us instead</h3>

              <p>
                If you need assistance with your password reset, please
                contact the TRAABCO office.
              </p>

              <p>
                No. 83 Madeira Street, Mthatha · Est. 2012
              </p>
            </div>
          </div>

          <footer className="lg-footer">
            <div className="lg-access-levels">
              Access levels: Admin · Consultant · Viewer
            </div>

            <div className="lg-address">
              No. 83 Madeira Street, Mthatha · Est. 2012
            </div>
          </footer>
        </div>
      </div>
    );
  }

  return (
    <div className="lg-page">
      <div className="lg-frame">
        <span className="lg-frame-indicator">Frame</span>

        <div className="lg-brand-section">
          <div className="lg-icon-box">
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>

          <div>
            <h1 className="lg-brand-title">TRAABCO</h1>
            <p className="lg-brand-sub">
              Management portal · Mthatha, EC
            </p>
          </div>
        </div>

        <form className="lg-form" onSubmit={handleSubmit}>
          <h2 className="lg-form-title">Forgot your password?</h2>

          <p className="lg-form-subtitle">
            Enter your email address and we'll send you instructions to reset
            your password.
          </p>

          <div className="lg-input-group">
            <label htmlFor="forgot-email">Email address</label>

            <input
              id="forgot-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              required
            />

            {emailError && (
              <p className="lg-error">{emailError}</p>
            )}
          </div>

          <button type="submit" className="lg-submit-btn">
            Send reset instructions
          </button>

          <button
            type="button"
            className="lg-back-link"
            onClick={() => navigate("/login")}
          >
            Back to sign in
          </button>

          <div className="lg-call-block">
            <h3>Call us instead</h3>

            <p>
              If you need assistance with your password reset, please contact
              the TRAABCO office.
            </p>

            <p>
              No. 83 Madeira Street, Mthatha · Est. 2012
            </p>
          </div>
        </form>

        <footer className="lg-footer">
          <div className="lg-access-levels">
            Access levels: Admin · Consultant · Viewer
          </div>

          <div className="lg-address">
            No. 83 Madeira Street, Mthatha · Est. 2012
          </div>
        </footer>
      </div>
    </div>
  );
}

