import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import ResidentProtect from "@/components/hoc/ResidentProtect";
import { NLoader } from "@/components/ui/loader";
import ForgotPassword from "@/components/common/forgot-password/ForgotPassword";

const ResidentLoginPage = lazy(() => import("../pages/resident/ResidentLoginPage"));
const ResidentHomePage = lazy(() => import("../pages/resident/ResidentHomePage"));
const ResidentVisitorsPage = lazy(() => import("../pages/resident/ResidentVisitorsPage"));
const ResidentServicesPage = lazy(() => import("../pages/resident/ResidentServicesPage"));
const ResidentComplaintsPage = lazy(() => import("../pages/resident/ResidentComplaintsPage"));
const ResidentProfilePage = lazy(() => import("../pages/resident/ResidentProfilePage"));
const ResidentChatPage = lazy(() => import("../pages/resident/ResidentChatPage"));

const ResidentRoutes = () => {
  return (
    <Suspense fallback={<NLoader />}>
      <Routes>
        <Route path="/" element={<ResidentLoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={ResidentProtect(ResidentHomePage)} />
        <Route path="/visitors" element={ResidentProtect(ResidentVisitorsPage)} />
        <Route path="/services" element={ResidentProtect(ResidentServicesPage)} />
        <Route path="/complaints" element={ResidentProtect(ResidentComplaintsPage)} />
        <Route path="/profile" element={ResidentProtect(ResidentProfilePage)} />
        <Route path="/chats" element={ResidentProtect(ResidentChatPage)} />
      </Routes>
    </Suspense>
  );
};

export default ResidentRoutes;
