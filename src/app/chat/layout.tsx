import ChatWindow from "@/features/Chat/ChatWindow";

const ChatLayout = async ({ children }: any) => {
  return (
    <div className="min-h-screen">
      {/* <header className="w-full z-50 bg-black h-16 mt-16 text-white fixed flex items-center justify-center">
        Welcome to Chat App
      </header> */}
      <ChatWindow>{children}</ChatWindow>
    </div>
  );
};

export default ChatLayout;
