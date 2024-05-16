// SocketContext.tsx
import { ChatEventEnum } from "@/constants";
import React, {
  createContext,
  use,
  useContext,
  useEffect,
  useState,
} from "react";
import { Socket, io } from "socket.io-client";
import { Message } from "@/services/chat/messageService";

interface SocketContextType {
  socket: Socket | null;
  setUnreadMessages: (message: Message[]) => void;
  unreadMessages: Message[];
}
// export interface Message {
//   _id: string;
//   sender: string; // Assuming sender is the ObjectId of the User who sent the message
//   content: string;
//   chat: string; // Assuming chat is the ObjectId of the Chat associated with the message
//   createdAt: Date;
//   updatedAt: Date;
// }

const SocketContext = createContext<SocketContextType>({
  socket: null,
  setUnreadMessages: () => {},
  unreadMessages: [],
});

export const useSocket = () => {
  return useContext(SocketContext);
};

// Function to establish a socket connection with authorization token
const getSocket = () => {
  const token = localStorage.getItem("accessToken");
  try {
    return io("http://localhost:4000", {
      reconnectionDelayMax: 10000,
      withCredentials: true,
      auth: { token },
    });
  } catch (error) {
    console.log(error);
  }
  // Create a socket connection with the provided URI and authentication
};
export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [unreadMessages, setUnreadMessages] = useState<Message[]>([]);

  useEffect(() => {
    const newSocket = getSocket();
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{ socket, setUnreadMessages, unreadMessages }}
    >
      {children}
    </SocketContext.Provider>
  );
};
