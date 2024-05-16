"use client";
import { Chat } from "@/services/chat/chatService";
import React, { useState } from "react";
import { SocketProvider } from "./socketContext";

interface IChatProviderProps {
  children: React.ReactNode;
}
interface IChatContextProps {
  activeChatId: string | null;
  setActiveChatId: React.Dispatch<React.SetStateAction<string | null>>;
  activeChat: Chat | null;
  setActiveChat: React.Dispatch<React.SetStateAction<Chat | null>>;
}
const ChatContext = React.createContext<IChatContextProps | null>(null);
export const ChatProvider = ({ children }: IChatProviderProps) => {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);

  return (
    <SocketProvider>
      <ChatContext.Provider
        value={{
          activeChatId,
          setActiveChatId,
          activeChat,
          setActiveChat,
        }}
      >
        {children}
      </ChatContext.Provider>
    </SocketProvider>
  );
};

export const useChat = () => {
  const context = React.useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }

  return context;
};
