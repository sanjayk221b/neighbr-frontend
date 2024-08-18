import React from "react";

export const NLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-background/80 backdrop-blur-sm">
      <div className="text-6xl font-bold text-primary animate-pulse">N</div>
    </div>
  );
};
