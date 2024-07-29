import React, { useState, useEffect } from "react";
import {
  getAllServiceRequests,
  updateServiceRequests,
} from "../../../services/api/caretaker";
import { IService } from "../../../types";
import Swal from "sweetalert2";

const CaretakerServices: React.FC = () => {
  const [services, setServices] = useState<IService[]>([]);
  const [selectedService, setSelectedService] = useState<IService | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const data = await getAllServiceRequests();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewEditClick = (service: IService) => {
    setSelectedService({ ...service });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (selectedService) {
      setSelectedService({
        ...selectedService,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSaveChanges = async () => {
    if (selectedService) {
      Swal.fire({
        title: "Are you sure?",
        text: "You're about to save changes to this service request.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, save it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const { service } = await updateServiceRequests(
              selectedService._id,
              {
                ...selectedService,
                workerName: selectedService.workerName,
                status: selectedService.status,
              }
            );

            setServices(
              services.map((s) => (s._id === service._id ? service : s))
            );

            setSelectedService(null);

            Swal.fire(
              "Saved!",
              "The service request has been updated.",
              "success"
            );
          } catch (error) {
            console.error("Error updating service:", error);
            Swal.fire(
              "Error!",
              "There was a problem updating the service request.",
              "error"
            );
          }
        }
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 animate-fade-in-down">
        All Services
      </h1>

      <div className="overflow-x-auto bg-white shadow-xl rounded-lg animate-fade-in-up">
        <table className="min-w-full table-auto">
          <thead className="bg-gradient-to-r from-gray-200 to-gray-300">
            <tr>
              {[
                "Service Type",
                "Date",
                "Time",
                "Worker Name",
                "Status",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {services.map((service, index) => (
              <tr
                key={service._id}
                className="hover:bg-gray-50 transition-colors duration-200 ease-in-out animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  {service.serviceType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(service.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{service.time}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {service.workerName || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      service.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : service.status === "in-progress"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    } transition-all duration-300 ease-in-out transform hover:scale-105`}
                  >
                    {service.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleViewEditClick(service)}
                    className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200 ease-in-out transform hover:scale-110"
                  >
                    View/Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedService && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate-fade-in">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                  Service Details
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {[
                    {
                      label: "Service Type",
                      value: selectedService.serviceType,
                    },
                    {
                      label: "Date",
                      value: new Date(
                        selectedService.date
                      ).toLocaleDateString(),
                    },
                    { label: "Time", value: selectedService.time },
                    {
                      label: "Description",
                      value: selectedService.description,
                    },
                    {
                      label: "Solved Date",
                      value: selectedService.solvedDate
                        ? new Date(
                            selectedService.solvedDate
                          ).toLocaleDateString()
                        : "-",
                    },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-sm font-semibold text-gray-700">
                        {label}
                      </p>
                      <p className="text-sm text-gray-500">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="workerName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Worker Name
                  </label>
                  <input
                    type="text"
                    id="workerName"
                    name="workerName"
                    value={selectedService.workerName || ""}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={selectedService.status}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleSaveChanges}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200 ease-in-out transform hover:scale-105"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setSelectedService(null)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200 ease-in-out transform hover:scale-105"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaretakerServices;
