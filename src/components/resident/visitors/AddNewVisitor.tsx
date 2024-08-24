import React, { useState, ChangeEvent } from "react";
import {
  FaUserPlus,
  FaEnvelope,
  FaMobile,
  FaHome,
  FaCar,
  FaCalendarAlt,
  FaClock,
  FaClipboardList,
  FaUpload,
} from "react-icons/fa";

interface Visitor {
  id: number;
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

interface AddNewVisitorProps {
  onSubmit: (visitor: Partial<Visitor>) => void;
}

const AddNewVisitor: React.FC<AddNewVisitorProps> = ({ onSubmit }) => {
  const [newVisitor, setNewVisitor] = useState<Partial<Visitor>>({
    name: "",
    email: "",
    mobileNumber: "",
    apartmentNumber: "",
    image: null,
    hasVehicle: false,
    vehicleNumber: "",
    checkinDate: "",
    checkinTime: "",
    purpose: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewVisitor((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewVisitor((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleAddVisitor = () => {
    onSubmit(newVisitor);
    setNewVisitor({
      name: "",
      email: "",
      mobileNumber: "",
      apartmentNumber: "",
      image: null,
      hasVehicle: false,
      vehicleNumber: "",
      checkinDate: "",
      checkinTime: "",
      purpose: "",
    });
  };

  return (
    <div >
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Add New Visitor
      </h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <FaUserPlus className="text-blue-500" />
          <input
            type="text"
            name="name"
            value={newVisitor.name ?? ""}
            onChange={handleInputChange}
            placeholder="Visitor Name"
            className="flex-grow border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <FaEnvelope className="text-blue-500" />
          <input
            type="email"
            name="email"
            value={newVisitor.email ?? ""}
            onChange={handleInputChange}
            placeholder="Email"
            className="flex-grow border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <FaMobile className="text-blue-500" />
          <input
            type="tel"
            name="mobileNumber"
            value={newVisitor.mobileNumber ?? ""}
            onChange={handleInputChange}
            placeholder="Mobile Number"
            className="flex-grow border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <FaHome className="text-blue-500" />
          <input
            type="text"
            name="apartmentNumber"
            value={newVisitor.apartmentNumber ?? ""}
            onChange={handleInputChange}
            placeholder="Apartment Number"
            className="flex-grow border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <FaUpload className="text-blue-500" />
          <input
            type="file"
            name="image"
            onChange={handleImageUpload}
            className="flex-grow border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <FaCar className="text-blue-500" />
          <label className="flex items-center">
            <input
              type="checkbox"
              name="hasVehicle"
              checked={newVisitor.hasVehicle ?? false}
              onChange={handleInputChange}
              className="mr-2"
            />
            Has Vehicle
          </label>
        </div>
        {newVisitor.hasVehicle && (
          <div className="flex items-center space-x-2">
            <FaCar className="text-blue-500" />
            <input
              type="text"
              name="vehicleNumber"
              value={newVisitor.vehicleNumber ?? ""}
              onChange={handleInputChange}
              placeholder="Vehicle Number"
              className="flex-grow border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
        <div className="flex items-center space-x-2">
          <FaCalendarAlt className="text-blue-500" />
          <input
            type="date"
            name="checkinDate"
            value={newVisitor.checkinDate ?? ""}
            onChange={handleInputChange}
            className="flex-grow border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <FaClock className="text-blue-500" />
          <input
            type="time"
            name="checkinTime"
            value={newVisitor.checkinTime ?? ""}
            onChange={handleInputChange}
            className="flex-grow border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <FaClipboardList className="text-blue-500" />
          <input
            type="text"
            name="purpose"
            value={newVisitor.purpose ?? ""}
            onChange={handleInputChange}
            placeholder="Purpose"
            className="flex-grow border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleAddVisitor}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Add Visitor
        </button>
      </div>
    </div>
  );
};

export default AddNewVisitor;
