import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const CaretakerProtectedRoute = () => {
  const { caretakerLoggedIn } = useSelector((state: RootState) => state.auth);
  return caretakerLoggedIn ? <Outlet /> : <Navigate to="/caretaker/" replace />;
};

export default CaretakerProtectedRoute;
