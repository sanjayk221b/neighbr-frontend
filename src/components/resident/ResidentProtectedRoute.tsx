import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const ResidentProtectedRoute = () => {
  const { residentLoggedIn } = useSelector((state: RootState) => state.auth);
  return residentLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};

export default ResidentProtectedRoute;