import React from "react";

const Message = ({
  message,
  isSender,
}: {
  message: any;
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
        <img
          src={message.senderAvatar}
          alt={message.sender}
          className="w-10 h-10 rounded-full mr-4"
        />
      )}
      <div className={`bg-white p-4 rounded-lg max-w-md ${containerClass}`}>
        <p
          className={`text-sm ${bubbleClass} w-full overflow-hidden break-words p-2 rounded-lg`}
          style={{ maxHeight: "200px" }}
        >
          {message.text}
        </p>
      </div>
    </div>
  );
};

export default Message;
