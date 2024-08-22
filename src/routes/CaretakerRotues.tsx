import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ThemeProvider } from "@/components/ui/theme/theme-provider";
import CaretakerProtect from "@/components/hoc/CaretakerProtect";
import { NLoader } from "@/components/ui/loader";

const CaretakerLoginPage = lazy(() => import("../pages/caretaker/CaretakerLoginPage"));
const CaretakerHomePage = lazy(() => import("../pages/caretaker/CaretakerHomePage"));
const CaretakerVisitorsPage = lazy(() => import("../pages/caretaker/CaretakerVisitorsPage"));
const CaretakerServicesPage = lazy(() => import("../pages/caretaker/CaretakerServicesPage"));
const CaretakerComplaintsPage = lazy(() => import("../pages/caretaker/CaretakerComplaintsPage"));
const CaretakerWorkersPage = lazy(() => import("../pages/caretaker/CaretakerWorkersPage"))
const CaretakerProfilePage = lazy(() => import("../pages/caretaker/CaretakerProfilePage"))

const CaretakerRoutes = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Suspense fallback={<NLoader />}>
        <Routes>
          <Route path="/" element={<CaretakerLoginPage />} />
          <Route path="/home" element={CaretakerProtect(CaretakerHomePage)} />
          <Route path="/visitors" element={CaretakerProtect(CaretakerVisitorsPage)} />
          <Route path="/workers" element={CaretakerProtect(CaretakerWorkersPage)} />
          <Route path="/maintenance" element={CaretakerProtect(CaretakerServicesPage)} />
          <Route path="/complaints" element={CaretakerProtect(CaretakerComplaintsPage)} />
          <Route path="/profile" element={CaretakerProtect(CaretakerProfilePage)} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
};

export default CaretakerRoutes;
