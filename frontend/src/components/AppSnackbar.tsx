import {
  Alert,
  Snackbar,
} from "@mui/material";

export interface AppSnackbarProps {
  open: boolean;
  message: string;
  severity:
    | "success"
    | "error"
    | "warning"
    | "info";
  onClose: () => void;
}

export const AppSnackbar = ({
  open,
  message,
  severity,
  onClose,
}: AppSnackbarProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      onClose={onClose}
    >
      <Alert
        severity={severity}
        variant="filled"
        onClose={onClose}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};