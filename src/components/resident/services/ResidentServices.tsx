import React, { useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input"; // Import the new SearchInput
import {
  addServiceRequest,
  getServiceRequests,
} from "../../../services/api/resident";
import ServiceRequestForm from "./ServiceRequestForm";
import ServiceRequestCard from "./ServiceRequestCard";
import { ServiceRequestFormValues } from "@/validations/resident/serviceRequestSchema";
import { updateServiceRequests } from "@/services/api/caretaker";
import Shimmer from "@/components/ui/shimmer/ShimmerCard";
import { IService } from "@/types";
import FeedbackModal from "./FeedbackModal";
import { toast } from "react-toastify";
import { usePaginatedData } from "@/hooks/usePaginatedData";
import PaginationControls from "@/components/common/PaginationControls";

const ResidentServices: React.FC = () => {
  const [showNewRequestForm, setShowNewRequestForm] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<IService | null>(null);

  const {
    data: serviceRequests,
    isLoading,
    currentPage,
    totalPages,
    limit,
    setCurrentPage,
    setLimit,
    setSearchTerm,
    refetch,
  } = usePaginatedData<IService>(getServiceRequests, { initialLimit: 10 });

  const handleNewRequest = async (data: ServiceRequestFormValues) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));
    await addServiceRequest(formData);
    setShowNewRequestForm(false);
    toast.success("New service request added");
    refetch();
  };

  const handleFeedbackSubmit = async (feedback: string) => {
    if (!selectedRequest) return;

    const updatedRequest: IService = {
      ...selectedRequest,
      feedback,
    };
    await updateServiceRequests(updatedRequest._id, updatedRequest);
    toast.success("Feedback updated successfully");
    setShowFeedbackModal(false);
    refetch();
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
            <SearchInput
              type="text"
              placeholder="Search requests..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-gray-700"
              onSearch={(value) => setSearchTerm(value)}
              debounceTime={500}
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
        {isLoading ? (
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

      {!isLoading && serviceRequests.length > 0 && totalPages && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          limit={limit}
          setLimit={setLimit}
          onPageChange={setCurrentPage}
        />
      )}

      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        onSubmit={handleFeedbackSubmit}
        initialFeedback={selectedRequest?.feedback || ""}
      />
    </div>
  );
};

export default ResidentServices;
