import React from "react";
import AdminNavbar from "@/components/admin/navbar/AdminNavbar";
import AdminSidebar from "@/components/admin/sidebar/AdminSidebar";
import AdminDashboard from "@/components/admin/dashboard/AdminDashboard";

const AdminDashboardPage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <AdminNavbar />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <AdminDashboard />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
