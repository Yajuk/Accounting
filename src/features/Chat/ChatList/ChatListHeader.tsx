"use client";
import { Add } from "@mui/icons-material";
import UsersListWithSearch from "@/components/common/Users/UsersListWithSearch";
import React from "react";
import { Box, Popover } from "@mui/material";
import { IUser } from "@/services/account/accountService";
import * as ChatService from "@/services/chat/chatService";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
const ChatListHeader = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const onSelectUser = async (user: IUser) => {
    try {
      const res = await ChatService.createChat({
        name: user.name,
        participants: [user._id],
        type: "private",
      });

      if (res.data) {
        window.location.href = `/chat/${res.data._id}`;
      }
    } catch (error) {
      console.error("Error selecting user:", error);
    }
  };
  return (
    <div className="flex items-center justify-between h-12 bg-white rounded-sm px-3">
      <span>Chat List</span>
      <button className="ml-4 cursor-pointer" onClick={handleClick}>
        <Add />
      </button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{
          height: "50%",
        }}
      >
        <Box>
          <UsersListWithSearch onSelect={onSelectUser} />
        </Box>
      </Popover>
    </div>
  );
};

export default ChatListHeader;
