import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { IConversation, IParticipant } from "@/types";
import EmptyState from "./shimmer/ShimmerEmptyState";
import { Search, MessageSquare, Plus } from "lucide-react";
import NewConversationModal from "./NewConversationModal";

interface ConversationListProps {
  conversations: IConversation[];
  onSelect: (conversation: IConversation) => void;
  selectedConversation: IConversation | null;
  onNewConversation: (userId: string) => void;
}

const truncateText = (text: string, maxLength: number) => {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  onSelect,
  selectedConversation,
  onNewConversation,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isNewConversationModalOpen, setIsNewConversationModalOpen] =
    useState(false);
  const residentInfo = useSelector(
    (state: RootState) => state.auth.residentInfo
  );

  const getOtherParticipant = (
    conversation: IConversation
  ): IParticipant | undefined => {
    return conversation.participants.find(
      (participant) => participant._id !== residentInfo?._id
    );
  };

  const filteredConversations = conversations.filter((conv) => {
    const otherParticipant = getOtherParticipant(conv);
    return otherParticipant?.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  const formatLastMessageTime = (timestamp: string) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const now = new Date();
    const diffInDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 3600 * 24)
    );

    if (diffInDays === 0) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffInDays === 1) {
      return "Yesterday";
    } else if (diffInDays < 7) {
      return date.toLocaleDateString([], { weekday: "short" });
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  const handleCreateConversation = (userId: string) => {
    onNewConversation(userId);
    setIsNewConversationModalOpen(false);
  };

  return (
    <div className="h-[calc(100%-4rem)] flex flex-col relative">
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 border rounded-lg"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <EmptyState
            icon={<MessageSquare size={48} />}
            message="No conversations found"
            description="Try adjusting your search or start a new conversation"
          />
        ) : (
          filteredConversations.map((conversation) => {
            const otherParticipant = getOtherParticipant(conversation);
            return (
              <div
                key={conversation._id}
                onClick={() => onSelect(conversation)}
                className={`flex items-center p-4 cursor-pointer hover:bg-gray-100 transition ${
                  selectedConversation?._id === conversation._id
                    ? "bg-blue-50"
                    : ""
                }`}
              >
                <img
                  src={otherParticipant?.image}
                  alt="Avatar"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold truncate">
                      {otherParticipant?.name}
                    </h3>
                    {conversation?.lastMessage && (
                      <span className="text-xs text-gray-500">
                        {formatLastMessageTime(
                          conversation.lastMessage.createdAt
                        )}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {truncateText(
                      conversation.lastMessage?.content || "No messages yet",
                      30
                    )}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
      <button
        onClick={() => setIsNewConversationModalOpen(true)}
        className="absolute bottom-4 right-4 bg-blue-500 text-white rounded-full p-3 shadow-lg hover:bg-blue-600 transition"
      >
        <Plus size={24} />
      </button>
      <NewConversationModal
        isOpen={isNewConversationModalOpen}
        onClose={() => setIsNewConversationModalOpen(false)}
        onCreateConversation={handleCreateConversation}
      />
    </div>
  );
};

export default ConversationList;
