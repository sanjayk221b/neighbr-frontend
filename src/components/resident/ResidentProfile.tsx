import { useState } from "react";
import { changePassword } from "../../services/api/resident";
import { FaEnvelope, FaPhone, FaCar, FaHome } from "react-icons/fa";
import { toast } from "react-toastify";

const ResidentProfile = ({ resident }) => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const response = await changePassword(
      resident.email,
      currentPassword,
      newPassword
    );
    console.log(response);
    if (response.success == true) {
      toast.success("Password Changed Successfully");
    }

    setNewPassword("");
    setConfirmPassword("");
    setCurrentPassword("");
    setShowPasswordForm(false);
  };

  return (
    <div className="bg-blue-50 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
        <div className="md:flex">
          <div className="md:flex-shrink-0 p-8">
            <img
              className="h-48 w-48 rounded-full object-cover border-4 border-purple-400 shadow-lg transform hover:rotate-3 transition-transform duration-300"
              src={resident.image || "https://via.placeholder.com/200"}
              alt={resident.name}
            />
          </div>
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {resident.name}
            </h1>
            <div className="space-y-4">
              <InfoItem icon={<FaEnvelope />} text={resident.email} />
              <InfoItem icon={<FaPhone />} text={resident.mobileNumber} />
              <InfoItem
                icon={<FaHome />}
                text={`Apartment ${resident.apartmentNumber}`}
              />
            </div>

            {resident.hasVehicle && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                  Vehicles
                </h2>
                <div className="flex flex-wrap gap-2">
                  {resident.vehicles.map((vehicle, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      <FaCar className="mr-2" /> {vehicle}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => setShowPasswordForm(!showPasswordForm)}
              className="mt-6 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition-colors duration-300"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      {showPasswordForm && (
        <div className="mt-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-6 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Change Password
            </h2>
            <form onSubmit={handlePasswordChange}>
              <div className="mb-4">
                <label
                  htmlFor="currentPassword"
                  className="block text-gray-700 mb-2"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="newPassword"
                  className="block text-gray-700 mb-2"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-700 mb-2"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition-colors duration-300"
                >
                  Change Password
                </button>
                <button
                  type="button"
                  onClick={() => setShowPasswordForm(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const InfoItem = ({ icon, text }) => (
  <div className="flex items-center space-x-3 text-gray-700">
    <span className="text-purple-500">{icon}</span>
    <span>{text}</span>
  </div>
);

export default ResidentProfile;
