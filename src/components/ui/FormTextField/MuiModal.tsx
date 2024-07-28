"use client";
import { Modal as MuiModal } from "@mui/material";
import { useState } from "react";

export const useModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return { open, handleClose, handleOpen };
};

export default MuiModal;
