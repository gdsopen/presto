import { createFileRoute } from "@tanstack/react-router";
import FlightReservationsPage from "../../pages/flight-reservations";

// biome-ignore lint/suspicious/noExplicitAny: file-based route
export const Route = (createFileRoute as any)("/flight-reservations")({
  component: FlightReservationsPage,
});
