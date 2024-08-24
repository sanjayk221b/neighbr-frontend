import { IVisitor } from "@/types";
import React from "react";
import { FaEnvelope, FaPhone, FaHome, FaCar, FaCalendarAlt, FaClock, FaInfoCircle } from "react-icons/fa";

interface VisitorCardProps {
  visitor: IVisitor;
}

const VisitorCard: React.FC<VisitorCardProps> = ({ visitor }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300 border border-gray-200 transform hover:-translate-y-1">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4 shadow-md">
          {visitor.name.charAt(0)}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            {visitor.name}
          </h3>
          <p className="text-sm text-gray-600 flex items-center">
            <FaEnvelope className="mr-2 text-blue-500" /> {visitor.email}
          </p>
        </div>
      </div>
      <div className="space-y-3 text-gray-700">
        <p className="flex items-center">
          <FaPhone className="mr-3 text-blue-500" /> {visitor.mobileNumber}
        </p>
        <p className="flex items-center">
          <FaHome className="mr-3 text-blue-500" /> Apt: {visitor.apartmentNumber}
        </p>
        <p className="flex items-center">
          <FaCar className="mr-3 text-blue-500" />
          {visitor.hasVehicle ? `Vehicle: ${visitor.vehicleNumber}` : "No Vehicle"}
        </p>
        <p className="flex items-center">
          <FaCalendarAlt className="mr-3 text-blue-500" /> {new Date(visitor.checkinDate).toLocaleDateString()}
        </p>
        <p className="flex items-center">
          <FaClock className="mr-3 text-blue-500" /> {visitor.checkinTime}
        </p>
        <p className="flex items-center">
          <FaInfoCircle className="mr-3 text-blue-500" /> Purpose: {visitor.purpose}
        </p>
      </div>
    </div>
  );
};

export default VisitorCard; 