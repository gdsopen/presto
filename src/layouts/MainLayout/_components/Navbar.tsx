"use client";
import {
  IconTriangleInvertedFilled,
  IconUserSquareRounded,
} from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { css } from "../../../../styled-system/css";
import { userId } from "../../../api/client";
import { Button } from "../../../components/Button";
import { MenuItem, PopoverMenu } from "../../../components/PopoverMenu";
import { PrinterSettings } from "../../../components/PrinterSettings";
import { authTokenAtom } from "../../../lib/Atoms";
export const Navbar: React.FC = () => {
  return (
    <div
      className={css({
        borderBottom: "1px solid #ccc",
        padding: "20px 10px",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        background: "#f3f3f3",
        justifyContent: "space-between",
      })}
    >
      <div>
        <h1 className={css({ color: "#555", fontWeight: 700 })}>
          Presto/Duties
        </h1>
        <div className={css({ display: "flex", gap: "10px" })}>
          <Button>Welcome</Button>
          <Button isDisabled>Welcome</Button>
          <PrinterSettings />
        </div>
      </div>
      <PopoverMenu menuItem={<MenuItems />}>
        <Button
          className={css({
            display: "flex",
            gap: "10px",
            alignItems: "center",
            background: "#f4f4f4",
            padding: "5px 15px",
            borderRadius: "5px",
            textAlign: "left",
            transition: "background 0.2s",
            _hover: {
              background: "#eee",
            },
          })}
        >
          <IconUserSquareRounded size={30} />
          <IconTriangleInvertedFilled size={10} />
        </Button>
      </PopoverMenu>
    </div>
  );
};

const MenuItems: React.FC = () => {
  const [userData, setUserData] = useState<string>("");
  const [token, setToken] = useAtom(authTokenAtom);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await userId(token.token);
        setUserData(data.data?.login || "");
      } catch (error) {
        console.error(error);
        setUserData("");
      }
    };
    if (token.token) {
      fetchUserData();
    }
  }, [token.token]);

  const logout = () => {
    setToken({ token: "", loading: false });
    window.location.href = "/";
  };

  return (
    <div>
      <a href="/users">
        <MenuItem>
          User: <br />
          {userData}
        </MenuItem>
      </a>
      <MenuItem onClick={logout}>Logout</MenuItem>
    </div>
  );
};
