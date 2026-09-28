import React from 'react';
import { useNavigate } from 'react-router-dom';


// @ts-ignore
import '../App.css';



function PaymentDetail() {
  const navigate = useNavigate();

  return (
    <div className="pd-page">
      <div className="pd-frame">
        <div className="pd-screen-label">Payment Detail</div>

        {/* Header */}
        <header className="pd-header">
          <div className="pd-brand">TRAABCO</div>
          <div className="pd-header-divider">|</div>
          <div className="pd-header-sub">Book a service</div>
          <button className="pd-back" onClick={() => navigate(-1)}>
            ← Back to account
          </button>
        </header>

        {/* Title Row */}
        <div className="pd-title-row">
          <div>
            <h1 className="pd-title">Transaction Details</h1>
            <p className="pd-subtitle">
              Review and finalize your session transaction variables below.
            </p>
          </div>
          <div className="pd-title-actions">
            <button className="pd-text-btn">Print receipt</button>
            <span className="pd-pill pd-pill-lg">Paid</span>
          </div>
        </div>

        {/* Info Grid Layout */}
        <div className="pd-grid">
          {/* Column 1 Content */}
          <div className="pd-c1 pd-r1">
            <div className="pd-label">Consulting Session Fee</div>
            <div className="pd-amount">R 2 200.00</div>
          </div>

          <div className="pd-c1 pd-r2">
            <div className="pd-label">Business Name</div>
            <div className="pd-value">Kaya Spaza Shop</div>
          </div>

          <div className="pd-c1 pd-r3">
            <div className="pd-label">Consultant</div>
            <div className="pd-value">L. Takshana (Director)</div>
          </div>

          {/* Column 2 Content */}
          <div className="pd-c2 pd-r1">
            <div className="pd-label">Payment Method</div>
            <div className="pd-value">EFT or Cash on day of session</div>
          </div>

          <div className="pd-c2 pd-r2">
            <div className="pd-label">Location Venue</div>
            <div className="pd-value">83 Madeira St, Mthatha</div>
          </div>

          {/* Side Receipt Column */}
          <aside className="pd-side">
            <div className="pd-receipt-file">
              <strong>Receipt Status</strong>
              <br />
              Payment Succesful 
            </div>
            <button 
              className="pd-btn-primary" 
              onClick={() => navigate('/book/success')}
            >
              Book Another Service →
            </button>
          </aside>

          {/* Guidelines Tip Section */}
          <section className="pd-tip">
            <div className="pd-tip-title">Important Guidelines:</div>
            <p className="pd-tip-text">
              Traabco will review availability and confirm your booking request 
              within <strong>24 hours</strong> of submission.
            </p>
          </section>

          {/* Reference Link Row */}
          <div className="pd-linked">
            <div className="pd-linked-row">
              <div>
                <div className="pd-linked-title">Need to adjust your timeline?</div>
                <div className="pd-linked-meta">Go back to update the booking criteria.</div>
              </div>
              <button className="pd-view" onClick={() => navigate('/book')}>
                Change Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentDetail;
