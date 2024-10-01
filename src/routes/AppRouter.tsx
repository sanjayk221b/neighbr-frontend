import { Route, Routes } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import ResidentRoutes from "./ResidentRoutes";
import CaretakerRotues from "./CaretakerRotues";
import UserRoutes from "./UserRotues";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/*" element={<UserRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/resident/*" element={<ResidentRoutes />} />
      <Route path="/caretaker/*" element={<CaretakerRotues />} />
    </Routes>
  );
};

export default AppRouter;
