import CaretakerNavbar from "../../components/caretaker/navbar/CaretakerNavbar";
import CaretakerSidebar from "../../components/caretaker/sidebar/CaretakerSidebar";
import CaretakerServices from "../../components/caretaker/services/CaretakerServices";

const CaretakerServicesPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <CaretakerNavbar />
      <div className="flex flex-1 overflow-hidden">
        <CaretakerSidebar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto ">
          <CaretakerServices />
        </main>
      </div>
    </div>
  );
};

export default CaretakerServicesPage;
