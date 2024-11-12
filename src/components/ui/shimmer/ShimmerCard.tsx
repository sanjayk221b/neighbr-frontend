import React from "react";

const Shimmer: React.FC = () => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-600 border border-gray-200 flex justify-between animate-pulse">
    <div className="flex-grow">
      <div className="flex justify-between items-start mb-4">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-24"></div>
      </div>
      <div className="text-sm text-gray-600 mb-2 flex items-center">
        <div className="h-4 bg-gray-200 rounded w-1/4 mr-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
      <div className="h-4 bg-gray-200 rounded mt-2 w-full"></div>
    </div>
    <div className="w-24 h-24 object-cover rounded-md ml-4 bg-gray-200"></div>
  </div>
);

export default Shimmer;
