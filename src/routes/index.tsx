import { createFileRoute } from "@tanstack/react-router";
import IndexPage from "../pages";

// biome-ignore lint/suspicious/noExplicitAny: file-based route
export const Route = (createFileRoute as any)("/")({
  component: IndexPage,
});
