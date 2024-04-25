import ChatList from "./ChatList/ChatList";

const ChatWindow = ({ children }: { children: React.ReactNode }) => {
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
