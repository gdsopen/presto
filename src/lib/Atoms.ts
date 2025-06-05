import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type Printer = {
  name: string;
  vendor_id: number;
  device_id: number;
};

export const printerAtom = atomWithStorage<Printer>("selectedPrinter", {
  name: "",
  vendor_id: 0,
  device_id: 0,
});

export type AuthToken = {
  token: string;
  loading: boolean;
};

export const authTokenAtom = atom<AuthToken>({
  token: "",
  loading: false,
});

export type UserData = {
  login: string;
  name: string;
  role: string;
  terminal: string;
};

export const userDataAtom = atom<UserData | null>(null);

export type Reservation = {
  id: string;
  name: string;
  date: string;
  time: string;
  people: number;
  note: string;
};

export const reservationsAtom = atomWithStorage<Reservation[]>(
  "reservations",
  [],
);

export type FlightReservation = {
  id: string;
  passengerName: string;
  flightNumber: string;
  departure: string;
  arrival: string;
  date: string;
  time: string;
  seat: string;
  note: string;
};

export const flightReservationsAtom = atomWithStorage<FlightReservation[]>(
  "flightReservations",
  [],
);

export type PnrPassenger = {
  rph: string;
  name: string;
  ffp?: string;
};

export type PnrFlight = {
  flightNumber: string;
  from: string;
  to: string;
  date: string;
  seat?: string;
};

export type Pnr = {
  id: string;
  recordLocator: string;
  passengers: PnrPassenger[];
  flights: PnrFlight[];
  note: string;
};

export const pnrsAtom = atomWithStorage<Pnr[]>("pnrs", []);
