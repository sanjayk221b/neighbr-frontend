import { Route, Routes } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import ResidentRoutes from "./ResidentRoutes";
import CaretakerRotues from "./CaretakerRotues";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/*" element={<ResidentRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/caretaker/*" element={<CaretakerRotues />} />
    </Routes>
  );
};

export default AppRouter;
  