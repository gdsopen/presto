import { createFileRoute } from "@tanstack/react-router";
import NewFlightReservationPage from "../../../pages/flight-reservations/new";

// biome-ignore lint/suspicious/noExplicitAny: file-based route
export const Route = (createFileRoute as any)("/flight-reservations/new")({
  component: NewFlightReservationPage,
});
