import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { css } from "../../styled-system/css";
import { useAuth, useLoginValidation } from "../hooks/useLoginValidation";
import { LoginLayout } from "../layouts/LoginLayout";
import { LoginForm } from "./_components/LoginForm";
import { LoginHeader } from "./_components/LoginLeftHero";

type LoginFormData = {
  id: string;
  password: string;
};

function App() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { validateLogin, isLoading } = useLoginValidation();

  const onSubmit = async (data: LoginFormData) => {
    const result = await validateLogin(data.id, data.password);

    if (result.isValid) {
      navigate({ to: "/home" });
    } else {
      console.error(result.error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/home" });
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

export default App;
