import React from 'react';
import ResidentVisitors from "../../components/resident/visitors/ResidentVisitors";
import ResidentNavbar from "../../components/resident/navbar/ResidentNavbar";

const ResidentVisitorsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <ResidentNavbar />
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-8">Visitor Management</h1>
        <ResidentVisitors />
      </main>
    </div>
  );
};

export default ResidentVisitorsPage;