import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import AddNewVisitor from "./AddNewVisitor";
import { addVisitor, getVisitors } from "../../../services/api/resident";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ShimmerVisitorCard from "./shimmer/ShimmerVisitorCard";
import VisitorCard from "./VisitorCard";
import { IVisitor } from "@/types";
import { usePaginatedData } from "@/hooks/usePaginatedData";
import PaginationControls from "@/components/common/PaginationControls";

const ResidentVisitors: React.FC = () => {
  const [showAddVisitor, setShowAddVisitor] = useState(false);
  const residentInfo = useSelector(
    (state: RootState) => state.auth.residentInfo
  );
  const residentId = residentInfo?._id;

  const {
    data: visitors,
    isLoading,
    currentPage,
    totalPages,
    limit,
    setCurrentPage,
    setLimit,
    setSearchTerm,
    refetch,
  } = usePaginatedData<IVisitor>(getVisitors, { initialLimit: 10 });

  const handleAddVisitor = async (newVisitor: Partial<IVisitor>) => {
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
      refetch();
      setShowAddVisitor(false);
    } catch (error) {
      console.error("Error adding visitor:", error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <div className="relative w-full sm:w-96">
          <SearchInput
            placeholder="Search visitors..."
            onSearch={setSearchTerm}
            debounceTime={300}
          />
        </div>
        <Button
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
        </Button>
      </div>

      <AnimatePresence>
        {showAddVisitor && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8 bg-white rounded-lg shadow-md p-6"
          >
            <AddNewVisitor onSubmit={handleAddVisitor} />
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(limit)].map((_, index) => (
            <ShimmerVisitorCard key={index} />
          ))}
        </div>
      ) : visitors.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-8">
          <p className="text-gray-600 text-center text-lg">
            No visitors found.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visitors.map((visitor) => (
            <VisitorCard key={visitor._id} visitor={visitor} />
          ))}
        </div>
      )}

      {!isLoading && visitors.length > 0 && totalPages > 0 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          limit={limit}
          setLimit={setLimit}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default ResidentVisitors;