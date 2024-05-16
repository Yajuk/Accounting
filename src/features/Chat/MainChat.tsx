"use client";

import { useEffect, useState } from "react";
import Message from "./Message";
import ChatHeader from "./ChatHeader";
import { Send } from "@mui/icons-material";
import { useChat } from "@/context/ChatProvider";
import { useSocket } from "@/context/socketContext";
import { ChatEventEnum } from "@/constants";
import * as messageService from "@/services/chat/messageService";
import { useAccount } from "@/context/accountProvider";
const MainChat = ({ chatId }: { chatId: string }) => {
  const { setActiveChatId, activeChat } = useChat();
  const { loggedInUserId } = useAccount();

  const { socket, setUnreadMessages, unreadMessages } = useSocket();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<messageService.Message[]>([]);

  const getMessages = async () => {
    // Check if socket is available, if not, show an alert
    if (!socket) return alert("Socket not available");

    // Emit an event to join the current chat
    socket.emit(ChatEventEnum.JOIN_CHAT_EVENT, chatId);
    // Filter out unread messages from the current chat as those will be read
    setUnreadMessages(unreadMessages.filter((msg) => msg.chatId !== chatId));

    try {
      // Fetch the messages for the current chat
      const res = await messageService.getChatMessages(chatId);
      const { data } = res;
      setMessages(data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const onSendMessage = async () => {
    if (message && loggedInUserId && chatId) {
      try {
        const res = await messageService.sendMessage({
          sender: {
            _id: loggedInUserId,
            name: "",
            email: "",
          },
          chatId,
          content: message,
        });
        console.log(res);
        if (res) {
          setMessages((prev) => [...prev, res.data]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setMessage("");
      }
    }
  };

  useEffect(() => {
    if (socket) {
    }
  }, [socket]);

  useEffect(() => {
    setActiveChatId(chatId);
    if (socket) {
      socket.emit(ChatEventEnum.JOIN_CHAT_EVENT, chatId);
      getMessages();

      socket.on(
        ChatEventEnum.MESSAGE_RECEIVED_EVENT,
        (message: messageService.Message) => {
          console.log("message received", message);
          if (message?.chatId !== chatId) {
            // If not, update the list of unread messages
            setUnreadMessages([message, ...unreadMessages]);
          } else {
            // If it belongs to the current chat, update the messages list for the active chat
            setMessages((prev) => [message, ...prev]);
          }
          setMessages((prevMessages) => [...prevMessages, message]);
        },
      );
    }
  }, [chatId, socket]);
  return (
    <>
      <ChatHeader chatId={activeChat?._id} chatName={activeChat?.name} />
      <div
        id="chat-container"
        className="h-[80%] w-full overflow-y-auto bg-gray-100 p-4 "
      >
        {messages.map((message, index) => (
          <Message
            key={index}
            message={message}
            isSender={message.sender._id === loggedInUserId}
          />
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
