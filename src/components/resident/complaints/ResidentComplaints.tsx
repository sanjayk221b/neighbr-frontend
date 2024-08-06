import React, { useState, useEffect } from "react";
import { FaPlus, FaCalendarAlt, FaClock, FaComments } from "react-icons/fa";
import { addComplaint, getComplaints } from "../../../services/api/resident";

interface Complaint {
  _id: string;
  title: string;
  description: string;
  isResolved: boolean;
  image?: string;
  createdAt: string;
}

const ResidentComplaints = () => {
  const [showNewComplaintForm, setShowNewComplaintForm] = useState(false);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [newComplaint, setNewComplaint] = useState({
    title: "",
    description: "",
    recipientType: "caretaker",
  });
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      setIsLoading(true);
      const fetchedComplaints = await getComplaints();
      console.log(fetchedComplaints);
      setComplaints(fetchedComplaints);
      setError(null);
    } catch (err) {
      setError("Failed to fetch complaints. Please try again later.");
      console.error("Error fetching complaints:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNewComplaint((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleNewComplaint = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", newComplaint.title);
      formData.append("description", newComplaint.description);
      formData.append("isResolved", "false");
      formData.append("recipientType", newComplaint.recipientType);
      if (file) {
        formData.append("image", file);
      }

      const response = await addComplaint(formData);
      setComplaints((prev) => [...prev, response]);
      setShowNewComplaintForm(false);
      setNewComplaint({
        title: "",
        description: "",
        recipientType: "caretaker",
      });
      setFile(null);
    } catch (error) {
      console.error("Error adding complaint:", error);
      setError("Failed to add complaint. Please try again.");
    }
  };

  if (isLoading) {
    return <div>Loading complaints...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Your Complaints</h2>
        <button
          onClick={() => setShowNewComplaintForm(!showNewComplaintForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center text-sm"
        >
          <FaPlus className="mr-2" /> New Complaint
        </button>
      </div>

      {showNewComplaintForm && (
        <form
          onSubmit={handleNewComplaint}
          className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200"
          encType="multipart/form-data"
        >
          <h3 className="text-2xl font-semibold mb-6 text-gray-700">
            New Complaint
          </h3>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={newComplaint.title}
                onChange={handleInputChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recipient
              </label>
              <select
                name="recipientType"
                value={newComplaint.recipientType}
                onChange={handleInputChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option value="caretaker">Caretaker</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={newComplaint.description}
                onChange={handleInputChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                rows={4}
              ></textarea>
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300 text-sm font-medium"
            >
              Submit Complaint
            </button>
          </div>
        </form>
      )}

      <div className="space-y-6 ">
        {complaints.map((complaint) => (
          <div
            key={complaint._id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-gray-200 flex justify-between"
          >
            <div className="flex-grow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-800 capitalize">
                  {complaint.title}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    complaint.isResolved
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {complaint.isResolved ? "Resolved" : "Pending"}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2 flex items-center">
                <FaCalendarAlt className="mr-2" />
                {new Date(complaint.createdAt).toLocaleDateString()}
                <FaClock className="mx-2" />
                {new Date(complaint.createdAt).toLocaleTimeString()}
              </p>
              <p className="text-gray-700 flex items-start">
                <FaComments className="mr-2 mt-1 flex-shrink-0" />
                <span>{complaint.description}</span>
              </p>
            </div>
            {complaint.image && (
              <img
                src={complaint.image}
                alt="complaint image"
                className="w-24 h-24 object-cover rounded-md ml-4"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResidentComplaints;
