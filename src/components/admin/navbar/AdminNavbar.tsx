import { useDispatch } from "react-redux";
import { setAdminLogout } from "../../../redux/slices/authSlice";
import { adminLogout } from "../../../services/api/admin";
import { ModeToggle } from "../../mode-toggle";
import { Button } from "../../ui/button";

const AdminNavbar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    adminLogout();
    dispatch(setAdminLogout());
  };

  return (
    <nav className="border-b shadow-md">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 pl-4">
            <div className="flex items-center">
              <img
                className="h-10 w-auto"
                src="/neighbr-text.webp"
                alt="Logo"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4 pr-4">
            <ModeToggle />
            <Button
              className="font-bold py-2 px-4 rounded-md transition duration-300 shadow-sm"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
