import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const CaretakerProtect = (Component: React.ComponentType) => {
  const { caretakerLoggedIn } = useSelector((state: RootState) => state.auth);
  return caretakerLoggedIn ? <Component /> : <Navigate to="/caretaker/" replace />;
};

export default CaretakerProtect;
