import { css } from "../../../styled-system/css";
import { Navbar } from "./_components/Navbar";

export const MainLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
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
        })}
      >
        {children}
      </main>
    </div>
  );
};
