import { IconX } from "@tabler/icons-react";
import type { ReactElement } from "react";
import {
  Dialog,
  DialogTrigger,
  ModalOverlay,
  Modal as RacModal,
} from "react-aria-components";
import { css } from "../../../styled-system/css";
import { Button } from "../Button";

type Props = {
  children: ReactElement;
  defaultOpen?: boolean;
  buttonText?: string;
  noButton?: boolean;
};

export const Modal: React.FC<Props> = (props) => {
  return (
    <DialogTrigger defaultOpen={props.defaultOpen}>
      {!props.noButton && <Button>{props.buttonText}</Button>}
      <ModalOverlay
        isDismissable
        className={css({
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          "&[data-entering]": {
            animation: "fadeIn 80ms ease-in",
          },
          "&[data-exiting]": {
            animation: "fadeIn 80ms reverse ease-in",
          },
        })}
      >
        <RacModal>
          <Dialog
            className={css({
              padding: "20",
              backgroundColor: "white",
              borderRadius: "10",
              width: "400",
              margin: "10px",
              outline: "none",
              cursor: "default",
              lg: {
                minWidth: "600",
              },
            })}
          >
            <Controller />
            {props.children}
          </Dialog>
        </RacModal>
      </ModalOverlay>
    </DialogTrigger>
  );
};

const Controller: React.FC = () => {
  return (
    <div
      className={css({
        display: "flex",
        justifyContent: "flex-end",
        padding: "0",
        width: "100%",
      })}
    >
      <Button slot="close" className={css({ cursor: "pointer" })}>
        <IconX />
      </Button>
    </div>
  );
};
