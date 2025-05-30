import { useAtom } from "jotai/react";
import {
  Select as BaseSelect,
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  type SelectProps,
  SelectValue,
} from "react-aria-components";
import { css } from "../../../styled-system/css";
import { type Printer, printerAtom } from "../../lib/Atoms";

export const SelectPrinter: React.FC<{
  label?: string;
  items: Array<Printer & { disabled?: boolean }>;
  props?: SelectProps;
}> = ({ label, items, ...props }) => {
  const [printer, setPrinter] = useAtom(printerAtom);
  return (
    <BaseSelect
      disabledKeys={items
        .filter((item) => item.disabled)
        .map((item) => `${item.vendor_id}:${item.device_id}`)}
      selectedKey={printer ? `${printer.vendor_id}:${printer.device_id}` : null}
      onSelectionChange={(item) =>
        setPrinter(
          items.filter((i) => `${i.vendor_id}:${i.device_id}` === item)[0],
        )
      }
      {...props}
    >
      {label && <Label>{label}</Label>}
      <Button
        className={css({
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          background: "#fff",
          color: "#000",
          cursor: "pointer",
          transition: "border-color 0.2s",
          "&:focus": {
            outline: "none",
            borderColor: "#60abe0",
          },
          "&:hover": {
            borderColor: "#60abe0",
          },
        })}
      >
        <SelectValue />
        <span aria-hidden="true">▼</span>
      </Button>
      <Popover
        className={css({
          position: "absolute",
          zIndex: 1,
          background: "#fff",
          border: "1px solid #ccc",
          borderRadius: "5px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          padding: "10px 0",
          transition: "transform 200ms, opacity 200ms",
          overflowY: "auto",
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
        <ListBox>
          {items.map((item) => (
            <ListBoxItem
              key={`${item.vendor_id}:${item.device_id}`}
              id={`${item.vendor_id}:${item.device_id}`}
              value={item}
              className={css({
                padding: "0 10px",
                transition: "background 0.2s",
                color: item.disabled ? "#ccc" : "inherit",
                _hover: {
                  background: "#f4f4f4",
                },
              })}
            >
              {item.name}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </BaseSelect>
  );
};
