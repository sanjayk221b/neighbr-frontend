import ResidentNavbar from "@/components/resident/navbar/ResidentNavbar";
import Chat from "@/components/common/chat/Chat";

const ResidentChatPage = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <ResidentNavbar />
      <div className="flex-1 overflow-hidden p-4">
        <Chat />
      </div>
    </div>
  );
};

export default ResidentChatPage;
