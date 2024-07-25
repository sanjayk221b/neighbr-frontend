import OwnerLogin from "../../components/resident/ResidentLogin";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OwnerLoginPage = () => {
  const { residentLoggedIn } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (residentLoggedIn) {
      navigate("/home");
    }
  });
  return (
    <div>
      <OwnerLogin />
    </div>
  );
};

export default OwnerLoginPage;
