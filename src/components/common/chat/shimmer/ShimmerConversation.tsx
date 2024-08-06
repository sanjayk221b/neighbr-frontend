import React from "react";

interface ShimmerConversationProps {
  count?: number;
}

const ShimmerConversation: React.FC<ShimmerConversationProps> = ({
  count = 5,
}) => {
  return (
    <div className="space-y-4 p-4">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse mr-4" />
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
            <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShimmerConversation;
