import { useEffect } from "react";
import { css } from "../../../styled-system/css";
import { useAuth } from "../../hooks/useLoginValidation";
import { Navbar } from "./_components/Navbar";

export const MainLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const auth = useAuth();

  useEffect(() => {
    if (auth.isInitialized && !auth.isAuthenticated && !auth.isLoading) {
      window.location.href = "/";
    }
  }, [auth.isInitialized, auth.isAuthenticated, auth.isLoading]);

  if (auth.isLoading || !auth.isInitialized) {
    return (
      <div
        className={css({
          display: "flex",
          justifyContent: "center",
          padding: "20px",
        })}
      >
        読み込み中...
      </div>
    );
  }

  return (
    <div
      className={css({
        fontFamily: `"Open Sans", "Noto Sans JP", "Segoe UI", Arial, Helvetica, "Meiryo UI", sans-serif`,
      })}
    >
      <Navbar />
      <main
        className={css({
          maxWidth: "1200px",
          margin: "16px auto",
          paddingX: "16px",
        })}
      >
        {children}
      </main>
    </div>
  );
};
