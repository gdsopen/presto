import { css } from "../../../styled-system/css";

export const LoginLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div
      className={css({
        fontFamily: `"Open Sans", "Noto Sans JP", "Segoe UI", Arial, Helvetica, "Meiryo UI", sans-serif`,
      })}
    >
      <main>{children}</main>
    </div>
  );
};
