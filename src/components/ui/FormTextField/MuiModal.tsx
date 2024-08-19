"use client";
import { Modal as MuiModal, Drawer, DrawerProps } from "@mui/material";
import { Children, useState } from "react";

export const useModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return { open, handleClose, handleOpen };
};

const MuiDrawer = (props: DrawerProps) => {
  return (
    <Drawer {...props} anchor={props.anchor ? props.anchor : "top"}>
      {props.children}
    </Drawer>
  );
};
export default MuiDrawer;
