import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const ResidentProtect = (Component: React.ComponentType) => {
  const { residentLoggedIn } = useSelector((state: RootState) => state.auth);
  return residentLoggedIn ? <Component /> : <Navigate to="/resident/" replace />;
};

export default ResidentProtect;
