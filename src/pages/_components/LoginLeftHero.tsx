import { IconId } from "@tabler/icons-react";
import { css } from "../../../styled-system/css";

export const LoginHeader = () => {
  return (
    <div
      className={css({
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.25),rgba(0,0,0,0.45)), url('/bg.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      })}
    >
      <IconId size={40} />
      <h1 className={css({ fontWeight: "700", fontSize: "2rem" })}>Login</h1>
      <p>Welcome to Presto</p>
    </div>
  );
};
