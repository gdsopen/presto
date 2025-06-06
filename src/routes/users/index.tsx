import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { css } from "../../../styled-system/css";
import type { components } from "../../api/generated/types";
import { Button } from "../../components/Button";
import { useAuth } from "../../hooks/useLoginValidation";
import { MainLayout } from "../../layouts/MainLayout";

// biome-ignore lint/suspicious/noExplicitAny: file-based route
export const Route = (createFileRoute as any)("/users")({
  component: UsersPage,
});

function UsersPage() {
  const { user } = useAuth();
  const { reset } = useForm<components["schemas"]["UpdateUser"]>({
    defaultValues: {
      name: user?.name || "",
      currentPassword: "",
      newPassword: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        currentPassword: "",
        newPassword: "",
      });
    }
  }, [user, reset]);

  return (
    <MainLayout>
      <h1
        className={css({
          fontSize: "1.7rem",
          fontWeight: "700",
          color: "#333",
        })}
      >
        Account Settings
      </h1>
      <div>
        <div>
          <a href="/users/me">
            <Button>Update my information</Button>
          </a>
        </div>
        <div>
          <a href="/users/other">
            <Button>Update other user</Button>
          </a>
        </div>
        <div>
          <a href="/users/invite">
            <Button>Invite user</Button>
          </a>
        </div>
      </div>
    </MainLayout>
  );
}
