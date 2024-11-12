import { RootState } from "@/redux/store";
import { User, MessageSquare, Bell } from "lucide-react";
import { useSelector } from "react-redux";

const CommunityProfileCard = () => {
  const residentInfo = useSelector(
    (state: RootState) => state.auth.residentInfo
  );

  return (
    <div className="flex space-x-4">
      <div className="bg-white rounded-lg shadow-md p-4 w-56">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-gray-300 rounded-full mb-4">
            <img
              src={residentInfo?.image}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <h2 className="text-xl font-semibold">{residentInfo?.name}</h2>
          <p className="text-gray-500">Flat {residentInfo?.apartmentNumber}</p>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2">
            <li>
              <a
                href="/resident/profile"
                className="flex items-center text-gray-700 hover:text-blue-500"
              >
                <User className="mr-2" size={20} />
                Profile
              </a>
            </li>
            <li>
              <a
                href="/resident/chats"
                className="flex items-center text-gray-700 hover:text-blue-500"
              >
                <MessageSquare className="mr-2" size={20} />
                Messages
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center text-gray-700 hover:text-blue-500"
              >
                <Bell className="mr-2" size={20} />
                Notifications
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default CommunityProfileCard;
