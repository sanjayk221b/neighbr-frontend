import CaretakerDashboard from "../../components/caretaker/CaretakerDashboard";
import CaretakerNavbar from "../../components/caretaker/CaretakerNavbar";
import CaretakerSidebar from "../../components/caretaker/CaretakerSidebar";

const CaretakerHomePage = () => {
  return (
    <div className="flex flex-col h-screen">
      <CaretakerNavbar />
      <div className="flex flex-1 overflow-hidden">
        <CaretakerSidebar />
        <main className="flex-1 overflow-y-auto p-4">
          <CaretakerDashboard />
        </main>
      </div>
    </div>
  );
};

export default CaretakerHomePage;
