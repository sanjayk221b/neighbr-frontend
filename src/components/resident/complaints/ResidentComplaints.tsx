import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { getComplaints } from "../../../services/api/resident";
import ComplaintCard from "./ComplaintCard";
import NewComplaintForm from "./NewComplaintFrom";
import { IComplaint } from "@/types";
import Shimmer from "@/components/ui/shimmer/ShimmerCard";

const ResidentComplaints: React.FC = () => {
  const [showNewComplaintForm, setShowNewComplaintForm] = useState(false);
  const [complaints, setComplaints] = useState<IComplaint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      setIsLoading(true);
      const fetchedComplaints = await getComplaints();
      setComplaints(fetchedComplaints);
      setError(null);
    } catch (err) {
      setError("Failed to fetch complaints. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplaintAdded = (newComplaint: IComplaint) => {
    setComplaints((prev) => [newComplaint, ...prev]);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Your Complaints</h2>
        <button
          onClick={() => setShowNewComplaintForm(!showNewComplaintForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center text-sm shadow-md"
        >
          <FaPlus className="mr-2" /> New Complaint
        </button>
      </div>

      {showNewComplaintForm && (
        <NewComplaintForm
          onComplaintAdded={handleComplaintAdded}
          onClose={() => setShowNewComplaintForm(false)}
        />
      )}

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <Shimmer key={index} />
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-md">
          <p>{error}</p>
        </div>
      ) : (
        <div className="space-y-6">
          {complaints.map((complaint) => (
            <ComplaintCard key={complaint._id} complaint={complaint} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ResidentComplaints;
