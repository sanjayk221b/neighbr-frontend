import React from "react";
import ResidentVisitors from "../../components/resident/visitors/ResidentVisitors";
import ResidentNavbar from "../../components/resident/navbar/ResidentNavbar";

const ResidentVisitorsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-200 ">
      <ResidentNavbar />
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 pt-24">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-blue-800 mb-6">
            Visitor Management
          </h1>
          <ResidentVisitors />
        </div>
      </main>
    </div>
  );
};

export default ResidentVisitorsPage;
