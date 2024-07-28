import ResidentVisitors from "../../components/resident/visitor/ResidentVisitors";
import ResidentNavbar from "../../components/resident/ResidentNavbar";

const ResidentVisitorsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-blue-50">
      <ResidentNavbar />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold text-blue-800 mb-4">
            Visitor Management
          </h1>
          <ResidentVisitors />
        </div>
      </main>
    </div>
  );
};

export default ResidentVisitorsPage;
