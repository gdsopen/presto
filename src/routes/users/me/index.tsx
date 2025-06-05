import { createFileRoute } from "@tanstack/react-router";
import UserMePage from "../../../pages/users/me";

// biome-ignore lint/suspicious/noExplicitAny: file-based route
export const Route = (createFileRoute as any)("/users/me")({
  component: UserMePage,
});
