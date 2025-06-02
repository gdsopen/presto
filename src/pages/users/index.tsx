import { css } from "../../../styled-system/css";
import { useAuth } from "../../hooks/useLoginValidation";
import { MainLayout } from "../../layouts/MainLayout";

function App() {
  const { user } = useAuth();

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
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        })}
      >
        <p>Name: {user?.name}</p>
        <p>Email: {user?.login}</p>
      </div>
    </MainLayout>
  );
}

export default App;
