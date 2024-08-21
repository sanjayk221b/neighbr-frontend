import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import {
  addServiceRequest,
  getServiceRequests,
} from "../../../services/api/resident";
import ServiceRequestForm from "./ServiceRequestForm";
import ServiceRequestCard from "./ServiceRequestCard";
import Shimmer from "@/components/ui/shimmer/ShimmerCard";
import { ServiceRequestFormValues } from "@/validations/resident/serviceRequestSchema";

interface ServiceRequest {
  _id: string;
  serviceType: string;
  date: string;
  time: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
}

const ResidentServices: React.FC = () => {
  const [showNewRequestForm, setShowNewRequestForm] = useState(false);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServiceRequests = async () => {
      try {
        const response = await getServiceRequests();
        setServiceRequests(response);
      } catch (error) {
        console.error("Error fetching service requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceRequests();
  }, []);

  const handleNewRequest = async (data: ServiceRequestFormValues) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) =>
        formData.append(key, value)
      );
      const response = await addServiceRequest(formData);
      setServiceRequests((prev) => [...prev, response.service]);
      setShowNewRequestForm(false);
    } catch (error) {
      console.error("Error submitting service request:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">
          Your Service Requests
        </h2>
        <button
          onClick={() => setShowNewRequestForm(!showNewRequestForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
        >
          <FaPlus className="mr-2" /> New Request
        </button>
      </div>

      {showNewRequestForm && <ServiceRequestForm onSubmit={handleNewRequest} />}

      <div className="space-y-4">
        {loading
          ? Array.from({ length: 5 }).map((_, index) => <Shimmer key={index} />)
          : serviceRequests.map((request) => (
              <ServiceRequestCard key={request._id} request={request} />
            ))}
      </div>
    </div>
  );
};

export default ResidentServices;
