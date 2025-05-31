import { IconId } from "@tabler/icons-react";
import { css } from "../../styled-system/css";
import { LoginLayout } from "../layouts/LoginLayout";

function App() {
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
        <div
          className={css({
            background: "#60abe0",
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
          <h1 className={css({ fontWeight: "700", fontSize: "2rem" })}>
            Login
          </h1>
          <p>Welcome to Presto</p>
        </div>
        <div
          className={css({
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "0 50px",
            gap: "10px",
          })}
        >
          <form
            className={css({
              maxWidth: "700px",
              width: "100%",
              display: "grid",
              gap: "2rem",
            })}
          >
            <div
              className={css({
                display: "grid",
                gridTemplateRows: "1fr 2fr",
              })}
            >
              <label htmlFor="id">Presto ID</label>
              <input
                type="text"
                name="id"
                placeholder="shiro@nh.prestouser.com"
                className={css({
                  fontFamily: "Azeret Mono, monospace",
                  width: "100%",
                  borderBottom: "2px solid #eee",
                  padding: "0 10px",
                  transition: "border-bottom 0.2s",
                  _hover: { borderBottom: "2px solid #000" },
                })}
              />
            </div>
            <div
              className={css({
                display: "grid",
                gridTemplateRows: "1fr 2fr",
              })}
            >
              <label htmlFor="password">セキュリティコード</label>
              <input
                type="password"
                name="password"
                placeholder="•••••••••"
                className={css({
                  width: "100%",
                  borderBottom: "2px solid #eee",
                  padding: "0 10px",
                  transition: "border-bottom 0.2s",
                  _hover: { borderBottom: "2px solid #000" },
                })}
              />
            </div>
            <button
              type="submit"
              className={css({
                width: "100%",
                background: "#60abe0",
                color: "#fff",
                padding: "10px",
                border: "none",
                cursor: "pointer",
                transition: "background 0.2s",
                _hover: { background: "#3f8abf" },
              })}
            >
              ログイン
            </button>
          </form>
          <a href="/home">ホーム</a>
          <a href="/gate">Gate</a>
          <p>
            Presto IDをお持ちではありませんか?
            <br />
            システム管理者にお問い合わせください。
          </p>
        </div>
      </div>
    </LoginLayout>
  );
}

export default App;
