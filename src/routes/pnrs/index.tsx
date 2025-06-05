import { createFileRoute } from "@tanstack/react-router";
import PnrsPage from "../../pages/pnrs";

// biome-ignore lint/suspicious/noExplicitAny: file-based route
export const Route = (createFileRoute as any)("/pnrs")({
  component: PnrsPage,
});
