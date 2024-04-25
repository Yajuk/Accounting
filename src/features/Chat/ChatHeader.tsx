const ChatHeader = ({ chatId }: { chatId: string }) => {
  return (
    <div className="flex items-center justify-center h-12 bg-white rounded-sm">
      {chatId}
    </div>
  );
};

export default ChatHeader;
