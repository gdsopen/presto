import { createFileRoute } from "@tanstack/react-router";
import { css } from "../../../styled-system/css";
import { MainLayout } from "../../layouts/MainLayout";

// biome-ignore lint/suspicious/noExplicitAny: file-based route
export const Route = (createFileRoute as any)("/home")({
  component: HomePage,
});

function HomePage() {
  return (
    <MainLayout>
      <h1
        className={css({
          fontSize: "1.7rem",
          fontWeight: "700",
          color: "#333",
        })}
      >
        Welcome
      </h1>
    </MainLayout>
  );
}
