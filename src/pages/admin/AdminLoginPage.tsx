import AdminLogin from "../../components/admin/login/AdminLogin";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminLoginPage = () => {
  const { adminLoggedIn } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (adminLoggedIn) {
      navigate("/admin/dashboard");
    }
  }, [adminLoggedIn]);

  return (
    <div>
      <AdminLogin />
    </div>
  );
};

export default AdminLoginPage;
