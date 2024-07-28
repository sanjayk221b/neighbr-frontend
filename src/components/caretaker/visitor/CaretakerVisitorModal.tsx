import React, { useState } from "react";
import { IVisitor } from "../../../types/visitor";
import Swal from "sweetalert2";

interface VisitorModalProps {
  visitor: IVisitor;
  onClose: () => void;
  onUpdate: (updatedVisitor: IVisitor) => void;
}

export const VisitorModal: React.FC<VisitorModalProps> = ({
  visitor,
  onClose,
  onUpdate,
}) => {
  const [updatedVisitor, setUpdatedVisitor] = useState<IVisitor>(visitor);

  const handleUpdate = (field: keyof IVisitor, value: any) => {
    setUpdatedVisitor((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    Swal.fire({
      title: "Save Changes?",
      text: "Are you sure you want to save these changes?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
      customClass: {
        popup: "rounded-xl shadow-2xl",
        title: "text-2xl font-bold text-gray-800",
        htmlContainer: "text-gray-600",
        confirmButton:
          "bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out transform hover:scale-105",
        cancelButton:
          "bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out transform hover:scale-105",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        onUpdate(updatedVisitor);
        onClose();
        Swal.fire({
          title: "Saved!",
          text: "Your changes have been saved.",
          icon: "success",
          customClass: {
            popup: "rounded-xl shadow-2xl",
            title: "text-2xl font-bold text-gray-800",
            htmlContainer: "text-gray-600",
            confirmButton:
              "bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out transform hover:scale-105",
          },
        });
      }
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75 transition-opacity duration-300 ease-in-out">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto transform transition-all duration-300 ease-in-out scale-95 hover:scale-100">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            {updatedVisitor.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              {updatedVisitor.image &&
                typeof updatedVisitor.image === "string" && (
                  <img
                    src={updatedVisitor.image}
                    alt={`${updatedVisitor.name}'s profile`}
                    className="w-full h-48 object-cover rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:scale-105"
                  />
                )}
              <div className="mt-3 space-y-2 text-sm">
                <div>
                  <label className="font-medium text-gray-700">Email</label>
                  <p className="text-gray-900">{updatedVisitor.email}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-700">
                    Mobile Number
                  </label>
                  <p className="text-gray-900">{updatedVisitor.mobileNumber}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-700">
                    Apartment No
                  </label>
                  <p className="text-gray-900">
                    {updatedVisitor.apartmentNumber}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-2 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Has Vehicle
                  </label>
                  <p className="text-sm text-gray-900">
                    {updatedVisitor.hasVehicle ? "Yes" : "No"}
                  </p>
                </div>
                {updatedVisitor.hasVehicle && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Vehicle Number
                    </label>
                    <p className="text-sm text-gray-900">
                      {updatedVisitor.vehicleNumber}
                    </p>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Check-in Date
                </label>
                <p className="text-sm text-gray-900">
                  {new Date(updatedVisitor.checkinDate).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Check-in Time
                  </label>
                  <input
                    type="time"
                    value={updatedVisitor.checkinTime}
                    onChange={(e) =>
                      handleUpdate("checkinTime", e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Check-out Time
                  </label>
                  <input
                    type="time"
                    value={updatedVisitor.checkoutTime}
                    onChange={(e) =>
                      handleUpdate("checkoutTime", e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Purpose
                </label>
                <p className="text-sm text-gray-900">
                  {updatedVisitor.purpose}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    value={updatedVisitor.isApproved ? "approved" : "pending"}
                    onChange={(e) =>
                      handleUpdate("isApproved", e.target.value === "approved")
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Restricted
                  </label>
                  <select
                    value={updatedVisitor.isBlocked ? "blocked" : "not-blocked"}
                    onChange={(e) =>
                      handleUpdate("isBlocked", e.target.value === "blocked")
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm"
                  >
                    <option value="not-blocked">Not Blocked</option>
                    <option value="blocked">Blocked</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 flex justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out transform hover:scale-105"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>  
  );
};

export default VisitorModal;
