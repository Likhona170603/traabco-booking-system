export interface Service {
  id: string;
  name: string;
  durationMinutes: number;
  fee: number;
  consultant: string;
}

export interface BookingDraft {
  service: Service;
  date: string;
  time: string;
}

export interface ConfirmedBooking extends BookingDraft {
  reference: string;
}