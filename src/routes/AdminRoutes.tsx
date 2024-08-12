import { Route, Routes } from "react-router-dom";
import AdminLoginPage from "../pages/admin/AdminLoginPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminProtectedRoute from "../components/admin/AdminProtectedRoute";
import AdminOwnersPage from "../pages/admin/AdminResidentsPage";
import AdminCaretakersPage from "../pages/admin/AdminCaretakersPage";
import { ThemeProvider } from "@/components/theme-provider";
import AdminComplaintsPage from "@/pages/admin/AdminComplaintsPage";
import { TooltipProvider } from "@/components/ui/tooltip";

const AdminRoutes = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <TooltipProvider>
        <Routes>
          <Route path="/" element={<AdminLoginPage />} />
          <Route element={<AdminProtectedRoute />}>
            <Route path="/dashboard" element={<AdminDashboardPage />} />
            <Route path="/caretakers" element={<AdminCaretakersPage />} />
            <Route path="/owners" element={<AdminOwnersPage />} />
            <Route path="/complaints" element={<AdminComplaintsPage />} />
          </Route>
        </Routes>
      </TooltipProvider>
    </ThemeProvider>
  );
};

export default AdminRoutes;
