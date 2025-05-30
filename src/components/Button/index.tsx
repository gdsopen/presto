import clsx from "clsx";
import { type ButtonProps, Button as RacButton } from "react-aria-components";
import { css } from "../../../styled-system/css";

export const Button: React.FC<
  {
    children: React.ReactNode;
  } & ButtonProps
> = ({ children, ...misc }) => {
  return (
    <RacButton
      className={clsx(
        css({
          background: misc.isDisabled ? "#ccc" : "#60abe0",
          color: "#fff",
          padding: "5px 10px",
          border: "none",
          borderRadius: "5px",
          cursor: misc.isDisabled ? "cursor" : "pointer",
          transition: "background 0.2s",
          _hover: {
            background: misc.isDisabled ? "" : "#4a90e2",
          },
        }),
        misc.className,
      )}
      type="button"
      {...misc}
    >
      {children}
    </RacButton>
  );
};
