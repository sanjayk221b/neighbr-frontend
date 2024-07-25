import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const AdminProtectedRoute = () => {
  const { adminLoggedIn } = useSelector((state: RootState) => state.auth);
  return adminLoggedIn ? <Outlet /> : <Navigate to="/admin/" replace />;
};

export default AdminProtectedRoute;
