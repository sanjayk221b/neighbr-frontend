import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setResidentLogout } from "../../../redux/slices/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { residentLogout } from "../../../services/api/resident";
import { RootState } from "../../../redux/store";
import { FaEnvelope } from "react-icons/fa";
import { Menu, X, LogOut, User } from "lucide-react";
import { navItems } from "@/constants/resident/navItems";

const ResidentNavbar = () => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const residentInfo = useSelector(
    (state: RootState) => state.auth.residentInfo
  );

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    residentLogout();
    dispatch(setResidentLogout());
    navigate("/");
  };

  useEffect(() => {
    setProfileDropdownOpen(false);
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img
              src="/neighbr.webp"
              alt="Neighbr Logo"
              className="h-8 w-auto mr-2"
            />
            <span className="font-bold text-xl text-blue-800">Neighbr</span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <button
                key={item.name}
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition duration-300 ease-in-out flex items-center ${
                  location.pathname === item.path
                    ? "text-blue-600 bg-gray-100"
                    : "text-gray-600"
                }`}
                onClick={() => navigate(item.path)}
              >
                <item.icon className="mr-2" />
                {item.name}
              </button>
            ))}
            <button
              className="text-gray-600 hover:bg-gray-100 p-2 rounded-full transition duration-300 ease-in-out"
              onClick={() => navigate("/chats")}
              title="Messages"
            >
              <FaEnvelope className="h-5 w-5" />
            </button>
            <div className="relative">
              <button
                className="flex items-center text-gray-600 hover:bg-gray-100 p-2 rounded-full transition duration-300 ease-in-out"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              >
                <img
                  src={residentInfo?.image}
                  alt="Profile"
                  className="h-8 w-8 rounded-full border-2 border-gray-200"
                />
              </button>
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 flex items-center"
                    onClick={() => navigate("/profile")}
                  >
                    <User className="mr-2" size={18} />
                    Profile
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 flex items-center"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2" size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button
              className="text-gray-600 hover:bg-gray-100 p-2 rounded-full transition duration-300 ease-in-out mr-2"
              onClick={() => navigate("/chats")}
              title="Messages"
            >
              <FaEnvelope className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition duration-300 ease-in-out"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.name}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left flex items-center ${
                  location.pathname === item.path
                    ? "text-blue-600 bg-gray-100"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => navigate(item.path)}
              >
                <item.icon className="mr-2" />
                {item.name}
              </button>
            ))}
            <button
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100 w-full text-left flex items-center"
              onClick={() => navigate("/profile")}
            >
              <User className="mr-2" size={18} />
              Profile
            </button>
            <button
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100 w-full text-left flex items-center"
              onClick={handleLogout}
            >
              <LogOut className="mr-2" size={18} />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default ResidentNavbar;
