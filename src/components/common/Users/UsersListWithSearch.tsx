import * as AccountService from "@/services/account/accountService";
import { Box, Button, Checkbox } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import UserListItem from "./UserItem";
import { set } from "react-hook-form";
import { ArrowBack } from "@mui/icons-material";

interface IUsersListWithSearchProps {
  onSelect: (user: AccountService.IUser) => void;
}
const UsersListWithSearch = ({ onSelect }: IUsersListWithSearchProps) => {
  const [users, setUsers] = useState<AccountService.IUser[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<AccountService.IUser[]>(
    [],
  );
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isCreateGroup, setIsCreateGroup] = useState(false);
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
    <Box className="p-4 flex flex-col relative w-full">
      {isCreateGroup && (
        <Box className="flex items-center h-6 mb-4">
          <ArrowBack
            onClick={() => setIsCreateGroup(false)}
            className="cursor-pointer"
          />
        </Box>
      )}
      <Box className="flex flex-col bg-gray-200 shadow-sm rounded-sm p-2 items-center justify-between">
        <input
          placeholder="Search User"
          className="p-2 w-full border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>
      <Box className="flex flex-col">
        <Button
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
          onClick={() => setIsCreateGroup(true)}
          size="small"
        >
          Create Group {selectedUsers.length > 0 && `(${selectedUsers.length})`}
        </Button>
        {selectedUsers.length > 0 && (
          <>
            <Button
              className="mt-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded w-full"
              onClick={() => setSelectedUsers([])}
              size="small"
            >
              Clear
            </Button>

            <Button className="mt-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded w-full">
              Submit
            </Button>
          </>
        )}
      </Box>

      <Box className="flex flex-col mt-4">
        {users?.map((user) => (
          <div
            key={user._id}
            onClick={() => !isCreateGroup && onSelect(user)}
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
