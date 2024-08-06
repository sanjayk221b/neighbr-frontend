import React, { useState, useEffect } from "react";
import { FaPlus, FaCalendarAlt, FaClock, FaComments } from "react-icons/fa";
import {
  addServiceRequest,
  getServiceRequests,
} from "../../../services/api/resident";

interface ServiceRequest {
  _id: string;
  serviceType: string;
  date: string;
  time: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
}

const ResidentServices = () => {
  const [showNewRequestForm, setShowNewRequestForm] = useState(false);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [newRequest, setNewRequest] = useState({
    serviceType: "",
    date: "",
    time: "",
    description: "",
  });

  useEffect(() => {
    const fetchServiceRequests = async () => {
      try {
        const response = await getServiceRequests();
        console.log(response);
        setServiceRequests(response);
      } catch (error) {
        console.error("Error fetching service requests:", error);
      }
    };

    fetchServiceRequests();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setNewRequest((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      Object.entries(newRequest).forEach(([key, value]) => {
        console.log(`Appending ${key}: ${value}`);
        formData.append(key, value);
      });

      const response = await addServiceRequest(formData);

      setServiceRequests((prev) => [...prev, response.service]);
      setShowNewRequestForm(false);
      setNewRequest({ serviceType: "", date: "", time: "", description: "" });
    } catch (error) {
      console.error("Error submitting service request:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Your Service Requests
        </h2>
        <button
          onClick={() => setShowNewRequestForm(!showNewRequestForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
        >
          <FaPlus className="mr-2" /> New Request
        </button>
      </div>

      {showNewRequestForm && (
        <form
          onSubmit={handleNewRequest}
          className="bg-white p-6 rounded-lg shadow-md mb-6"
        >
          <h3 className="text-xl font-semibold mb-4">New Service Request</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Service Type
              </label>
              <select
                name="serviceType"
                value={newRequest.serviceType}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option value="">Select a service</option>
                <option value="plumbing">Plumbing</option>
                <option value="electrical">Electrical</option>
                <option value="cleaning">Cleaning</option>
                <option value="laundry">Laundry</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={newRequest.date}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <input
                type="time"
                name="time"
                value={newRequest.time}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={newRequest.description}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                rows={3}
              ></textarea>
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Submit Request
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {serviceRequests.map((request) => (
          <div
            key={request._id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 capitalize">
                  {request.serviceType}
                </h3>
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
        ))}
      </div>
    </div>
  );
};

export default ResidentServices;
