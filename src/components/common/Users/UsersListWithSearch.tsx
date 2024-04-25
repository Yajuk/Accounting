import * as AccountService from "@/services/account/accountService";
import { Box, Button } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import UserListItem from "./UserItem";
import { set } from "react-hook-form";

interface IUsersListWithSearchProps {
  onSelect: (user: AccountService.IUser) => void;
}
const UsersListWithSearch = ({ onSelect }: IUsersListWithSearchProps) => {
  const [users, setUsers] = useState<AccountService.IUser[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
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
      <Box className="flex flex-col bg-gray-200 shadow-sm rounded-sm p-2 items-center justify-between">
        <input
          placeholder="Search User"
          className="p-2 w-full border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>
      <Box className="flex flex-col mt-4">
        {users?.map((user) => (
          <div
            key={user._id}
            onClick={() => onSelect(user)}
            className="cursor-pointer"
          >
            <UserListItem user={user} />
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
