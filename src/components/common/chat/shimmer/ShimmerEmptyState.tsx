import React from "react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  message: string;
  description?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  message,
  description,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      {icon && <div className="text-gray-400 mb-4">{icon}</div>}
      <h3 className="text-xl font-semibold text-gray-900">{message}</h3>
      {description && <p className="mt-2 text-gray-500">{description}</p>}
    </div>
  );
};

export default EmptyState;
