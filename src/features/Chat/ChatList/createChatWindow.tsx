import UsersListWithSearch from "@/components/common/Users/UsersListWithSearch";
import { IUser } from "@/services/account/accountService";
import * as ChatService from "@/services/chat/chatService";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Switch,
  TextField,
} from "@mui/material";
import createTypography from "@mui/material/styles/createTypography";
import React from "react";

const CreateChatWindow = () => {
  const [search, setSearch] = React.useState("");
  const [isGroupChat, setIsGroupChat] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [selectedUsers, setSelectedUsers] = React.useState<IUser[]>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsGroupChat(event.target.checked);
  };
  const createPrivateChat = async (user: IUser, type?: "private") => {
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

  const onCreateGroupChat = async (users: IUser[], name: string) => {
    try {
      const res = await ChatService.createChat({
        name: name,
        participants: users.map((user) => user._id),
        type: "group",
      });
      if (res.data) {
        window.location.href = `/chat/${res.data._id}`;
      } else {
        console.error("Error creating group chat:", res);
      }
    } catch (error) {
      console.error("Error creating group chat:", error);
    }
  };

  const onsubmit = (users: IUser[]) => {
    setSelectedUsers(users);
    handleClickOpen();
  };
  return (
    <Box>
      <Box className="p-4">
        <input
          className="border border-gray-300 rounded-md px-3 py-2  w-full"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
        />
        <Switch
          checked={isGroupChat}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
      </Box>

      <Box className="ps-4">Users</Box>
      <UsersListWithSearch
        isCreateGroup={isGroupChat}
        onSelect={createPrivateChat}
        search={search}
        onSubmit={onsubmit}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const name = formJson.name;
            if (selectedUsers.length > 0 && name) {
              debugger;
              onCreateGroupChat(selectedUsers, name);
            }
          },
        }}
      >
        <DialogTitle>Chat Name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Chat Name"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()} size="small">
            Cancel
          </Button>
          <Button type="submit" size="small">
            Create Group
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CreateChatWindow;
