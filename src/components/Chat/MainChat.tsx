"use client";

import { useEffect, useState } from "react";

interface IMessage {
  sender: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
}
const MainChat = ({ chatId }: { chatId: string }) => {
  const [messages, setMessages] = useState<IMessage[]>([
    {
      sender: "John",
      senderAvatar: "https://via.placeholder.com/50",
      text: "Hello, how are you?",
      timestamp: "2022-01-01T00:00:00.000Z",
    },
    {
      sender: "Jane",
      senderAvatar: "https://via.placeholder.com/50",
      text: "I'm doing well, thank you!",
      timestamp: "2022-01-01T00:00:00.000Z",
    },
  ]);
  useEffect(() => {
    console.log(chatId);
  }, [chatId]);
  return (
    <div
      id="chat-container"
      className="h-full w-full overflow-y-auto bg-gray-100 p-4 relative"
    >
      {messages.map((message, index) => (
        <div key={index} className="flex mb-4">
          <img
            src={message.senderAvatar}
            alt={message.sender}
            className="w-10 h-10 rounded-full mr-4"
          />
          <div className="bg-white p-4 rounded-lg max-w-md">
            <p className="text-gray-800">{message.text}</p>
          </div>
        </div>
      ))}

      <div className="flex justify-center absolute bottom-16 left-0 right-0">
        <input
          type="text"
          placeholder="Type your message"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
};

export default MainChat;
