import { Routes, Route } from "react-router-dom";
import CaretakerLoginPage from "../pages/caretaker/CaretakerLoginPage";
import CaretakerHomePage from "../pages/caretaker/CaretakerHomePage";
import CaretakerVisitorsPage from "../pages/caretaker/CaretakerVisitorsPage";
import CaretakerServicesPage from "../pages/caretaker/CaretakerServicesPage";
import CaretakerComplaintsPage from "../pages/caretaker/CaretakerComplaintsPage";
import CaretakerProtect from "@/components/hoc/CaretakerProtect";
import { ThemeProvider } from "@/components/theme-provider";

const CaretakerRotues = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Routes>
      <Route path="/" element={<CaretakerLoginPage />} />
        <Route path="/home" element={CaretakerProtect(CaretakerHomePage)} />
        <Route path="/visitors" element={CaretakerProtect(CaretakerVisitorsPage)} />
        <Route path="/maintenance" element={CaretakerProtect(CaretakerServicesPage)} />
        <Route path="/complaints" element={CaretakerProtect(CaretakerComplaintsPage)} />
      </Routes>
    </ThemeProvider>
  );
};

export default CaretakerRotues;
