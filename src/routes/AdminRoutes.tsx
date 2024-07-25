import { Route, Routes } from "react-router-dom";
import AdminLoginPage from "../pages/admin/AdminLoginPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminProtectedRoute from "../components/admin/AdminProtectedRoute";
import AdminOwnersPage from "../pages/admin/AdminResidentsPage";
import AdminCaretakersPage from "../pages/admin/AdminCaretakersPage";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLoginPage />} />
      <Route element={<AdminProtectedRoute />}>
        <Route path="/dashboard" element={<AdminDashboardPage />} />
        <Route path="/caretakers" element={<AdminCaretakersPage />} />
        <Route path="/owners" element={<AdminOwnersPage />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;