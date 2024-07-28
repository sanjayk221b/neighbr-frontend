import CaretakerSidebar from "../../components/caretaker/CaretakerSidebar";
import CaretakerNavbar from "../../components/caretaker/CaretakerNavbar";
import CaretakerVisitors from "../../components/caretaker/visitor/CaretakerVisitors";

const CaretakerVisitorsPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <CaretakerNavbar />
      <div className="flex flex-1 overflow-hidden">
        <CaretakerSidebar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <CaretakerVisitors />
        </main>
      </div>
    </div>
  );
};

export default CaretakerVisitorsPage;
