import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus, FaSearch } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import AddNewVisitor from "./AddNewVisitor";
import { addVisitor, getVisitors } from "../../../services/api/resident";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ShimmerVisitorCard from "./shimmer/ShimmerVisitorCard";
import VisitorCard from "./VisitorCard";

interface Visitor {
  _id: number;
  name: string;
  email: string;
  mobileNumber: string;
  apartmentNumber: string;
  image: File | null;
  hasVehicle: boolean;
  vehicleNumber: string;
  checkinDate: string;
  checkinTime: string;
  purpose: string;
}

const ResidentVisitors: React.FC = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [showAddVisitor, setShowAddVisitor] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);

  const residentInfo = useSelector(
    (state: RootState) => state.auth.residentInfo
  );
  const residentId = residentInfo?._id;

  const fetchVisitors = async (page: number = currentPage) => {
    try {
      setLoading(true);
      const { data, totalPages } = await getVisitors(page, limit);
      setVisitors(data);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching visitors:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchVisitors();
  }, [currentPage, limit]);

  const handleAddVisitor = async (newVisitor: Partial<Visitor>) => {
    const formData = new FormData();

    Object.entries(newVisitor).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (typeof value === "boolean") {
        formData.append(key, value.toString());
      } else if (value !== null && value !== undefined) {
        formData.append(key, value as string);
      }
    });

    if (residentId) {
      formData.append("residentId", residentId);
    }

    try {
      await addVisitor(formData);
      fetchVisitors();
      setShowAddVisitor(false);
    } catch (error) {
      console.error("Error adding visitor:", error);
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

  const filteredVisitors = visitors.filter((visitor) =>
    visitor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <div className="relative w-full sm:w-96">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search visitors..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={() => setShowAddVisitor(!showAddVisitor)}
          className="flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md w-full sm:w-auto"
        >
          {showAddVisitor ? (
            <>
              <FaMinus className="mr-2" /> Hide Form
            </>
          ) : (
            <>
              <FaPlus className="mr-2" /> Add New Visitor
            </>
          )}
        </button>
      </div>

      <AnimatePresence>
        {showAddVisitor && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8 bg-white rounded-lg shadow-md p-6 "
          >
            <AddNewVisitor onSubmit={handleAddVisitor} />
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <ShimmerVisitorCard key={index} />
          ))}
        </div>
      ) : filteredVisitors.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-8">
          <p className="text-gray-600 text-center text-lg">
            No visitors found.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVisitors.map((visitor) => (
            <VisitorCard key={visitor._id} visitor={visitor} />
          ))}
        </div>
      )}
      <div className="flex justify-between items-center">
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
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResidentVisitors;
