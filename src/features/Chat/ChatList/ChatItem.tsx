import * as React from "react";
import { Chat } from "@/services/chat/chatService";
import { formatTimestamp } from "@/utils/date";
import Link from "next/link";
import { Group, AccountCircle, Person } from "@mui/icons-material";

interface Props {
  chat: Chat;
  setActiveChatId: React.Dispatch<React.SetStateAction<string | null>>;
  setActiveChat: React.Dispatch<React.SetStateAction<Chat | null>>;
  activeChat: string | null;
}

const ChatItem: React.FC<Props> = ({
  chat,
  setActiveChatId,
  activeChat,
  setActiveChat,
}) => {
  const isActive = chat._id === activeChat;
  return (
    <Link
      href={`/chat/${chat._id}`}
      onClick={() => {
        setActiveChatId(chat._id);
        setActiveChat(chat);
      }}
    >
      <div
        className={`flex cursor-pointer focus:bg-gray-100 items-center justify-between border lg:border-0 lg:m-0  m-2 rounded-sm lg:rounded-none  lg:border-b border-gray-200 py-4 ${isActive ? "bg-gray-100" : ""}`}
      >
        <div className="flex items-center p-4 lg:p-1">
          <div className="w-12 h-12 bg-gray-300 flex items-center justify-center rounded-full  mr-4">
            <AccountCircle fontSize="large" />
          </div>
          <div>
            <h2 className="lg:font-bold text-sm lg:text-lg">
              {chat.name}{" "}
              <span className="text-xs text-gray-500">({chat.type})</span>
            </h2>
            <p className="text-sm hidden lg:block text-gray-500">
              {formatTimestamp(chat.updatedAt)}
            </p>
          </div>
        </div>
        <div className="lg:flex hidden items-center">
          <p className="mr-4 text-sm">{chat.participants.length}</p>
          {chat.type === "group" ? <Group /> : <Person />}
        </div>
      </div>
    </Link>
  );
};

export default ChatItem;
