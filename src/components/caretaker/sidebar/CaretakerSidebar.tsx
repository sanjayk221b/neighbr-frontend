import React from "react";
import { Link, useLocation } from "react-router-dom";
import { sidebarItems } from "@/constants/caretaker/sidebarItems";

const CaretakerSidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="w-64 h-full bg-background border-r">
      <nav className="p-4 pt-16">
        <ul className="space-y-5">
          {sidebarItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`block py-2 px-4 rounded-lg transition duration-200 text-xl font-medium ${
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
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
