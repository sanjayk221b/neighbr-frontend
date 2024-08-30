import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const AdminProtect = (Component: React.ComponentType) => {
  const { adminLoggedIn } = useSelector((state: RootState) => state.auth);
  return adminLoggedIn ? <Component /> : <Navigate to="/admin/" replace />;
};

export default AdminProtect;
