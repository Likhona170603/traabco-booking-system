import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmBookingModal from '../component/ConfirmBookingModal';
import { Service, BookingDraft } from '../types';

const services: Service[] = [
  { id: 'acc', name: 'Accounting & bookkeeping', durationMinutes: 90, fee: 2200, consultant: 'L. Takatshana' },
  { id: 'tax', name: 'Tax services', durationMinutes: 60, fee: 1800, consultant: 'T. Jikijela' },
  { id: 'con', name: 'Business consulting', durationMinutes: 60, fee: 2800, consultant: 'L. Takatshana' },
  { id: 'aud', name: 'Auditing & review', durationMinutes: 120, fee: 3200, consultant: 'N. Mhlontlo' },
];

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const quickTimes = ['09:00', '10:00', '13:00', '14:00', '15:00'];

// TODO: replace with a real API call once the backend exists.
// Deliberately "fails" ~30% of the time so both the success and failed
// screens are reachable during testing — remove the randomness once wired up.
function fakeSubmitBooking(): Promise<{ ok: boolean; reference?: string; reason?: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (Math.random() < 0.3) {
        resolve({ ok: false, reason: 'The selected slot was just taken by another client.' });
      } else {
        resolve({ ok: true, reference: `BK-2026-${Math.floor(100 + Math.random() * 900)}` });
      }
    }, 800);
  });
}

function addMinutes(time: string, minutes: number): string {
  const [h, m] = time.split(':').map(Number);
  const total = h * 60 + m + minutes;
  const hh = Math.floor(total / 60) % 24;
  const mm = total % 60;
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
}

// Builds a Monday-first grid of every day in the given month, with
// leading blank cells so the 1st lands under the correct weekday.
function buildCalendarCells(year: number, monthIndex: number): (Date | null)[] {
  const firstOfMonth = new Date(year, monthIndex, 1);
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const mondayFirstOffset = (firstOfMonth.getDay() + 6) % 7; // 0 = Monday

  const cells: (Date | null)[] = [];
  for (let i = 0; i < mondayFirstOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, monthIndex, d));
  return cells;
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export default function BookAService() {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<Service | null>(services[0]);
  const [viewYear, setViewYear] = useState(2026);
  const [viewMonth, setViewMonth] = useState(4); // 0-indexed: 4 = May
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2026, 4, 26));
  const [selectedTime, setSelectedTime] = useState<string>('10:00');
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  const calendarCells = useMemo(() => buildCalendarCells(viewYear, viewMonth), [viewYear, viewMonth]);

  const goToPrevMonth = () => {
    setSelectedDate(null);
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  };

  const goToNextMonth = () => {
    setSelectedDate(null);
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  };

  const canConfirm = !!selectedService && !!selectedDate && !!selectedTime;

  const draft: BookingDraft | null = canConfirm
    ? {
        service: selectedService as Service,
        date: (selectedDate as Date).toDateString(),
        time: `${selectedTime} – ${addMinutes(selectedTime, (selectedService as Service).durationMinutes)}`,
      }
    : null;

  const handleConfirm = async () => {
    setSubmitting(true);
    const result = await fakeSubmitBooking();
    setSubmitting(false);
    setModalOpen(false);

    if (result.ok) {
      navigate('/book/success', { state: { ...draft, reference: result.reference } });
    } else {
      navigate('/book/failed', { state: { reason: result.reason } });
    }
  };

  return (
    <div className="page">
      <h1>Book a service</h1>
      <p className="subtitle">Choose a service and pick a date and time — no separate confirmation step needed</p>

      <p className="step-title"><span className="step-num">1</span>Choose a service</p>
      <div className="service-grid">
        {services.map((service) => (
          <button
            key={service.id}
            type="button"
            className={`service-card ${selectedService?.id === service.id ? 'selected' : ''}`}
            onClick={() => setSelectedService(service)}
          >
            <p className="service-name">{service.name}</p>
            <p className="service-meta">
              {service.durationMinutes} min · R {service.fee.toLocaleString()}.00
            </p>
            <p className="service-meta">{service.consultant}</p>
          </button>
        ))}
      </div>

      <p className="step-title"><span className="step-num">2</span>Pick a date and time</p>
      <div className="booking-columns">
        <div className="calendar-panel">
          <div className="calendar-nav">
            <button type="button" onClick={goToPrevMonth}>← Prev</button>
            <p>{monthNames[viewMonth]} {viewYear}</p>
            <button type="button" onClick={goToNextMonth}>Next →</button>
          </div>
          <div className="calendar-weekdays">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <span key={i}>{d}</span>)}
          </div>
          <div className="calendar-grid">
            {calendarCells.map((date, i) => {
              if (!date) return <div key={i} />;
              const isPast = date < today;
              const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
              return (
                <button
                  key={i}
                  type="button"
                  disabled={isPast}
                  className={`day ${isSelected ? 'selected' : ''} ${isPast ? 'past' : ''}`}
                  onClick={() => setSelectedDate(date)}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>

        <div className="slots-column">
          <p className="field-label">Pick a time</p>
          <input
            type="time"
            className="time-input"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          />

          <p className="field-label" style={{ marginTop: 14 }}>Or choose a common slot</p>
          <div className="slot-grid">
            {quickTimes.map((time) => (
              <button
                key={time}
                type="button"
                className={`slot ${selectedTime === time ? 'selected' : ''}`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>

          {draft && (
            <div className="summary-card">
              <div className="summary-row"><span>Service</span><span>{draft.service.name}</span></div>
              <div className="summary-row"><span>Date</span><span>{draft.date}</span></div>
              <div className="summary-row"><span>Time</span><span>{draft.time}</span></div>
              <div className="summary-row"><span>Fee</span><span>R {draft.service.fee}.00</span></div>
            </div>
          )}
        </div>
      </div>

      <div className="button-row" style={{ justifyContent: 'flex-end' }}>
        <button
          type="button"
          className="btn-primary"
          disabled={!canConfirm}
          onClick={() => setModalOpen(true)}
        >
          Confirm booking →
        </button>
      </div>

      {draft && (
        <ConfirmBookingModal
          isOpen={modalOpen}
          booking={draft}
          isSubmitting={submitting}
          onClose={() => setModalOpen(false)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}