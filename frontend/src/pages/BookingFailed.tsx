import { useNavigate, useLocation } from 'react-router-dom';

interface FailedState {
  reason?: string;
}

export default function BookingFailed() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as FailedState) || {};

  return (
    <div className="page center">
      <div className="error-icon">✕</div>
      <h1>We couldn't submit your booking</h1>
      <p className="subtitle">
        {state.reason || 'Something went wrong while submitting your request. No payment has been taken.'}
      </p>

      <div className="button-row">
        <button type="button" className="btn-primary" onClick={() => navigate('/book')}>
          Try again
        </button>
        <button type="button" onClick={() => navigate('/dashboard')}>
          Back to my account
        </button>
      </div>

      <p className="subtitle" style={{ marginTop: 16 }}>
        Still stuck? Call 047 531 0000 or email info@traabco.co.za
      </p>
    </div>
  );
}
