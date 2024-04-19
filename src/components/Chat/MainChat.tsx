"use client";

import { useEffect } from "react";

const MainChat = ({ chatId }: { chatId: string }) => {
  useEffect(() => {
    console.log(chatId);
  }, [chatId]);
  return <div>Main Chat {chatId}</div>;
};

export default MainChat;
