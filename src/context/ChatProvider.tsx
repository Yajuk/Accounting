"use client";
import { Chat, chatList } from "@/services/chat/chatService";
import React, { useEffect, useState } from "react";
import { SocketProvider } from "./socketContext";
import { logOut } from "@/utils/localStorage";
import { ErrorResponse } from "@/utils/error/types";
import { formatTimestamp } from "@/utils/date";
import { useAccount } from "./accountProvider";
import { useRouter } from "next/navigation";
interface IChatProviderProps {
  children: React.ReactNode;
}
interface IChatContextProps {
  activeChatId: string | null;
  setActiveChatId: React.Dispatch<React.SetStateAction<string | null>>;
  activeChat: Chat | null;
  setActiveChat: React.Dispatch<React.SetStateAction<Chat | null>>;
  chats: Chat[];
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
  getChatList: () => Promise<void>;
}
const ChatContext = React.createContext<IChatContextProps | null>(null);
export const ChatProvider = ({ children }: IChatProviderProps) => {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const { loggedInUserId } = useAccount();
  const router = useRouter();
  const getChatList = async () => {
    try {
      const response = await chatList({
        limit: 500,
      });
      setChats(response.data.data);
    } catch (error: unknown) {
      console.log(error);
      const errorResponse = error as ErrorResponse;
      if (Array.isArray(errorResponse?.errors)) {
        console.log(errorResponse?.errors[0].message);
      } else if (
        errorResponse?.errors?.message &&
        errorResponse?.errors?.message === "TokenExpiredError: jwt expired"
      ) {
        console.log(errorResponse?.errors?.message);
        logOut();
      }
    }
  };
  useEffect(() => {
    if (!loggedInUserId) {
      router.push("/login");
    }
    try {
      getChatList();
    } catch (error) {
      console.log(error);
    }
  }, [loggedInUserId]);
  return (
    <SocketProvider>
      <ChatContext.Provider
        value={{
          activeChatId,
          setActiveChatId,
          activeChat,
          setActiveChat,
          chats,
          setChats,
          getChatList,
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
