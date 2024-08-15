import { Route, Routes } from "react-router-dom";
import AdminLoginPage from "../pages/admin/AdminLoginPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminOwnersPage from "../pages/admin/AdminResidentsPage";
import AdminCaretakersPage from "../pages/admin/AdminCaretakersPage";
import { ThemeProvider } from "@/components/theme-provider";
import AdminComplaintsPage from "@/pages/admin/AdminComplaintsPage";
import { TooltipProvider } from "@/components/ui/tooltip";
import AdminWorkersPage from "@/pages/admin/AdminWorkersPage";
import AdminProtect from "@/components/hoc/AdminProtect";

const AdminRoutes = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <TooltipProvider>
        <Routes>
          <Route path="/" element={<AdminLoginPage />} />
          <Route path="/dashboard" element={AdminProtect(AdminDashboardPage)} />
          <Route path="/caretakers" element={AdminProtect(AdminCaretakersPage) } />
          <Route path="/owners" element={AdminProtect(AdminOwnersPage) } />
          <Route path="/workers" element={AdminProtect(AdminWorkersPage) } />
          <Route path="/complaints" element={AdminProtect(AdminComplaintsPage) } />
        </Routes>
      </TooltipProvider>
    </ThemeProvider>
  );
};

export default AdminRoutes;
