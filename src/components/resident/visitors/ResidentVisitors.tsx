import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaMinus,
  // FaUser,
  FaEnvelope,
  FaPhone,
  FaHome,
  FaCar,
  FaCalendarAlt,
  FaClock,
  FaInfoCircle,
} from "react-icons/fa";
import AddNewVisitor from "./AddNewVisitor";
import { addVisitor, getVisitors } from "../../../services/api/resident";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

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

  const residentInfo = useSelector(
    (state: RootState) => state.auth.residentInfo
  );
  const residentId = residentInfo?._id;

  const fetchVisitors = async () => {
    try {
      const visitorsData = await getVisitors();
      setVisitors(visitorsData);
    } catch (error) {
      console.error("Error fetching visitors:", error);
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
      1;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <div className="container mx-auto p-4">
        <div className="mb-6">
          <button
            onClick={() => setShowAddVisitor(!showAddVisitor)}
            className="flex items-center justify-center w-full md:w-auto bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg"
          >
            {showAddVisitor ? (
              <>
                <FaMinus className="mr-2" /> Hide Add Visitor Form
              </>
            ) : (
              <>
                <FaPlus className="mr-2" /> Show Add Visitor Form
              </>
            )}
          </button>
        </div>
        {showAddVisitor && <AddNewVisitor onSubmit={handleAddVisitor} />}
        <div className="mt-12">
          <h2 className="text-3xl font-semibold mb-6 text-blue-800">
            Visitor List
          </h2>
          {visitors.length === 0 ? (
            <p className="text-gray-600 text-center text-lg">
              No visitors found.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visitors.map((visitor) => (
                <div
                  key={visitor._id}
                  className="bg-white rounded-xl shadow-xl p-6 hover:shadow-2xl transition duration-300 transform hover:-translate-y-2"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
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
                  <div className="space-y-2 text-gray-700">
                    <p className="flex items-center">
                      <FaPhone className="mr-2 text-blue-500" />{" "}
                      {visitor.mobileNumber}
                    </p>
                    <p className="flex items-center">
                      <FaHome className="mr-2 text-blue-500" /> Apt:{" "}
                      {visitor.apartmentNumber}
                    </p>
                    <p className="flex items-center">
                      <FaCar className="mr-2 text-blue-500" />
                      {visitor.hasVehicle
                        ? `Vehicle: ${visitor.vehicleNumber}`
                        : "No Vehicle"}
                    </p>
                    <p className="flex items-center">
                      <FaCalendarAlt className="mr-2 text-blue-500" />{" "}
                      {new Date(visitor.checkinDate).toLocaleDateString()}
                    </p>
                    <p className="flex items-center">
                      <FaClock className="mr-2 text-blue-500" />{" "}
                      {visitor.checkinTime}
                    </p>
                    <p className="flex items-center">
                      <FaInfoCircle className="mr-2 text-blue-500" /> Purpose:{" "}
                      {visitor.purpose}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResidentVisitors;
