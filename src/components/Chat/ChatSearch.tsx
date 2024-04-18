// ChatSearch.tsx
import { useState } from "react";
import { Chat, chatList } from "@/services/chat/chatService";

interface Props {
  onSearch: (chats: Chat[]) => void;
}

const ChatSearch: React.FC<Props> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    try {
      const response = await chatList({ search: query });
      onSearch(response.data.data);
    } catch (error) {
      console.error("Error searching chats:", error);
    }
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search chats..."
        className="border border-gray-300 rounded-md px-3 py-2 w-full"
        value={searchQuery}
        onChange={handleChange}
      />
    </div>
  );
};

export default ChatSearch;
