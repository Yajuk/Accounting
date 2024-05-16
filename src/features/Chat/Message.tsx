import AccountCircle from "@mui/icons-material/AccountCircle";
import React from "react";
import * as messageService from "@/services/chat/messageService";
import { formatTime, formatTimestamp } from "@/utils/date";

const Message = ({
  message,
  isSender,
}: {
  message: messageService.Message;
  isSender: boolean;
}) => {
  const messageClass = isSender
    ? "flex justify-end mb-4"
    : "flex justify-start mb-4";
  const bubbleClass = isSender
    ? "bg-blue-500 text-white"
    : "bg-gray-200 text-gray-800";
  const containerClass = isSender ? "ml-auto" : "mr-auto";

  return (
    <div className={messageClass}>
      {!isSender && (
        // <img
        //   src={message.senderAvatar}
        //   alt={message.sender}
        //   className="w-10 h-10 rounded-full mr-4"
        // />
        <div className="w-12 h-12 bg-gray-300 flex items-center justify-center rounded-full  mr-4">
          <AccountCircle className="text-sm lg:text-3xl" />
        </div>
      )}
      <div className={`bg-white p-2 rounded-lg max-w-md ${containerClass}`}>
        {!isSender && (
          <p className="text-xs text-gray-500 pb-1">{message.sender.name}</p>
        )}
        <p
          className={`text-sm ${bubbleClass} w-full overflow-hidden break-words p-2 rounded-lg`}
          style={{ maxHeight: "200px" }}
        >
          {message.content}
        </p>
        <p className="text-xs w-full text-gray-500 pt-1 lowercase text-right">
          {message.createdAt && formatTime(new Date(message.createdAt))}
        </p>
      </div>
    </div>
  );
};

export default Message;
