import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setResidentLogout } from "../../redux/slices/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { residentLogout } from "../../services/api/resident";
import { RootState } from "../../redux/store";
import { FaEnvelope } from "react-icons/fa";

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

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Visitors", path: "/visitors" },
    { name: "Services", path: "/services" },
    { name: "Complaints", path: "/complaints" },
    { name: "Community", path: "/community" },
  ];

  useEffect(() => {
    setProfileDropdownOpen(false);
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <nav className="bg-white shadow-lg">
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
                className={`px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-blue-800 relative group`}
                onClick={() => navigate(item.path)}
              >
                {item.name}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-800 transform origin-left transition-all duration-300 ease-out ${location.pathname === item.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </button>
            ))}
            <button
              className="text-gray-600 hover:text-blue-800"
              onClick={() => navigate("/chats")}
              title="Messages"
            >
              <FaEnvelope className="h-5 w-5" />
            </button>
            <div className="relative">
              <button
                className="flex items-center text-gray-600 hover:text-blue-800"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              >
                <img
                  src={residentInfo?.image}
                  alt="Profile"
                  className="h-8 w-8 rounded-full"
                />
              </button>
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg py-1 z-20">
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-800"
                    onClick={() => navigate("/profile")}
                  >
                    Profile
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-800"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button
              className="text-gray-600 hover:text-blue-800 focus:outline-none"
              onClick={() => navigate("/chats")}
              title="Messages"
            >
              <FaEnvelope className="h-5 w-5 mr-4" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-blue-800 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.name}
                className={`block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-800 w-full text-left relative group`}
                onClick={() => navigate(item.path)}
              >
                {item.name}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-800 transform origin-left transition-all duration-300 ease-out ${location.pathname === item.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </button>
            ))}
            <button
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-800 w-full text-left"
              onClick={() => navigate("/profile")}
            >
              Profile
            </button>
            <button
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-800 w-full text-left"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default ResidentNavbar;