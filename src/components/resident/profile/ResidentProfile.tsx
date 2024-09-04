import { FormEvent, useState } from "react";
import { changePassword } from "../../../services/api/resident";
import { IResident } from "@/types";
import {
  FaEnvelope,
  FaPhone,
  FaCar,
  FaHome,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { toast } from "react-toastify";

interface ResidentProfileProps {
  resident: IResident;
}

const ResidentProfile: React.FC<ResidentProfileProps> = ({ resident }) => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = async (e: FormEvent<HTMLFormElement>) => {
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
              className="h-48 w-48 rounded-full object-cover border-4 border-blue-400 shadow-lg transform hover:rotate-3 transition-transform duration-300"
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
                  {resident.vehicles?.map((vehicle, index) => (
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
              className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
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
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    id="currentPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 pr-10 text-gray-700"
                    style={{ color: showCurrentPassword ? "black" : "gray" }}
                    required
                  />

                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? (
                      <FaEyeSlash className="text-gray-500" />
                    ) : (
                      <FaEye className="text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="newPassword"
                  className="block text-gray-700 mb-2"
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 pr-10 text-gray-700"
                    style={{ color: showNewPassword ? "black" : "gray" }}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <FaEyeSlash className="text-gray-500" />
                    ) : (
                      <FaEye className="text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-700 mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 pr-10 text-gray-700"
                    style={{ color: showConfirmPassword ? "black" : "gray" }}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash className="text-gray-500" />
                    ) : (
                      <FaEye className="text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
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

const InfoItem: React.FC<{ icon: JSX.Element; text: string }> = ({
  icon,
  text,
}) => (
  <div className="flex items-center space-x-3 text-gray-700">
    <span className="text-blue-600">{icon}</span>
    <span>{text}</span>
  </div>
);

export default ResidentProfile;
