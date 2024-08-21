import ResidentComplaints from "../../components/resident/complaints/ResidentComplaints";
import ResidentNavbar from "../../components/resident/navbar/ResidentNavbar";

const ResidentComplaintsPage = () => {
  return (
    <div className="min-h-screen bg-blue-50">
      <ResidentNavbar />
      <main className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl mx-auto font-bold text-blue-800">
            Complaints Management
          </h1>
          <ResidentComplaints />
        </div>
      </main>
    </div>
  );
};

export default ResidentComplaintsPage;
