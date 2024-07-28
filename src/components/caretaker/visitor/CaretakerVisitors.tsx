import React, { useState, useEffect } from "react";
import { getVisitors, updateVisitor } from "../../../services/api/caretaker";
import { IVisitor } from "../../../types/visitor";
import VisitorModal from "./CaretakerVisitorModal";

const CaretakerVisitors: React.FC = () => {
  const [visitors, setVisitors] = useState<IVisitor[]>([]);
  const [selectedVisitor, setSelectedVisitor] = useState<IVisitor | null>(null);

  const fetchVisitors = async () => {
    try {
      const data = await getVisitors();
      setVisitors(data);
    } catch (error) {
      console.error("Failed to fetch visitors:", error);
    }
  };
  useEffect(() => {
    fetchVisitors();
  }, []);

  const handleViewClick = (visitor: IVisitor) => {
    setSelectedVisitor(visitor);
  };

  const handleCloseModal = () => {
    setSelectedVisitor(null);
  };
  const handleUpdateVisitor = async (updatedVisitor: IVisitor) => {
    const id = updatedVisitor._id.toString();
    await updateVisitor(id, updatedVisitor);
    fetchVisitors();
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Visitors</h1>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Apartment No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Check-in Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Check-in Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {visitors.map((visitor) => (
              <tr key={visitor._id} className="hover:bg-gray-50 relative">
                <td className="px-6 py-4 whitespace-nowrap">
                  {visitor.image && typeof visitor.image === "string" && (
                    <img
                      src={visitor.image}
                      alt={`${visitor.name}'s profile`}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{visitor.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {visitor.apartmentNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(visitor.checkinDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {visitor.checkinTime}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      !visitor.isApproved
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {!visitor.isApproved ? "Pending" : "Approved"}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleViewClick(visitor)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedVisitor && (
        <VisitorModal
          visitor={selectedVisitor}
          onClose={handleCloseModal}
          onUpdate={handleUpdateVisitor}
        />
      )}
    </div>
  );
};

export default CaretakerVisitors;
