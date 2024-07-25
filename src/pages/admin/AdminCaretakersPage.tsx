import AdminCaretakers from "../../components/admin/AdminCaretakers";
import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminSidebar from "../../components/admin/AdminSidebar";

const AdminCaretakersPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <AdminNavbar />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto ">
          <AdminCaretakers />
        </main>
      </div>
    </div>
  );
};

export default AdminCaretakersPage;
