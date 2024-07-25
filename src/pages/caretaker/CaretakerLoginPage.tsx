import CaretakerLogin from "../../components/caretaker/CaretakerLogin";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CaretakerLoginPage = () => {
  const { caretakerLoggedIn } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (caretakerLoggedIn) {
      navigate("/caretaker/home");
    }
  });
  return <CaretakerLogin />;
};

export default CaretakerLoginPage;
