import React from "react";
import { FaCalendarAlt, FaClock, FaComments } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { IService } from "@/types";

interface ServiceRequestCardProps {
  request: IService;
  onFeedbackClick: () => void;
}

const ServiceRequestCard: React.FC<ServiceRequestCardProps> = ({
  request,
  onFeedbackClick,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "completed":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="flex-grow">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-semibold text-gray-800 capitalize">
              {request.serviceType}
            </h3>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                request.status
              )}`}
            >
              {request.status}
            </span>
          </div>
          <p className="text-sm text-gray-600 flex items-center gap-2 mb-3">
            <FaCalendarAlt className="text-gray-400" />
            {new Date(request.date).toLocaleDateString()}
            <FaClock className="text-gray-400 ml-2" />
            {request.time}
          </p>
          <p className="text-gray-700 flex items-start gap-2 mb-4">
            <FaComments className="text-gray-400 mt-1 flex-shrink-0" />
            <span>{request.description}</span>
          </p>
        </div>
        {request.status === "completed" && (
          <Button
            onClick={onFeedbackClick}
            className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md"
          >
            Feedback
          </Button>
        )}
      </div>
    </div>
  );
};

export default ServiceRequestCard;
