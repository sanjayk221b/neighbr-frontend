import { useSelector } from "react-redux";
import CaretakerNavbar from "@/components/caretaker/navbar/CaretakerNavbar";
import CaretakerSidebar from "@/components/caretaker/sidebar/CaretakerSidebar";
import { RootState } from "@/redux/store";
import CaretakerProfile from "@/components/caretaker/profile/CaretakerProfile";
import { ICaretaker } from "@/types";

const CaretakerProfilePage = () => {
  const caretakerInfo = useSelector(
    (state: RootState) => state.auth.caretakerInfo
  );
  return (
    <div className="flex flex-col h-screen">
      <CaretakerNavbar />
      <div className="flex flex-1 overflow-hidden">
        <CaretakerSidebar />
        <main className="flex-1 overflow-y-auto p-4">
          {caretakerInfo ? (
            <CaretakerProfile caretaker={caretakerInfo as ICaretaker} />
          ) : (
            <div>No caretaker information available.</div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CaretakerProfilePage;
