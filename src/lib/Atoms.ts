import { atomWithStorage } from "jotai/utils";

export type Printer = {
  name: string;
  vendor_id: number;
  device_id: number;
};

export const printerAtom = atomWithStorage("selectedPrinter", {
  name: "",
  vendor_id: 0,
  device_id: 0,
} as Printer);
