import { createFileRoute } from "@tanstack/react-router";
import HomePage from "../../pages/home";

// biome-ignore lint/suspicious/noExplicitAny: file-based route
export const Route = (createFileRoute as any)("/home")({
  component: HomePage,
});
