import React from "react";

interface ShimmerMessageProps {
  count?: number;
}

const ShimmerMessage: React.FC<ShimmerMessageProps> = ({ count = 5 }) => {
  return (
    <div className="space-y-4 p-4">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`w-3/4 h-10 rounded-lg ${
              i % 2 === 0 ? "bg-blue-200" : "bg-gray-200"
            } animate-pulse`}
          />
        </div>
      ))}
    </div>
  );
};

export default ShimmerMessage;