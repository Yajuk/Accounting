"use client";
import { Chat, chatList } from "@/services/chat/chatService";
import { logOut } from "@/utils/localStorage";
import { useEffect, useState } from "react";
import { ErrorResponse } from "@/utils/error/types";
import { formatTimestamp } from "@/utils/date";
import ChatItem from "./ChatItem";
import ChatSearch from "./ChatSearch";

// write chatSearch compoet

const ChatList = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  useEffect(() => {
    const getChatList = async () => {
      try {
        const response = await chatList();
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
    try {
      getChatList();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="chat-list">
      <ChatSearch onSearch={setChats} />
      <div className="flex lg:flex-col overflow-auto">
        {chats.map((chat) => (
          <ChatItem
            key={chat._id}
            chat={chat}
            activeChat={activeChat}
            setActiveChat={setActiveChat}
          />
        ))}
      </div>
    </div>
  );
};
export default ChatList;
