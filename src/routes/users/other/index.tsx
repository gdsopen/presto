import { createFileRoute } from "@tanstack/react-router";
import UserOtherPage from "../../../pages/users/other";

// biome-ignore lint/suspicious/noExplicitAny: file-based route
export const Route = (createFileRoute as any)("/users/other")({
  component: UserOtherPage,
});
