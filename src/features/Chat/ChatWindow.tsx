"use client";
import { useSocket } from "@/context/socketContext";
import ChatList from "./ChatList/ChatList";
import { use, useEffect } from "react";

const ChatWindow = ({ children }: { children: React.ReactNode }) => {
  const { socket } = useSocket();
  useEffect(() => {
    if (socket) {
      socket.on("connected", () => {
        console.log("connected", socket);
      });
      socket.on("message", (message) => {
        console.log("message", message);
      });
    }
  }, [socket]);
  return (
    <div className="flex flex-col lg:flex-row pt-16 lg:min-h-screen h-16">
      <div className="lg:w-1/4 lg:min-h-screen h-64  px-1 border-gray-100 border">
        <ChatList />
      </div>
      <main className="lg:w-3/4 min-h-screen pl-0  w-full">{children}</main>
    </div>
  );
};
export default ChatWindow;
