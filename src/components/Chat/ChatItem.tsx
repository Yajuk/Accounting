// ChatItem.tsx
import { Chat } from "@/services/chat/chatService";
import { formatTimestamp } from "@/utils/date";

interface Props {
  chat: Chat;
}

const ChatItem: React.FC<Props> = ({ chat }) => {
  return (
    <div className="flex cursor-pointer items-center justify-between border-b border-gray-200 py-4">
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
        <div>
          <h2 className="font-bold text-lg">{chat.name}</h2>
          <p className="text-sm text-gray-500">
            {formatTimestamp(chat.updatedAt)}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <p className="mr-4">{chat.participants.length}</p>
        {/* You can add an icon here for indicating number of participants */}
      </div>
    </div>
  );
};

export default ChatItem;
