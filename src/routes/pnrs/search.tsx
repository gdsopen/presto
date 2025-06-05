import { createFileRoute } from "@tanstack/react-router";
import SearchPnrsPage from "../../pages/pnrs/search";

// biome-ignore lint/suspicious/noExplicitAny: file-based route
export const Route = (createFileRoute as any)("/pnrs/search")({
  component: SearchPnrsPage,
});
