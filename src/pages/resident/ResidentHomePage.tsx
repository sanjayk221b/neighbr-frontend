import ResidentNavbar from "../../components/resident/navbar/ResidentNavbar";
import ResidentHome from "@/components/resident/home/ResidentHome";

const ResidentHomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-200">
      <ResidentNavbar />
      <main className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8 pt-24">
        <ResidentHome />
      </main>
    </div>
  );
};

export default ResidentHomePage;
