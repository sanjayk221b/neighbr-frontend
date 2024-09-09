import ResidentNavbar from "../../components/resident/navbar/ResidentNavbar";
import ResidentHome from "@/components/resident/home/ResidentHome";
import CommunityProfileCard from "@/components/resident/community/CommunityProfileCard";

const ResidentHomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-200">
      <ResidentNavbar />
      <main className="w-full pt-24 flex justify-center">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row lg:items-start px-4 sm:px-6 lg:px-8">
          <div className="lg:w-64 xl:w-64 flex-shrink-0 mb-6 lg:mb-0 lg:sticky lg:top-24">
            <CommunityProfileCard />
          </div>
          <div className="flex-grow max-w-2xl w-full mx-auto lg:ml-8">
            <ResidentHome />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResidentHomePage;
