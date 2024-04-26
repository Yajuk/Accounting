const ChatHeader = ({
  chatId,
  chatName,
}: {
  chatId?: string;
  chatName?: string;
}) => {
  return (
    <div className="flex items-center justify-center h-12 bg-white rounded-sm">
      {chatName} - ({chatId})
    </div>
  );
};

export default ChatHeader;
