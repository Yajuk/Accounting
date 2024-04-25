import * as AccountService from "@/services/account/accountService";
import { Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Import AccountCircleIcon from Material-UI Icons
import EmailIcon from "@mui/icons-material/Email"; // Import EmailIcon from Material-UI Icons

interface IProps {
  user: AccountService.IUser;
}

const UserListItem = ({ user }: IProps) => {
  return (
    <Box className="flex border-b border-gray-100 shadow-sm rounded-sm p-2 items-center justify-between">
      <div className="flex items-center space-x-4">
        {/* Render AccountCircleIcon instead of Avatar */}
        <AccountCircleIcon sx={{ fontSize: 40 }} />

        <div>
          <h1>{user.name}</h1>
          <div className="flex items-center space-x-1">
            {/* Render EmailIcon */}
            <EmailIcon sx={{ fontSize: 20, color: "gray" }} />
            <p>{user.email}</p>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default UserListItem;
