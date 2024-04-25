"use client";

import { useEffect, useState } from "react";
import Message from "./Message";
import ChatHeader from "./ChatHeader";

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
      text: "Hello, how are you? dgsgdfgjdvsgvdugcuysgucygwdycguywgcydgcuygduycguydgcuyguycgdeuwygcuydgcuygduycgwduygcuydwgcuyg",
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
    <>
      <ChatHeader chatId={chatId} />
      <div
        id="chat-container"
        className="h-full w-full overflow-y-auto bg-gray-100 p-4 "
      >
        {messages.map((message, index) => (
          <Message key={index} message={message} isSender={index % 2 === 0} />
        ))}

        <div className="flex justify-center fixed w-full bottom-1 lg:left-1/4 right-0 p-4">
          <input
            type="text"
            placeholder="Type your message"
            className="w-full p-2 border border-gray-300 rounded-md"
            onChange={(e) => {
              setMessages([
                ...messages,
                {
                  sender: "John",
                  senderAvatar: "https://via.placeholder.com/50",
                  text: e.target.value,
                  timestamp: "2022-01-01T00:00:00.000Z",
                },
              ]);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default MainChat;
