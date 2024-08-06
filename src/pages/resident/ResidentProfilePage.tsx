import { useSelector } from "react-redux";
import ResidentNavbar from "../../components/resident/navbar/ResidentNavbar";
import ResidentProfile from "../../components/resident/profile/ResidentProfile";
import { RootState } from "../../redux/store";

const ResidentProfilePage = () => {
  const residentInfo = useSelector(
    (state: RootState) => state.auth.residentInfo
  );
  return (
    <>
      <ResidentNavbar />
      <ResidentProfile resident={residentInfo} />
    </>
  );
};

export default ResidentProfilePage;
