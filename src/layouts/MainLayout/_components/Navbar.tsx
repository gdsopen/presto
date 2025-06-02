"use client";
import {
  IconTriangleInvertedFilled,
  IconUserSquareRounded,
} from "@tabler/icons-react";
import { useAtom } from "jotai";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { css } from "../../../../styled-system/css";
import { userId } from "../../../api/client";
import { Button } from "../../../components/Button";
import { MenuItem, PopoverMenu } from "../../../components/PopoverMenu";
import { PrinterSettings } from "../../../components/PrinterSettings";
import { authTokenAtom } from "../../../lib/Atoms";

export const Navbar: React.FC = () => {
  const contents: React.ReactNode[] = [
    <a key="home" href="/home">
      <Button>Home</Button>
    </a>,
    <Button key="welcome" isDisabled>
      Welcome
    </Button>,
    <PrinterSettings key="printer-settings" />,
  ];

  return (
    <div
      className={css({
        padding: "20px 10px",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        background: "#f5f5f5",
        justifyContent: "space-between",
      })}
    >
      <div>
        <h1 className={css({ color: "#555", fontWeight: 700 })}>
          Presto/Duties
        </h1>
        <div className={css({ display: "flex", gap: "10px" })}>
          {contents.map((content) => content)}
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
              background: "#fff6db",
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
        setUserData(data.data?.name || "");
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
    Cookies.remove("admin_token");
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
