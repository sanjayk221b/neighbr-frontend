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
import { MessageSquare, Video } from "lucide-react";
import ShimmerMessage from "./shimmer/ShimmerMessage";
import { toast } from "react-toastify";
import VideoCall from "../videocall/VideoCall";
import VideoCallModal from "../videocall/VideoCallModal";

const Chat: React.FC = () => {
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const [selectedConversation, setSelectedConversation] =
    useState<IConversation | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [roomID, setRoomID] = useState("");
  const [isVideoCallModalVisible, setIsVideoCallModalVisible] = useState(false);
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
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on("videoCallInvitation", (data) => {
        if (data.conversationId === selectedConversation?._id) {
          setRoomID(data.roomID);
          setIsVideoCallModalVisible(true);
        }
      });

      return () => {
        socket.off("videoCallInvitation");
      };
    }
  }, [socket, selectedConversation]);

  const handleStartVideoCall = () => {
    if (selectedConversation && residentInfo) {
      const newRoomID = `${selectedConversation._id}_${Date.now()}`;
      setRoomID(newRoomID);
      setIsVideoCallActive(true);

      socket?.emit("videoCallInvitation", {
        conversationId: selectedConversation._id,
        callerId: residentInfo._id,
        roomID: newRoomID,
      });
    }
  };

  const handleAcceptVideoCall = () => {
    setIsVideoCallActive(true);
    setIsVideoCallModalVisible(false);
  };

  const handleRejectVideoCall = () => {
    socket?.emit("videoCallRejected", { callerId: selectedConversation?._id });
    setIsVideoCallModalVisible(false);
  };

  const handleEndVideoCall = () => {
    setIsVideoCallActive(false);
    setRoomID("");
  };

  const fetchConversations = async (userId: string) => {
    try {
      setIsLoading(true);
      const conversationsData = await getConversations(userId);
      setConversations(conversationsData);
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
      const conversationsData = await getConversations(residentInfo._id);
      setConversations(conversationsData);

      const updatedConversation = conversationsData.find(
        (conv: IConversation) => conv._id === newConversation._id
      );

      setSelectedConversation(updatedConversation);
      setMessages([]);

      if (socket) {
        socket.emit("joinConversation", newConversation._id);
      }
    } catch (error) {
      toast.error("Some error occurred");
    }
  };

  const handleNewMessage = (message: IMessage) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const handleSendMessage = async (content: string, file?: File) => {
    if (selectedConversation && residentInfo && residentInfo._id) {
      const formData = new FormData();
      formData.append("content", content);
      if (file) {
        formData.append("file", file);
      }
      formData.append("conversationId", selectedConversation._id);
      formData.append("senderId", residentInfo._id);
      formData.append("senderType", "resident");

      try {
        const sentMessage = await sendMessage(formData);
        socket?.emit("newMessage", sentMessage);
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
            <div className="h-16 bg-gray-50 border-b flex items-center justify-between px-4">
              <div className="flex items-center">
                <img
                  src={getOtherParticipant(selectedConversation)?.image}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h3 className="font-semibold">
                    {selectedConversation.isGroup
                      ? selectedConversation.groupName
                      : getOtherParticipant(selectedConversation)?.name ||
                        "Chat"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectedConversation.isGroup ? "Group" : "Private"}
                  </p>
                </div>
              </div>
              <button
                onClick={handleStartVideoCall}
                className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition"
              >
                <Video size={24} />
              </button>
            </div>
            {isVideoCallActive ? (
              <VideoCall
                roomID={roomID}
                onEndCall={handleEndVideoCall}
                userId={residentInfo?._id || ""}
                userName={residentInfo?.name || ""}
              />
            ) : (
              <>
                {isLoading ? (
                  <ShimmerMessage count={5} />
                ) : (
                  <MessageList messages={messages} currentUser={residentInfo} />
                )}
                <MessageInput onSendMessage={handleSendMessage} />
              </>
            )}
          </>
        ) : (
          <EmptyState
            icon={<MessageSquare size={48} />}
            message="Select a conversation"
            description="Choose a conversation from the list to start chatting"
          />
        )}
      </div>
      {isVideoCallModalVisible && (
        <VideoCallModal
          onAccept={handleAcceptVideoCall}
          onReject={handleRejectVideoCall}
        />
      )}
    </div>
  );
};

export default Chat;
