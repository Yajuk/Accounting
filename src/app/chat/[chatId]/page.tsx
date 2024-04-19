import MainChat from "@/components/Chat/MainChat";

interface Props {
  params: {
    chatId: string;
  };
}
const ChatPage = ({ params }: Props) => {
  return <MainChat chatId={params.chatId} />;
};

export default ChatPage;
