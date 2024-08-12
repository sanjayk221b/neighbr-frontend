import { Routes, Route } from "react-router-dom";
import CaretakerLoginPage from "../pages/caretaker/CaretakerLoginPage";
import CaretakerHomePage from "../pages/caretaker/CaretakerHomePage";
import CaretakerProtectedRoute from "../components/caretaker/CaretakerProtectedRoute";
import CaretakerVisitorsPage from "../pages/caretaker/CaretakerVisitorsPage";
import CaretakerServicesPage from "../pages/caretaker/CaretakerServicesPage";
import CaretakerComplaintsPage from "../pages/caretaker/CaretakerComplaintsPage";
import { ThemeProvider } from "@/components/theme-provider";

const CaretakerRotues = () => {
  return (
    // <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<CaretakerLoginPage />} />
        <Route element={<CaretakerProtectedRoute />}>
          <Route path="/home" element={<CaretakerHomePage />} />
          <Route path="/visitors" element={<CaretakerVisitorsPage />} />
          <Route path="/maintenance" element={<CaretakerServicesPage />} />
          <Route path="/complaints" element={<CaretakerComplaintsPage />} />
        </Route>
      </Routes>
    // </ThemeProvider>
  );
};

export default CaretakerRotues;
