import React, { useState, useEffect } from "react";
import {
  getAllServiceRequests,
  updateServiceRequests,
} from "../../../services/api/caretaker";
import { IService, IWorker } from "../../../types";
import Swal from "sweetalert2";
import ServiceDetailsModal from "./ServiceDetailsModal";
import { getWorkers } from "@/services/api/worker";

const CaretakerServices: React.FC = () => {
  const [services, setServices] = useState<IService[]>([]);
  const [selectedService, setSelectedService] = useState<IService | null>(null);
  const [workers, setWorkers] = useState<IWorker[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchServices();
    fetchWorkers();
  }, []);

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const data = await getAllServiceRequests();
      setServices(data.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWorkers = async () => {
    try {
      const res = await getWorkers();
      setWorkers(res.data);
    } catch (error) {
      console.error("Error fetching workers:", error);
    }
  };

  const handleViewClick = (service: IService) => {
    setSelectedService({ ...service });
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  const handleUpdateService = async (updatedService: IService) => {
    try {
      const { service } = await updateServiceRequests(updatedService._id, {
        ...updatedService,
        workerName: updatedService.workerName,
        status: updatedService.status,
      });

      setServices(services.map((s) => (s._id === service._id ? service : s)));

      Swal.fire("Saved!", "The service request has been updated.", "success");
    } catch (error) {
      console.error("Error updating service:", error);
      Swal.fire(
        "Error!",
        "There was a problem updating the service request.",
        "error"
      );
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
      <h1 className="text-3xl font-bold mb-6">All Services</h1>

      <div className="overflow-x-auto bg-card shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-muted">
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
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {services.map((service) => (
              <tr key={service._id} className="hover:bg-accent">
                <td className="px-6 py-4 whitespace-nowrap">
                  {service.serviceType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(service.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{service.time}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {service.workerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      service.status === "completed"
                        ? "bg-success/10 text-success"
                        : service.status === "pending"
                        ? "bg-warning/10 text-warning"
                        : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {service.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleViewClick(service)}
                    className="text-primary hover:underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedService && (
        <ServiceDetailsModal
          service={selectedService}
          onClose={handleCloseModal}
          onUpdate={handleUpdateService}
          workers={workers}
        />
      )}
    </div>
  );
};

export default CaretakerServices;
