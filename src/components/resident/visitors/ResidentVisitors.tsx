import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaMinus,
  FaEnvelope,
  FaPhone,
  FaHome,
  FaCar,
  FaCalendarAlt,
  FaClock,
  FaInfoCircle,
  FaSearch,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import AddNewVisitor from "./AddNewVisitor";
import { addVisitor, getVisitors } from "../../../services/api/resident";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ShimmerVisitorCard from "./shimmer/ShimmerVisitorCard";

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

  const residentInfo = useSelector(
    (state: RootState) => state.auth.residentInfo
  );
  const residentId = residentInfo?._id;

  const fetchVisitors = async () => {
    try {
      setLoading(true);
      const visitorsData = await getVisitors();
      setVisitors(visitorsData);
    } catch (error) {
      console.error("Error fetching visitors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

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
          className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition duration-300 shadow-md w-full sm:w-auto"
        >
          {showAddVisitor ? (
            <>
              <FaMinus className="mr-2" /> Hide Add Visitor Form
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
            className="mb-8"
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
        <p className="text-gray-600 text-center text-lg bg-white rounded-xl shadow-md p-8">
          No visitors found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVisitors.map((visitor) => (
            <div
              key={visitor._id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300 border border-gray-100 transform hover:-translate-y-1"
            >
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4 shadow-md">
                  {visitor.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-800">
                    {visitor.name}
                  </h3>
                  <p className="text-sm text-gray-600 flex items-center">
                    <FaEnvelope className="mr-2 text-blue-500" />{" "}
                    {visitor.email}
                  </p>
                </div>
              </div>
              <div className="space-y-3 text-gray-700">
                <p className="flex items-center">
                  <FaPhone className="mr-3 text-blue-500" />{" "}
                  {visitor.mobileNumber}
                </p>
                <p className="flex items-center">
                  <FaHome className="mr-3 text-blue-500" /> Apt:{" "}
                  {visitor.apartmentNumber}
                </p>
                <p className="flex items-center">
                  <FaCar className="mr-3 text-blue-500" />
                  {visitor.hasVehicle
                    ? `Vehicle: ${visitor.vehicleNumber}`
                    : "No Vehicle"}
                </p>
                <p className="flex items-center">
                  <FaCalendarAlt className="mr-3 text-blue-500" />{" "}
                  {new Date(visitor.checkinDate).toLocaleDateString()}
                </p>
                <p className="flex items-center">
                  <FaClock className="mr-3 text-blue-500" />{" "}
                  {visitor.checkinTime}
                </p>
                <p className="flex items-center">
                  <FaInfoCircle className="mr-3 text-blue-500" /> Purpose:{" "}
                  {visitor.purpose}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResidentVisitors;
