import CaretakerSidebar from "../../components/caretaker/sidebar/CaretakerSidebar";
import CaretakerNavbar from "../../components/caretaker/navbar/CaretakerNavbar";
import CaretakerVisitors from "../../components/caretaker/visitor/CaretakerVisitors";

const CaretakerVisitorsPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <CaretakerNavbar />
      <div className="flex flex-1 overflow-hidden">
        <CaretakerSidebar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto ">
          <CaretakerVisitors />
        </main>
      </div>
    </div>
  );
};

export default CaretakerVisitorsPage;
