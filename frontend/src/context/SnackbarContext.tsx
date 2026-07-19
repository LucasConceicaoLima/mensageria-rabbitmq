import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import type { PropsWithChildren } from "react";

import { AppSnackbar } from "../components/AppSnackbar";

type SnackbarSeverity =
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

const SnackbarContext =
  createContext<SnackbarContextData>(
    {} as SnackbarContextData,
  );

export const SnackbarContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] =
    useState<SnackbarSeverity>("success");

  const showSnackbar = useCallback(
    (
      message: string,
      severity: SnackbarSeverity = "success",
    ) => {
      setOpen(false);

      setTimeout(() => {
        setMessage(message);
        setSeverity(severity);
        setOpen(true);
      }, 50);
    },
    [],
  );

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider
      value={{ showSnackbar }}
    >
      {children}

      <AppSnackbar
        open={open}
        message={message}
        severity={severity}
        onClose={handleClose}
      />
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () =>
  useContext(SnackbarContext);