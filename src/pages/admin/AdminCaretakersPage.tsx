import AdminCaretakers from "../../components/admin/caretaker/AdminCaretakers";
import AdminNavbar from "../../components/admin/navbar/AdminNavbar";
import AdminSidebar from "../../components/admin/sidebar/AdminSidebar";

const AdminCaretakersPage = () => {
  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <AdminNavbar />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <AdminCaretakers />
        </main>
      </div>
    </div>
  );
};

export default AdminCaretakersPage;
