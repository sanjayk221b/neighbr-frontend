import { Route, Routes } from "react-router-dom";
import ResidentLoginPage from "../pages/resident/ResidentLoginPage";
import ResidentHomePage from "../pages/resident/ResidentHomePage";
import ResidentVisitorsPage from "../pages/resident/ResidentVisitorsPage";
import ResidentServicesPage from "../pages/resident/ResidentServicesPage";
import ResidentComplaintsPage from "../pages/resident/ResidentComplaintsPage";
import ResidentProfilePage from "../pages/resident/ResidentProfilePage";
import ResidentChatPage from "../pages/resident/ResidentChatPage";
import ResidentCommunityPage from "@/pages/resident/ResidentCommunityPage";
import ResidentProtect from "@/components/hoc/ResidentProtect";

const ResidentRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ResidentLoginPage />} />
      <Route path="/home" element={ResidentProtect(ResidentHomePage)} />
      <Route path="/visitors" element={ResidentProtect(ResidentVisitorsPage)} />
      <Route path="/services" element={ResidentProtect(ResidentServicesPage)} />
      <Route path="/complaints" element={ResidentProtect(ResidentComplaintsPage)} />
      <Route path="/profile" element={ResidentProtect(ResidentProfilePage)} />
      <Route path="/chats" element={ResidentProtect(ResidentChatPage)} />
      <Route path="/community" element={ResidentProtect(ResidentCommunityPage)} />
    </Routes>
  );
};

export default ResidentRoutes;
