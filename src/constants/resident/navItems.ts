import {
  FaHome,
  FaUsers,
  FaCog,
  FaExclamationCircle,
  // FaBullhorn,
} from "react-icons/fa";

export const navItems = [
  { name: "Home", path: "/resident/home", icon: FaHome },
  { name: "Visitors", path: "/resident/visitors", icon: FaUsers },
  { name: "Services", path: "/resident/services", icon: FaCog },
  { name: "Complaints", path: "/resident/complaints", icon: FaExclamationCircle },
  // { name: "Announcements", path: "/announcements", icon: FaBullhorn },
];
