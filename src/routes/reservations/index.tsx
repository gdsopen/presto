import { createFileRoute } from "@tanstack/react-router";
import ReservationsPage from "../../pages/reservations";

// biome-ignore lint/suspicious/noExplicitAny: file-based route
export const Route = (createFileRoute as any)("/reservations")({
  component: ReservationsPage,
});
