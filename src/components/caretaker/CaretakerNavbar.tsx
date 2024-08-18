import { useDispatch } from "react-redux";
import { setCaretakerLogout } from "../../redux/slices/authSlice";
import { caretakerLogout } from "../../services/api/caretaker";
import { ModeToggle } from "../ui/theme/mode-toggle";

const CaretakerNavbar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    caretakerLogout();
    dispatch(setCaretakerLogout());
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
            <button
              className="py-2 px-4 rounded-md transition duration-300 shadow-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default CaretakerNavbar;
