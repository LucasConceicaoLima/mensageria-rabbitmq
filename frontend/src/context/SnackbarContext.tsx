import { createContext } from "react";

export type SnackbarSeverity =
  | "success"
  | "error"
  | "warning"
  | "info";

interface SnackbarContextData {
  showSnackbar: (
    message: string,
    severity?: SnackbarSeverity,
  ) => void;
}

export const SnackbarContext =
  createContext<SnackbarContextData>(
    {} as SnackbarContextData,
  );