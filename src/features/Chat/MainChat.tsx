"use client";

import { useEffect, useState } from "react";
import Message from "./Message";
import ChatHeader from "./ChatHeader";
import { Send } from "@mui/icons-material";
import { useChat } from "@/context/ChatProvider";

interface IMessage {
  sender: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
}
const MainChat = ({ chatId }: { chatId: string }) => {
  const { setActiveChatId } = useChat();
  const [message, setMessage] = useState("");
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

  const onSendMessage = () => {
    if (message) {
      setMessages([
        ...messages,
        {
          sender: "John",
          senderAvatar: "https://via.placeholder.com/50",
          text: message,
          timestamp: new Date().toISOString(),
        },
      ]);
      setMessage("");
    }
  };

  useEffect(() => {
    setActiveChatId(chatId);
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

        <div className="flex justify-center fixed w-full bottom-1 bg-white  lg:left-1/4 lg:w-3/4 right-0 p-4 ">
          <input
            type="text"
            placeholder="Type your message"
            value={message}
            className="w-full p-2 border border-gray-300 rounded-md"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button
            onClick={onSendMessage}
            className="ml-4 cursor-pointer border border-gray-300 flex items-center justify-center rounded-full p-2"
          >
            <Send />
          </button>
        </div>
      </div>
    </>
  );
};

export default MainChat;
