import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminOwners from "../../components/admin/AdminResidents";
import AdminSidebar from "../../components/admin/AdminSidebar";

const AdminResidentsPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <AdminNavbar />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto ">
          <AdminOwners />
        </main>
      </div>
    </div> 
  );
};

export default AdminResidentsPage;