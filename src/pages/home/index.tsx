import { css } from "../../../styled-system/css";
import { MainLayout } from "../../layouts/MainLayout";

function App() {
  return (
    <MainLayout>
      <h1
        className={css({
          fontSize: "1.7rem",
          fontWeight: "700",
          color: "#333",
        })}
      >
        Boarding Pass
      </h1>
    </MainLayout>
  );
}

export default App;
