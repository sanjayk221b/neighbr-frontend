import React, { useRef, useEffect } from "react";
import { IMessage, IUser } from "@/types";
import EmptyState from "./shimmer/ShimmerEmptyState";
import { MessageSquare } from "lucide-react";

interface MessageListProps {
  messages: IMessage[];
  currentUser: IUser;
}

const MessageList: React.FC<MessageListProps> = ({ messages, currentUser }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const isValidDate = (dateString: string): boolean => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const groupMessagesByDate = (messages: IMessage[]) => {
    const groups: { [key: string]: IMessage[] } = {};
    messages
      .filter((message) => isValidDate(message.createdAt))
      .forEach((message) => {
        const date = formatDate(message.createdAt);
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(message);
      });
    return Object.entries(groups);
  };

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 ? (
        <EmptyState
          icon={<MessageSquare size={48} />}
          message="No messages yet"
          description="Get or send a message and it shows up here"
        />
      ) : (
        groupedMessages.map(([date, msgs]) => (
          <div key={date} className="space-y-4">
            <div className="text-center">
              <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                {date}
              </span>
            </div>
            {msgs.map((message) => (
              <div
                key={message._id}
                className={`flex ${
                  message.senderId === currentUser._id
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl p-3 rounded-lg ${
                    message.senderId === currentUser._id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <p>{message.content}</p>
                  <div
                    className={`text-xs mt-1 ${
                      message.senderId === currentUser._id
                        ? "text-blue-200"
                        : "text-gray-500"
                    }`}
                  >
                    {formatTime(message.createdAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
