"use client";
import React, { useState } from "react";

interface IChatProviderProps {
  children: React.ReactNode;
}
interface IChatContextProps {
  activeChatId: string | null;
  setActiveChatId: React.Dispatch<React.SetStateAction<string | null>>;
}
const ChatContext = React.createContext<IChatContextProps | null>(null);
export const ChatProvider = ({ children }: IChatProviderProps) => {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  return (
    <ChatContext.Provider
      value={{
        activeChatId,
        setActiveChatId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = React.useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }

  return context;
};
