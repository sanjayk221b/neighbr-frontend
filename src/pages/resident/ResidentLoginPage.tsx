import OwnerLogin from "../../components/resident/login/ResidentLogin";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OwnerLoginPage = () => {
  const { residentLoggedIn } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (residentLoggedIn) {
      navigate("/resident/home");
    }
  });
  return (
    <div className="bg-gradient-to-br from-gray-100 to-blue-200">
      <OwnerLogin />
    </div>
  );
};

export default OwnerLoginPage;
