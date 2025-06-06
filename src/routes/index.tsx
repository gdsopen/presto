import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { css } from "../../styled-system/css";
import { LoginForm } from "../components/LoginForm";
import { LoginHeader } from "../components/LoginLeftHero";
import { useAuth, useLoginValidation } from "../hooks/useLoginValidation";
import { LoginLayout } from "../layouts/LoginLayout";

// biome-ignore lint/suspicious/noExplicitAny: file-based route
export const Route = (createFileRoute as any)("/")({
  component: UsersPage,
});
type LoginFormData = {
  id: string;
  password: string;
};

function UsersPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { validateLogin, isLoading } = useLoginValidation();

  const onSubmit = async (data: LoginFormData) => {
    const result = await validateLogin(data.id, data.password);

    if (result.isValid) {
      // biome-ignore lint/suspicious/noExplicitAny: router uses any
      navigate({ to: "/home" as any });
    } else {
      console.error(result.error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      // biome-ignore lint/suspicious/noExplicitAny: router uses any
      navigate({ to: "/home" as any });
    }
  }, [isAuthenticated, navigate]);

  return (
    <LoginLayout>
      <div
        className={css({
          display: "grid",
          gridTemplateColumns: "1fr",
          gridTemplateRows: "1fr 1fr",
          placeItems: "center",
          height: "100vh",
          md: {
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr",
          },
        })}
      >
        <LoginHeader />
        <LoginForm onSubmit={onSubmit} isLoading={isLoading} />
      </div>
    </LoginLayout>
  );
}
