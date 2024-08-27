import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ThemeProvider } from "@/components/ui/theme/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import AdminProtect from "@/components/hoc/AdminProtect";
import { NLoader } from "@/components/ui/loader";
import AdminCommunityPage from "@/pages/admin/AdminCommunityPage";

const AdminLoginPage = lazy(() => import("../pages/admin/AdminLoginPage"));
const AdminDashboardPage = lazy(() => import("../pages/admin/AdminDashboardPage"));
const AdminOwnersPage = lazy(() => import("../pages/admin/AdminResidentsPage"));
const AdminCaretakersPage = lazy(() => import("../pages/admin/AdminCaretakersPage"));
const AdminWorkersPage = lazy(() => import("../pages/admin/AdminWorkersPage"));
const AdminComplaintsPage = lazy(() => import("../pages/admin/AdminComplaintsPage"));

const AdminRoutes = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <TooltipProvider>
      <Suspense fallback={<NLoader/>}>
        <Routes>
          <Route path="/"element={<AdminLoginPage />}/>
          <Route path="/dashboard"element={AdminProtect(AdminDashboardPage)}/>
          <Route path="/caretakers" element={AdminProtect(AdminCaretakersPage)} />
          <Route path="/owners" element={AdminProtect(AdminOwnersPage)} />
          <Route path="/workers" element={AdminProtect(AdminWorkersPage)} />
          <Route path="/complaints" element={AdminProtect(AdminComplaintsPage)} />
          <Route path="/community" element={AdminProtect(AdminCommunityPage)} />
        </Routes>
        </Suspense>
      </TooltipProvider>
    </ThemeProvider>
  );
};

export default AdminRoutes;
