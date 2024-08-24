import React from "react";
import ResidentNavbar from "../navbar/ResidentNavbar";

const ResidentHome: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-200">
      <ResidentNavbar />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold text-blue-800 mb-4">
            Welcome, Resident!
          </h1>
          <p className="text-gray-600">
            This is your Home. Here you can manage your properties and view
            important information.
          </p>
        </div>
      </main>
    </div>
  );
};

export default ResidentHome;
