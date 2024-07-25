import React from "react";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: "/admin/dashboard", label: "Dashboard" },
    { path: "/admin/owners", label: "Residents" },
    { path: "/admin/caretakers", label: "Caretakers" },
    // { path: "#", label: "Announcements" },
    // { path: "#", label: "Feedback" },
    // { path: "#", label: "Community" },
    // { path: "#", label: "Messages" },
  ];

  return (
    <div className="font-medium text-xl pt-16 w-64 min-h-screen p-4">
      <nav>
        <ul className="space-y-5">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`block py-2 px-4 rounded transition duration-200 ${
                  location.pathname === item.path
                    ? "bg-gray-600 text-white"
                    : "hover:bg-gray-700"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
