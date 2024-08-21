import React from 'react';
import { FaCalendarAlt, FaClock, FaComments } from 'react-icons/fa';
import { IComplaint } from '@/types';

interface ComplaintCardProps {
  complaint: IComplaint;
}

const ComplaintCard: React.FC<ComplaintCardProps> = ({ complaint }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-gray-200 flex justify-between">
      <div className="flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-800 capitalize">
            {complaint.title}
          </h3>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              complaint.isResolved
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {complaint.isResolved ? 'Resolved' : 'Pending'}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-2 flex items-center">
          <FaCalendarAlt className="mr-2" />
          {new Date(complaint.createdAt).toLocaleDateString()}
          <FaClock className="mx-2" />
          {new Date(complaint.createdAt).toLocaleTimeString()}
        </p>
        <p className="text-gray-700 flex items-start">
          <FaComments className="mr-2 mt-1 flex-shrink-0" />
          <span>{complaint.description}</span>
        </p>
      </div>
      {complaint.image && (
        <img
          src={complaint.image}
          alt="complaint image"
          className="w-24 h-24 object-cover rounded-md ml-4"
        />
      )}
    </div>
  );
};

export default ComplaintCard;
