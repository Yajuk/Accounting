// Add React import
"use client";
import { getUserAccount } from "@/utils/localStorage";
import React, { useMemo, useState } from "react";

interface IAccountProviderProps {
  children: React.ReactNode;
}

interface accountInterface {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

// Remove ReturnType usage
interface AccountContextProps {
  account: null | undefined | accountInterface;
  loggedInUserId: string | undefined;
  setAccount: React.Dispatch<React.SetStateAction<null | undefined>>;
}

const AccountContext = React.createContext<AccountContextProps | null>(null);

export const AccountProvider = ({ children }: IAccountProviderProps) => {
  const userAccount = getUserAccount();
  const [account, setAccount] = useState<null | undefined>(
    userAccount || undefined,
  );
  const loggedInUserId = useMemo(() => {
    return userAccount?._id;
  }, [userAccount?._id]);

  return (
    <AccountContext.Provider
      value={{
        account,
        setAccount,
        loggedInUserId,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = React.useContext(AccountContext);
  if (!context) {
    throw new Error("useAccount must be used within a AccountProvider");
  }

  return context;
};
