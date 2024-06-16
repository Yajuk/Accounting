import * as React from "react";
import { Chat } from "@/services/chat/chatService";
import { formatTimestamp } from "@/utils/date";
import Link from "next/link";
import {
  Group,
  AccountCircle,
  Person,
  MoreVertOutlined,
} from "@mui/icons-material";
import { UserDocument } from "../../../../../backend/src/models/v1/User/userModel";
import { useAccount } from "@/context/accountProvider";
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
  const loggedInUserId = useAccount().loggedInUserId;
  console.log(chat);

  const getChatName = React.useMemo(() => {
    if (chat.type === "group") {
      return chat.name;
    }

    if (chat.type === "private") {
      let participant = chat.participants.find(
        (participant) =>
          typeof participant !== "string" &&
          participant?._id !== loggedInUserId,
      ) as UserDocument | undefined;
      return participant &&
        typeof participant === "object" &&
        "name" in participant
        ? participant.name
        : "";
    }
    return "";
  }, [chat.type, chat.name, chat.participants]);

  return (
    <div
      className={`flex cursor-pointer focus:bg-gray-100 items-center justify-between border lg:border-0 lg:m-0  m-2 rounded-sm lg:rounded-none  lg:border-b border-gray-200 py-4 ${isActive ? "bg-gray-100" : ""}`}
    >
      <Link
        href={`/chat/${chat._id}`}
        onClick={() => {
          setActiveChatId(chat._id);
          setActiveChat(chat);
        }}
      >
        <div className="flex items-center p-4 lg:p-1">
          <div className="w-12 h-12 bg-gray-300 flex items-center justify-center rounded-full  mr-4">
            <AccountCircle className="text-sm lg:text-3xl" />
          </div>
          <div>
            <h2 className="lg:font-bold text-sm lg:text-md text-ellipsis">
              {getChatName}
            </h2>
            <p className="text-sm hidden lg:block text-gray-500 text-ellipsis">
              {formatTimestamp(chat.updatedAt)}
              <span className="text-xs text-gray-500">({chat.type})</span>
            </p>
            <div className="lg:flex hidden items-center">
              <p className="mr-1 text-sm">{chat.participants.length}</p>
              {chat.type === "group" ? <Group /> : <Person />}
            </div>
          </div>
        </div>
      </Link>
      <div
        onClick={(e) => e.stopPropagation()}
        className="p-4 lg:p-1 cursor-pointer"
      >
        <MoreVertOutlined />
      </div>
    </div>
  );
};

export default ChatItem;
