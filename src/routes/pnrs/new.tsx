import { createFileRoute } from "@tanstack/react-router";
import NewPnrPage from "../../pages/pnrs/new";

// biome-ignore lint/suspicious/noExplicitAny: file-based route
export const Route = (createFileRoute as any)("/pnrs/new")({
  component: NewPnrPage,
});
