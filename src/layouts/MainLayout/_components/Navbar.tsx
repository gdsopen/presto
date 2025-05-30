import {
  IconTriangleInvertedFilled,
  IconUserSquareRounded,
} from "@tabler/icons-react";
import { css } from "../../../../styled-system/css";
import { Button } from "../../../components/Button";
import { MenuItem, PopoverMenu } from "../../../components/PopoverMenu";
import { PrinterSettings } from "../../../components/PrinterSettings";

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
        <h1 className={css({ color: "#60abe0", fontWeight: 700 })}>
          Aeromate 業務メニュー
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
          <IconTriangleInvertedFilled size={10} />
          <IconUserSquareRounded size={30} />
          <p>
            Allial
            <br />
            HND3-INTL
          </p>
        </Button>
      </PopoverMenu>
    </div>
  );
};

const MenuItems: React.FC = () => {
  return (
    <div>
      <MenuItem>ログアウト</MenuItem>
    </div>
  );
};
