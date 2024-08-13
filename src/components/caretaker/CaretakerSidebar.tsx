import React from "react";
import { Link, useLocation } from "react-router-dom";
import { sidebarItems } from "@/constants/caretaker/sidebarItems";

const CaretakerSidebar: React.FC = () => {
  const location = useLocation();


  return (
    <div className="font-medium text-xl pt-16 bg-gray-800 text-white w-64 min-h-screen p-4">
      <nav>
        <ul className="space-y-5">
          {sidebarItems.map((item) => (
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

export default CaretakerSidebar;
