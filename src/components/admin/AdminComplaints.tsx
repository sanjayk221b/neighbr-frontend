import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import IResident from "@/types/resident";
import { updateComplaint } from "@/services/api/caretaker";
import { getAllComplaints } from "@/services/api/admin";

interface IComplaint {
  _id: string;
  title: string;
  description: string;
  residentId: IResident;
  isResolved: boolean;
  image: string;
  createdAt: string;
}

const AdminComplaints: React.FC = () => {
  const [complaints, setComplaints] = useState<IComplaint[]>([]);
  const [selectedComplaint, setSelectedComplaint] = useState<IComplaint | null>(null);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const data = await getAllComplaints();
      setComplaints(data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  const handleViewClick = (complaint: IComplaint) => {
    setSelectedComplaint(complaint);
  };

  const handleCloseModal = () => {
    setSelectedComplaint(null);
  };

  const handleStatusChange = () => {
    if (selectedComplaint) {
      setSelectedComplaint({
        ...selectedComplaint,
        isResolved: !selectedComplaint.isResolved,
      });
    }
  };

  const handleSaveChanges = async () => {
    if (selectedComplaint) {
      Swal.fire({
        title: "Are you sure?",
        text: "You're about to save changes to this complaint.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, save it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await updateComplaint(selectedComplaint._id, selectedComplaint);
            fetchComplaints();
            setSelectedComplaint(null);
            Swal.fire("Saved!", "The complaint has been updated.", "success");
          } catch (error) {
            console.error("Error updating complaint:", error);
            Swal.fire(
              "Error!",
              "There was a problem updating the complaint.",
              "error"
            );
          }
        }
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Complaints</h1>
      </div>

      <div className="bg-card rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Title
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Description
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-muted">
            {complaints.map((complaint) => (
              <tr key={complaint._id} className="hover:bg-muted/50">
                <td className="px-4 py-4 whitespace-nowrap">
                  {complaint.title}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {complaint.description.substring(0, 50)}...
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {new Date(complaint.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      complaint.isResolved
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {complaint.isResolved ? "Resolved" : "Unresolved"}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleViewClick(complaint)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    View/Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedComplaint && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-gray-100 px-4 py-3 sm:px-6 flex justify-between items-center">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Complaint Details
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg
                    className="h-6 w-6"
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
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedComplaint.title}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Filed At
                    </label>
                    <p className="mt-1 text-sm text-gray-500">
                      {new Date(selectedComplaint.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedComplaint.description}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Resident Name
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedComplaint.residentId.name}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Mobile Number
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedComplaint.residentId.mobileNumber}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Apartment Number
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedComplaint.residentId.apartmentNumber}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <div className="mt-1">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedComplaint.isResolved}
                          onChange={handleStatusChange}
                          className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Resolved
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image
                  </label>
                  <img
                    src={selectedComplaint.image}
                    alt="Complaint"
                    className="w-full h-auto max-h-48 object-cover rounded-md shadow-md"
                  />
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleSaveChanges}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminComplaints;