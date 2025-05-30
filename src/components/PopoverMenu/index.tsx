import type React from "react";
import {
  type ButtonProps,
  Dialog,
  DialogTrigger,
  Button as MenuButton,
  OverlayArrow,
  Popover,
} from "react-aria-components";
import { css } from "../../../styled-system/css";

export const PopoverMenu: React.FC<{
  children: React.ReactNode;
  menuItem: React.ReactNode;
}> = ({ menuItem, children }) => {
  return (
    <DialogTrigger>
      <MenuButton>{children}</MenuButton>
      <Popover
        className={css({
          "--background-color": "#fff",
          border: "1px solid #000",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          borderRadius: "6px",
          background: "#fff",
          outline: "none",
          transition: "transform 200ms, opacity 200ms",
          "&[data-entering]": {
            transform: "scale(0.9)",
            opacity: 0,
          },
          "&[data-exiting]": {
            transform: "scale(0.9)",
            opacity: 0,
          },
        })}
      >
        <OverlayArrow>
          <svg
            width={12}
            height={12}
            viewBox="0 0 12 12"
            className={css({
              transform: "rotate(180deg)",
              fill: "#fff",
              stroke: "#000",
            })}
          >
            <title>Arrow</title>
            <path d="M0 0 L6 6 L12 0" />
          </svg>
        </OverlayArrow>
        <Dialog
          className={css({
            padding: "10px 0",
            borderRadius: "6px",
            outline: "none",
          })}
        >
          {menuItem}
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
};

export const MenuItem: React.FC<
  {
    children: React.ReactNode;
  } & ButtonProps
> = ({ children, ...ButtonProps }) => {
  return (
    <MenuButton
      className={css({
        display: "block",
        width: "100%",
        padding: "10px 20px",
        textAlign: "left",
        border: "none",
        background: "none",
        cursor: "pointer",
        "&:hover": {
          background: "#f0f0f0",
        },
      })}
      {...ButtonProps}
    >
      {children}
    </MenuButton>
  );
};
