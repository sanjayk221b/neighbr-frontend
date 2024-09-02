import React, { useState, useEffect } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import {
  addServiceRequest,
  getServiceRequests,
} from "../../../services/api/resident";
import ServiceRequestForm from "./ServiceRequestForm";
import ServiceRequestCard from "./ServiceRequestCard";
import Shimmer from "@/components/ui/shimmer/ShimmerCard";
import { ServiceRequestFormValues } from "@/validations/resident/serviceRequestSchema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { updateServiceRequests } from "@/services/api/caretaker";
import { toast } from "react-toastify";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(
    null
  );
  const [feedback, setFeedback] = useState("");

  const fetchServiceRequests = async (page: number = currentPage) => {
    try {
      setLoading(true);
      const response = await getServiceRequests(page, limit, searchTerm);
      setServiceRequests(response);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching service requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServiceRequests();
  }, [currentPage, limit, searchTerm]);

  const handleNewRequest = async (data: ServiceRequestFormValues) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) =>
        formData.append(key, value)
      );
      const response = await addServiceRequest(formData);
      setServiceRequests((prev) => [response.service, ...prev]);
      setShowNewRequestForm(false);
      toast.success("New service request added");
    } catch (error) {
      console.error("Error submitting service request:", error);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleFeedbackSubmit = async () => {
    if (!selectedRequest) return;

    try {
      await updateServiceRequests(selectedRequest._id, { feedback });
      toast.success("Feedback added");
      setShowFeedbackModal(false);
      setFeedback("");
      fetchServiceRequests();
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">
          Your Service Requests
        </h2>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search requests..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-gray-700"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <Button
            onClick={() => setShowNewRequestForm(!showNewRequestForm)}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            <FaPlus className="mr-2" /> New Request
          </Button>
        </div>
      </div>

      {showNewRequestForm && <ServiceRequestForm onSubmit={handleNewRequest} />}

      <div className="space-y-4">
        {loading ? (
          Array.from({ length: limit }).map((_, index) => (
            <Shimmer key={index} />
          ))
        ) : serviceRequests.length > 0 ? (
          serviceRequests.map((request) => (
            <div key={request._id}>
              <ServiceRequestCard
                request={request}
                onFeedbackClick={() => {
                  setSelectedRequest(request);
                  setShowFeedbackModal(true);
                }}
              />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No service requests found.
          </p>
        )}
      </div>

      {!loading && serviceRequests.length > 0 && (
        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center gap-4">
            <span>Items per page:</span>
            <select
              value={limit}
              onChange={handleLimitChange}
              className="border border-gray-300 rounded-lg py-2 px-4"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              variant="outline"
            >
              Previous
            </Button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              variant="outline"
            >
              Next
            </Button>
          </div>
        </div>
      )}

      <Dialog open={showFeedbackModal} onOpenChange={setShowFeedbackModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Feedback</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="feedback">Your Feedback</Label>
              <Textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Please provide your feedback..."
                className="mt-1"
              />
            </div>
            <Button onClick={handleFeedbackSubmit}>Submit Feedback</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResidentServices;
