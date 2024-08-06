import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useSocketContext } from "@/contexts/SocketProvider";
import ConversationList from "./ConversationList";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import {
  getConversations,
  sendMessage,
  getMessages,
  createConversation,
} from "@/services/api/chat";
import { IConversation, IMessage, IParticipant } from "@/types";
import ShimmerConversation from "./shimmer/ShimmerConversation";
import EmptyState from "./shimmer/ShimmerEmptyState";
import { MessageSquare } from "lucide-react";
import ShimmerMessage from "./shimmer/ShimmerMessage";

const Chat: React.FC = () => {
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const [selectedConversation, setSelectedConversation] =
    useState<IConversation | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const residentInfo = useSelector(
    (state: RootState) => state.auth.residentInfo
  );
  const { socket } = useSocketContext();

  useEffect(() => {
    if (residentInfo?._id) fetchConversations(residentInfo._id);

    if (socket) {
      socket.on("newMessage", handleNewMessage);

      return () => {
        socket.off("newMessage", handleNewMessage);
      };
    }
  }, [residentInfo, socket]);

  const fetchConversations = async (userId: string) => {
    try {
      setIsLoading(true);
      const conversationsData = await getConversations(userId);
      setConversations(conversationsData);
    } catch (err) {
      setError("Failed to fetch conversations");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMessages = async (conversationId: string) => {
    if (conversationId) {
      const fetchedMessages = await getMessages(conversationId);
      setMessages(fetchedMessages);
    }
  };

  const handleNewConversation = async (otherUserId: string) => {
    if (!residentInfo?._id) {
      console.error("Current user ID is not available");
      return;
    }

    try {
      const participants: IParticipant[] = [
        { _id: residentInfo._id, type: "resident" },
        { _id: otherUserId, type: "resident" },
      ];

      const newConversation = await createConversation(participants, false);
      console.log(newConversation);
      setConversations((prevConversations) => [
        ...prevConversations,
        newConversation,
      ]);
      setSelectedConversation(newConversation);
      setMessages([]); // Clear previous messages
      if (socket) {
        socket.emit("joinConversation", newConversation._id);
      }
    } catch (error) {
      console.error("Failed to create new conversation", error);
      setError("Failed to create new conversation");
    }
  };

  const handleNewMessage = (message: IMessage) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const handleSendMessage = async (content: string) => {
    if (selectedConversation && residentInfo) {
      const message: Omit<IMessage, "_id" | "createdAt" | "updatedAt"> = {
        conversationId: selectedConversation._id,
        senderId: residentInfo._id,
        senderType: "resident",
        content,
      };
      try {
        const sentMessage = await sendMessage(message);
        socket.emit("newMessage", {
          ...message,
          conversationId: selectedConversation._id,
        });
        handleNewMessage(sentMessage);
      } catch (error) {
        console.error("Failed to send message", error);
      }
    }
  };

  const handleConversationSelect = (conversation: IConversation) => {
    setSelectedConversation(conversation);
    fetchMessages(conversation._id);
    if (socket) {
      socket.emit("joinConversation", conversation._id);
    }
  };

  const getOtherParticipant = (conversation: IConversation) => {
    return conversation.participants.find(
      (participant) => participant._id !== residentInfo?._id
    );
  };

  return (
    <div className="flex h-full rounded-lg overflow-hidden bg-white shadow-lg">
      <div className="w-1/3 border-r border-gray-200">
        <div className="h-16 bg-gray-50 border-b flex items-center px-4">
          <h2 className="text-xl font-semibold">Messages</h2>
        </div>
        {isLoading ? (
          <ShimmerConversation count={5} />
        ) : error ? (
          <div className="p-4 text-red-500">{error}</div>
        ) : (
          <ConversationList
            conversations={conversations}
            onSelect={handleConversationSelect}
            selectedConversation={selectedConversation}
            onNewConversation={handleNewConversation}
          />
        )}
      </div>
      <div className="w-2/3 flex flex-col">
        {selectedConversation ? (
          <>
            <div className="h-16 bg-gray-50 border-b flex items-center px-4">
              <img
                src={
                  getOtherParticipant(selectedConversation)?.imageUrl ||
                  "/path/to/default-avatar.png"
                }
                alt="Avatar"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <h3 className="font-semibold">
                  {selectedConversation.isGroup
                    ? selectedConversation.groupName
                    : getOtherParticipant(selectedConversation)?.name || "Chat"}
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedConversation.isGroup ? "Group" : "Private"}
                </p>
              </div>
            </div>
            {isLoading ? (
              <ShimmerMessage count={5} />
            ) : (
              <MessageList messages={messages} currentUser={residentInfo} />
            )}
            <MessageInput onSendMessage={handleSendMessage} />
          </>
        ) : (
          <EmptyState
            icon={<MessageSquare size={48} />}
            message="Select a conversation"
            description="Choose a conversation from the list to start chatting"
          />
        )}
      </div>
    </div>
  );
};

export default Chat;
