import { createFileRoute } from "@tanstack/react-router";
import PnrDetailsPage from "../../pages/pnrs/details";

// biome-ignore lint/suspicious/noExplicitAny: file-based route
export const Route = (createFileRoute as any)("/pnrs/details")({
  component: PnrDetailsPage,
});
