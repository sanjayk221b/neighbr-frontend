import React, { useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import { getComplaints } from "../../../services/api/resident";
import ComplaintCard from "./ComplaintCard";
import NewComplaintForm from "./NewComplaintFrom";
import { IComplaint } from "@/types";
import Shimmer from "@/components/ui/shimmer/ShimmerCard";
import { usePaginatedData } from "@/hooks/usePaginatedData";
import PaginationControls from "@/components/common/PaginationControls";
import { SearchInput } from "@/components/ui/search-input";

const ResidentComplaints: React.FC = () => {
  const [showNewComplaintForm, setShowNewComplaintForm] = useState(false);

  const {
    data: complaints,
    isLoading,
    error,
    currentPage,
    limit,
    totalPages,
    setCurrentPage,
    setLimit,
    setSearchTerm,
    refetch,
  } = usePaginatedData<IComplaint>(getComplaints, { initialLimit: 10 });

  const handleComplaintAdded = () => {
    refetch();
    setShowNewComplaintForm(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Your Complaints</h2>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <SearchInput
              type="text"
              placeholder="Search complaints..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-gray-700"
              onSearch={(value) => setSearchTerm(value)}
              debounceTime={500}
            />
          </div>
          <button
            onClick={() => setShowNewComplaintForm(!showNewComplaintForm)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center text-sm shadow-md"
          >
            <FaPlus className="mr-2" /> New Complaint
          </button>
        </div>
      </div>

      {showNewComplaintForm && (
        <NewComplaintForm
          onComplaintAdded={handleComplaintAdded}
          onClose={() => setShowNewComplaintForm(false)}
        />
      )}

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(limit)].map((_, index) => (
            <Shimmer key={index} />
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-md">
          <p>{error}</p>
        </div>
      ) : (
        <div className="space-y-6">
          {complaints.length > 0 ? (
            complaints.map((complaint) => (
              <ComplaintCard key={complaint._id} complaint={complaint} />
            ))
          ) : (
            <p className="text-gray-500">No complaints found.</p>
          )}
        </div>
      )}

      {!isLoading && complaints.length > 0 && totalPages && (
        <PaginationControls
          currentPage={currentPage}
          limit={limit}
          totalPages={totalPages}
          setLimit={setLimit}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default ResidentComplaints;