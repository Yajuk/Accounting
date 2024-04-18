import ChatList from "@/components/Chat/ChatList";

const ChatLayout = async ({ children }: any) => {
  return (
    <div className="min-h-screen">
      <header className="w-full bg-black h-16 text-white fixed flex items-center justify-center">
        Welcome to Chat App
      </header>
      <div className="flex pt-16 min-h-screen">
        <div className="lg:w-1/4 min-h-screen px-1 border-gray-100 border h-full">
          <ChatList />
        </div>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default ChatLayout;
