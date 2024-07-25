import { useDispatch } from "react-redux";
import { setCaretakerLogout } from "../../redux/slices/authSlice";
import { caretakerLogout } from "../../services/api/caretaker";

const CaretakerNavbar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    caretakerLogout();
    dispatch(setCaretakerLogout());
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-md">
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
          <div className="pr-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 shadow-sm"
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
