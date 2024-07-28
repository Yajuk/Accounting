// CustomSnackbar.tsx

import React, { useCallback, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

export type severity = "success" | "error" | "warning" | "info";

interface CustomSnackbarProps {
  message: string;
  severity?: severity;
  open: boolean;
  onClose?: () => void;
  autoHideDuration?: number;
  action?: React.ReactNode;
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  message,
  severity = "info",
  open,
  onClose,
  autoHideDuration = 3000,
  action,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      action={action}
    >
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
};

export const useSnackBar = () => {
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setMessage] = useState("");
  const [severity, setSeverity] = useState<severity>("success");

  const handleClose = useCallback(() => {
    snackbarMessage !== "" && setMessage("");
    setSeverity("success");
    setOpen(false);
  }, []);

  const openSnackbar = (message: string, severity: severity) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  return {
    severity,
    snackbarMessage,
    open,
    handleClose,
    openSnackbar,
  };
};

export default CustomSnackbar;
