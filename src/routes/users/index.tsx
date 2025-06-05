import { createFileRoute } from "@tanstack/react-router";
import UsersPage from "../../pages/users";

// biome-ignore lint/suspicious/noExplicitAny: file-based route
export const Route = (createFileRoute as any)("/users")({
  component: UsersPage,
});
