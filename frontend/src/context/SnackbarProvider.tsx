import {
  useCallback,
  useState,
} from "react";
import type { PropsWithChildren } from "react";

import { AppSnackbar } from "../components/AppSnackbar";
import {
  SnackbarContext,
  type SnackbarSeverity,
} from "./SnackbarContext";

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

  return (
    <SnackbarContext.Provider
      value={{ showSnackbar }}
    >
      {children}

      <AppSnackbar
        open={open}
        message={message}
        severity={severity}
        onClose={() => setOpen(false)}
      />
    </SnackbarContext.Provider>
  );
};