import AdminNavbar from "../../components/admin/navbar/AdminNavbar";
import AdminSidebar from "../../components/admin/sidebar/AdminSidebar";

const AdminDashboardPage = () => {
  // Dummy data for demonstration
  const stats = [
    { title: "Total Users", value: 1234 },
    { title: "Active Caretakers", value: 56 },
    { title: "Total Apartments", value: 78 },
    { title: "Pending Requests", value: 9 },
  ];

  const recentActivity = [
    { action: "New user registered", user: "John Doe", time: "2 minutes ago" },
    {
      action: "Maintenance request",
      user: "Alice Johnson",
      time: "3 hours ago",
    },
    { action: "Payment received", user: "Bob Wilson", time: "5 hours ago" },
  ];

  return (
    <div className="flex flex-col h-screen">
      <AdminNavbar />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="container mx-auto px-6 py-8">
            <h3 className="text-3xl font-medium">Dashboard</h3>

            <div className="mt-4">
              <div className="flex flex-wrap -mx-6">
                {stats.map((stat, index) => (
                  <div key={index} className="w-full px-6 sm:w-1/2 xl:w-1/4">
                    <div className="flex items-center px-5 py-6 shadow-sm rounded-md">
                      <div className="p-3 rounded-full bg-opacity-75"></div>
                      <div className="mx-5">
                        <h4 className="text-2xl font-semibold">
                          {stat.value}
                        </h4>
                        <div>{stat.title}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h4>Recent Activity</h4>
              <div className="mt-4">
                <div className="shadow rounded-md overflow-hidden">
                  <ul className="divide-y">
                    {recentActivity.map((activity, index) => (
                      <li key={index} className="px-6 py-4 hover:bg-gray-50">
                        <div className="flex items-center">
                          <div className="ml-3">
                            <p className="text-sm font-medium">
                              {activity.action}
                            </p>
                            <p className="text-sm">
                              {activity.user} - {activity.time}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
