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
  const { setActiveChatId, activeChat, chats } = useChat();
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
    setUnreadMessages(unreadMessages.filter((msg) => msg.chat !== chatId));

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
          chat: chatId,
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

  const onMessageReceived = (message: messageService.Message) => {
    if (message?.chat !== chatId) {
      // If not, update the list of unread messages
      setUnreadMessages([message, ...unreadMessages]);
    } else {
      // If it belongs to the current chat, update the messages list for the active chat
      setMessages((prev) => [...prev, message]);
    }
  };

  useEffect(() => {
    setActiveChatId(chatId);
    if (socket) {
      socket.emit(ChatEventEnum.JOIN_CHAT_EVENT, chatId);
      getMessages();
    }
  }, [chatId, socket]);

  const onEvent = (event: any) => {
    console.log(event);
  };

  useEffect(() => {
    // If the socket isn't initialized, we don't set up listeners.
    if (!socket) return;
    const {
      MESSAGE_RECEIVED_EVENT,
      CONNECTED_EVENT,
      DISCONNECT_EVENT,
      TYPING_EVENT,
      STOP_TYPING_EVENT,
      NEW_CHAT_EVENT,
      LEAVE_CHAT_EVENT,
      UPDATE_GROUP_NAME_EVENT,
    } = ChatEventEnum;

    // Set up event listeners for various socket events:
    // Listener for when the socket connects.
    socket.on(CONNECTED_EVENT, onEvent);
    // Listener for when the socket disconnects.
    socket.on(DISCONNECT_EVENT, onEvent);
    // Listener for when a user is typing.
    socket.on(TYPING_EVENT, onEvent);
    // Listener for when a user stops typing.
    socket.on(STOP_TYPING_EVENT, onEvent);
    // Listener for when a new message is received.
    socket.on(MESSAGE_RECEIVED_EVENT, onMessageReceived);
    // Listener for the initiation of a new chat.
    socket.on(NEW_CHAT_EVENT, onEvent);
    // Listener for when a user leaves a chat.
    socket.on(LEAVE_CHAT_EVENT, onEvent);
    // Listener for when a group's name is updated.
    socket.on(UPDATE_GROUP_NAME_EVENT, onEvent);

    // When the component using this hook unmounts or if `socket` or `chats` change:
    return () => {
      // Remove all the event listeners we set up to avoid memory leaks and unintended behaviors.
      socket.off(CONNECTED_EVENT, onEvent);
      socket.off(DISCONNECT_EVENT, onEvent);
      socket.off(TYPING_EVENT, onEvent);
      socket.off(STOP_TYPING_EVENT, onEvent);
      socket.off(MESSAGE_RECEIVED_EVENT, onMessageReceived);
      socket.off(NEW_CHAT_EVENT, onEvent);
      socket.off(LEAVE_CHAT_EVENT, onEvent);
      socket.off(UPDATE_GROUP_NAME_EVENT, onEvent);
    };

    // Note:
    // The `chats` array is used in the `onMessageReceived` function.
    // We need the latest state value of `chats`. If we don't pass `chats` in the dependency array,
    // the `onMessageReceived` will consider the initial value of the `chats` array, which is empty.
    // This will not cause infinite renders because the functions in the socket are getting mounted and not executed.
    // So, even if some socket callbacks are updating the `chats` state, it's not
    // updating on each `useEffect` call but on each socket call.
  }, [socket, chats]);

  //write logic to scroll dive to bottom
  useEffect(() => {
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

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
