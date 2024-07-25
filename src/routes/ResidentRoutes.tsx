import { Route, Routes } from "react-router-dom";
import ResidentLoginPage from "../pages/resident/ResidentLoginPage";
import ResidentHomePage from "../pages/resident/ResidentHomePage";
import ResidentVisitorsPage from "../pages/resident/ResidentVisitorsPage";
import ResidentProtectedRoute from "../components/resident/ResidentProtectedRoute";
import ResidentServicesPage from "../pages/resident/ResidentServicesPage";
import ResidentComplaintsPage from "../pages/resident/ResidentComplaintsPage";
import ResidentProfilePage from "../pages/resident/ResidentProfilePage";
import ResidentChatPage from "../pages/resident/ResidentChatPage";

const ResidentRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ResidentLoginPage />} />
      <Route element={<ResidentProtectedRoute />}>
        <Route path="/home" element={<ResidentHomePage />} />
        <Route path="/visitors" element={<ResidentVisitorsPage />} />
        <Route path="/services" element={<ResidentServicesPage />} />
        <Route path="/complaints" element={<ResidentComplaintsPage />} />
        <Route path="/profile" element={<ResidentProfilePage />} />
        <Route path="/chats" element={<ResidentChatPage />} />
      </Route>
    </Routes>
  );
};

export default ResidentRoutes;
