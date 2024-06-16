"use client";
import { useEffect, useState } from "react";

import ChatItem from "./ChatItem";
import ChatSearch from "./ChatSearch";
import ChatListHeader from "./ChatListHeader";
import { useChat } from "@/context/ChatProvider";

// write chatSearch compoet

const ChatList = () => {
  const {
    activeChatId,
    setActiveChatId,
    setActiveChat,
    chats,
    setChats,
    getChatList,
  } = useChat();

  useEffect(() => {
    if (activeChatId) {
      const chat = chats.find((chat) => chat._id === activeChatId);
      if (chat) {
        setActiveChat(chat);
      }
    }
  }, [activeChatId, chats, setActiveChat]);

  useEffect(() => {
    getChatList();
  }, []);

  return (
    <div className="chat-list h-[70%]">
      <ChatListHeader />
      <ChatSearch onSearch={setChats} />
      <div className="flex lg:flex-col overflow-auto h-full">
        {chats.map((chat) => (
          <ChatItem
            key={chat._id}
            chat={chat}
            activeChat={activeChatId}
            setActiveChatId={setActiveChatId}
            setActiveChat={setActiveChat}
          />
        ))}
      </div>
    </div>
  );
};
export default ChatList;
