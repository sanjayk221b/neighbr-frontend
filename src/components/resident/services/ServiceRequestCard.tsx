import React from "react";
import { FaCalendarAlt, FaClock, FaComments } from "react-icons/fa";

interface ServiceRequest {
  _id: string;
  serviceType: string;
  date: string;
  time: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
}

interface ServiceRequestCardProps {
  request: ServiceRequest;
}

const ServiceRequestCard: React.FC<ServiceRequestCardProps> = ({ request }) => (
  <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 capitalize">{request.serviceType}</h3>
        <p className="text-sm text-gray-600 mt-1">
          <FaCalendarAlt className="inline mr-2" />
          {new Date(request.date).toLocaleDateString()}
          <FaClock className="inline mx-2" />
          {request.time}
        </p>
      </div>
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${
          request.status === "pending"
            ? "bg-yellow-100 text-yellow-800"
            : request.status === "in-progress"
            ? "bg-blue-100 text-blue-800"
            : "bg-green-100 text-green-800"
        }`}
      >
        {request.status}
      </span>
    </div>
    <p className="text-gray-700 mt-2">
      <FaComments className="inline mr-2" />
      {request.description}
    </p>
  </div>
);

export default ServiceRequestCard;
