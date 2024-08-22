import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCaretakerLogout } from "../../../redux/slices/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { caretakerLogout } from "../../../services/api/caretaker";
import { RootState } from "@/redux/store";
import { FaEnvelope } from "react-icons/fa";
import { Menu, X, LogOut, User } from "lucide-react";
import { ModeToggle } from "../../ui/theme/mode-toggle";
import { Button } from "../../ui/button";

const CaretakerNavbar = () => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const caretakerInfo = useSelector(
    (state: RootState) => state.auth.caretakerInfo
  );

  const handleLogout = () => {
    caretakerLogout();
    dispatch(setCaretakerLogout());
    navigate("/");
  };

  useEffect(() => {
    setProfileDropdownOpen(false);
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <nav className="border-b shadow-md">
      <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 ">
            <div className="flex items-center -ml-28">
              <img
                className="h-10 w-auto"
                src="/neighbr-text.webp"
                alt="Logo"
              />
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4 ">
            <Button
              variant="ghost"
              onClick={() => navigate("/chats")}
              title="Messages"
            >
              <FaEnvelope className="h-5 w-5" />
            </Button>
            <ModeToggle />
            <div className="relative">
              <Button
                variant="ghost"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              >
                <img
                  src={caretakerInfo?.imageUrl}
                  alt="Profile"
                  className="h-8 w-8 rounded-full border"
                />
              </Button>
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-20">
                  <Button
                    variant="ghost"
                    className="w-full text-left"
                    onClick={() => navigate("/profile")}
                  >
                    <User className="mr-2" size={18} />
                    Profile
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full text-left"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2" size={18} />
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              onClick={() => navigate("/chats")}
              title="Messages"
            >
              <FaEnvelope className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Button
              variant="ghost"
              className="w-full text-left"
              onClick={() => navigate("/profile")}
            >
              <User className="mr-2" size={18} />
              Profile
            </Button>
            <Button
              variant="ghost"
              className="w-full text-left"
              onClick={handleLogout}
            >
              <LogOut className="mr-2" size={18} />
              Logout
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default CaretakerNavbar;
