import ResidentNavbar from "../../components/resident/navbar/ResidentNavbar";
import ResidentServices from "../../components/resident/services/ResidentServices";

const ResidentServicesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-200">
      <ResidentNavbar />
      <main className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold text-blue-800 mb-4">
            Services Management
          </h1>
          <ResidentServices />
        </div>
      </main>
    </div>
  );
};

export default ResidentServicesPage;
