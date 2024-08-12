import AdminNavbar from "../../components/admin/navbar/AdminNavbar";
import AdminOwners from "../../components/admin/resident/AdminResidents";
import AdminSidebar from "../../components/admin/sidebar/AdminSidebar";

const AdminResidentsPage = () => {
  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <AdminNavbar />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <AdminOwners />
        </main>
      </div>
    </div> 
  );
};

export default AdminResidentsPage;