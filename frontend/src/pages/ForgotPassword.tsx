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

    const trimmedEmail = email.trim();

    setEmailError("");

    if (!trimmedEmail) {
      setEmailError("Email address is required.");
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    // Stay on this page and display the confirmation.
    setSubmitted(true);
  };

  /*
   * Confirmation state
   */
  if (submitted) {
    return (
      <div className="fp-page">
        <header className="fp-header">
          <div className="fp-brand">
            <div className="fp-lock-box">
              <svg
                viewBox="0 0 24 24"
                width="21"
                height="21"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="4" y="10" width="16" height="11" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
              </svg>
            </div>

            <div>
              <div className="fp-brand-name">TRAABCO</div>
              <div className="fp-brand-subtitle">
                Tacks Registered Accountants &amp; Business Consultants
              </div>
            </div>
          </div>

          <button
            type="button"
            className="fp-header-back"
            onClick={() => navigate("/login")}
          >
            ← Back to sign in
          </button>
        </header>

        <main className="fp-content">
          <div className="fp-success-icon">
            <svg
              viewBox="0 0 24 24"
              width="30"
              height="30"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="m8 12 2.5 2.5L16 9" />
            </svg>
          </div>

          <h1 className="fp-title">Check your email</h1>

          <p className="fp-description">
            If an account exists for <strong>{email}</strong>, we have sent
            you a password reset link.
          </p>

          <button
            type="button"
            className="fp-submit-button"
            onClick={() => navigate("/login")}
          >
            Back to sign in
          </button>

          <div className="fp-help">
            <h2>Don't have access to your email?</h2>

            <p>
              Call Traabco directly on{" "}
              <strong>047 531 0000</strong> during office hours and we will
              verify your identity and reset your account manually.
            </p>

            <p className="fp-contact">
              No. 83 Madeira Street, Mthatha · info@traabco.co.za
            </p>
          </div>
        </main>
      </div>
    );
  }

  /*
   * Forgot Password form
   */
  return (
    <div className="fp-page">
      <header className="fp-header">
        <div className="fp-brand">
          <div className="fp-lock-box">
            <svg
              viewBox="0 0 24 24"
              width="21"
              height="21"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="4" y="10" width="16" height="11" rx="2" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>
          </div>

          <div>
            <div className="fp-brand-name">TRAABCO</div>
            <div className="fp-brand-subtitle">
              Tacks Registered Accountants &amp; Business Consultants
            </div>
          </div>
        </div>

        <button
          type="button"
          className="fp-header-back"
          onClick={() => navigate("/login")}
        >
          ← Back to sign in
        </button>
      </header>

      <main className="fp-content">
        <div className="fp-main-lock">
          <svg
            viewBox="0 0 24 24"
            width="30"
            height="30"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="5" y="10" width="14" height="10" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            <circle cx="12" cy="15" r="1" />
          </svg>
        </div>

        <h1 className="fp-title">Forgot your password?</h1>

        <p className="fp-description">
          No problem. Enter the email address registered to your Traabco
          account and we will send you a reset link.
        </p>

        <form onSubmit={handleSubmit} className="fp-form">
          <div className="fp-field">
            <label htmlFor="forgot-email">
              Your registered email address <span>*</span>
            </label>

            <input
              id="forgot-email"
              type="email"
              value={email}
              placeholder="owner@kayas...co.za"
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
            />

            {emailError && (
              <p className="fp-error">{emailError}</p>
            )}
          </div>

          <p className="fp-instruction">
            This must match the email address you used when registering your
            business with Traabco.
          </p>

          <button type="submit" className="fp-submit-button">
            Send reset link
          </button>
        </form>

        <p className="fp-remembered">
          Remembered it?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
          >
            Back to sign in
          </button>
        </p>

        <div className="fp-help">
          <h2>Don't have access to your email?</h2>

          <p>
            Call Traabco directly on{" "}
            <strong>047 531 0000</strong> during office hours and we will
            verify your identity and reset your account manually.
          </p>

          <p className="fp-contact">
            No. 83 Madeira Street, Mthatha · info@traabco.co.za
          </p>
        </div>
      </main>
    </div>
  );
}