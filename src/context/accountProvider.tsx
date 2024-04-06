// Add React import
"use client";
import { getUserAccount } from "@/utils/localStorage";
import React, { useState } from "react";

interface IAccountProviderProps {
  children: React.ReactNode;
}

// Remove ReturnType usage
interface AccountContextProps {
  account: null | undefined;
  setAccount: React.Dispatch<React.SetStateAction<null | undefined>>;
}

const AccountContext = React.createContext<AccountContextProps | null>(null);

export const AccountProvider = ({ children }: IAccountProviderProps) => {
  const userAccount = getUserAccount();
  const [account, setAccount] = useState<null | undefined>(
    userAccount || undefined,
  );

  return (
    <AccountContext.Provider
      value={{
        account,
        setAccount,
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
