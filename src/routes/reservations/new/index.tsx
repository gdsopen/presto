import { createFileRoute } from "@tanstack/react-router";
import NewReservationPage from "../../../pages/reservations/new";

// biome-ignore lint/suspicious/noExplicitAny: file-based route
export const Route = (createFileRoute as any)("/reservations/new")({
  component: NewReservationPage,
});
