// CustomSnackbar.tsx

import React from "react";
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

export default CustomSnackbar;
