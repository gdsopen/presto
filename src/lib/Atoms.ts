import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type Printer = {
  name: string;
  vendor_id: number;
  device_id: number;
};

export const printerAtom = atomWithStorage<Printer>("selectedPrinter", {
  name: "",
  vendor_id: 0,
  device_id: 0,
});

export type AuthToken = {
  token: string;
  loading: boolean;
};

export const authTokenAtom = atom<AuthToken>({
  token: "",
  loading: false,
});

export type UserData = {
  login: string;
  name: string;
  role: string;
  terminal: string;
};

export const userDataAtom = atom<UserData | null>(null);
