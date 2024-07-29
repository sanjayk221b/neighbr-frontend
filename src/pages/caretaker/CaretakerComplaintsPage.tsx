import CaretakerNavbar from "../../components/caretaker/CaretakerNavbar";
import CaretakerSidebar from "../../components/caretaker/CaretakerSidebar";
import CaretakerComplaints from "../../components/caretaker/complaints/CaretakerComplaints";

const CaretakerComplaintsPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <CaretakerNavbar />
      <div className="flex flex-1 overflow-hidden">
        <CaretakerSidebar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <CaretakerComplaints />
        </main>
      </div>
    </div>
  );
};

export default CaretakerComplaintsPage;
