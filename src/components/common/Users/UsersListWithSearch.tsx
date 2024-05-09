import * as AccountService from "@/services/account/accountService";
import { Box, Button, Checkbox } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import UserListItem from "./UserItem";
import { ArrowBack, Add } from "@mui/icons-material";

interface IUsersListWithSearchProps {
  onSelect: (user: AccountService.IUser, type?: "private") => void;
  isCreateGroup?: boolean;
  search?: string;
  onSubmit?: (selectedUsers: AccountService.IUser[]) => void;
}
const UsersListWithSearch = ({
  onSelect,
  isCreateGroup,
  search = "",
  onSubmit,
}: IUsersListWithSearchProps) => {
  const [users, setUsers] = useState<AccountService.IUser[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<AccountService.IUser[]>(
    [],
  );
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState<number | null>(null);
  const getUsers = useCallback(async () => {
    try {
      const { data, nextPage } = (
        await AccountService.getUsers({
          page,
          limit: 10,
          search,
        })
      ).data;

      if (data) {
        if (search) {
          console.log({ data });
          setUsers([...data]);
        } else {
          setUsers([...users, ...data]);
        }
      }

      setNextPage(nextPage || null);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, [page, search, setUsers]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <Box className="flex flex-col relative w-full">
      {isCreateGroup && selectedUsers.length > 0 && (
        <Button onClick={() => onSubmit?.(selectedUsers)} size="small">
          <Add /> Create Group ({selectedUsers.length})
        </Button>
      )}
      <Box className="flex flex-col mt-4">
        {users?.map((user) => (
          <div
            key={user._id}
            onClick={() => !isCreateGroup && onSelect(user, "private")}
            className="cursor-pointer flex items-center justify-between p-2 hover:bg-gray-100"
          >
            <UserListItem user={user} />
            {isCreateGroup && (
              <Checkbox
                onChange={(e) => {
                  //e.preventDefault();
                  e.stopPropagation();
                  if (e.target.checked) {
                    setSelectedUsers([...selectedUsers, user]);
                  } else {
                    setSelectedUsers(selectedUsers.filter((u) => u !== user));
                  }
                }}
                checked={selectedUsers.some((u) => u._id === user._id)}
              />
            )}
          </div>
        ))}
        {nextPage && (
          <Button
            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={() => setPage(page + 1)}
            size="small"
          >
            Load More
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default UsersListWithSearch;
