import { createFileRoute } from "@tanstack/react-router";
import InviteUserPage from "../../../pages/users/invite";

// biome-ignore lint/suspicious/noExplicitAny: file-based route
export const Route = (createFileRoute as any)("/users/invite")({
  component: InviteUserPage,
});
