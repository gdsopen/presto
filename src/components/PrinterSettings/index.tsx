import { invoke } from "@tauri-apps/api/core";
import { useAtom } from "jotai/react";
import { useEffect, useState } from "react";
import { css } from "../../../styled-system/css";
import { type Printer, printerAtom } from "../../lib/Atoms";
import { Button } from "../Button";
import { Modal } from "../Modal";
import { SelectPrinter } from "../PrinterSelect";

export const PrinterSettings: React.FC = () => {
  const [detectedDevices, setDevices] = useState<Array<Printer>>([]);
  const [selectedPrinter, _setSelectedPrinter] = useAtom(printerAtom);
  useEffect(() => {
    invoke("get_usb_devices").then((devices) => {
      setDevices(devices as Printer[]);
    });
  }, []);

  return (
    <Modal buttonText="Printer Settings">
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        })}
      >
        <h1
          className={css({
            fontSize: "1.5rem",
            fontWeight: 700,
          })}
        >
          Printer Settings
        </h1>
        <SelectPrinter items={[...detectedDevices]} label="Select Printer" />
        <Button
          onPress={async () => {
            console.log(selectedPrinter);
            invoke("test", {
              vendorId: selectedPrinter.vendor_id,
              deviceId: selectedPrinter.device_id,
            });
          }}
        >
          Invoke Print Test
        </Button>
      </div>
    </Modal>
  );
};
