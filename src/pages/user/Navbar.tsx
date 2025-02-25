import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  setIsDemoModalOpen: (isOpen: boolean) => void;
  isNavbarSticky: boolean;
}

const Navbar = ({ setIsDemoModalOpen, isNavbarSticky }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav
      className={`transition-all duration-300 ${
        isNavbarSticky
          ? "fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      } z-50`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-3"
              >
                <rect width="40" height="40" rx="8" fill="#4F46E5" />
                <path d="M20 10L28.6603 25H11.3397L20 10Z" fill="white" />
                <circle cx="20" cy="27" r="3" fill="white" />
              </svg>
            </motion.div>
            <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Neighbr
            </span>
          </motion.div>
          <div className="hidden md:flex space-x-8">
            <a
              href="#features"
              className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
            >
              Features
            </a>
            <a
              href="#about"
              className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
            >
              Contact
            </a>
          </div>
          <motion.div
            className="hidden md:block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => setIsDemoModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2"
            >
              Try Demo
            </Button>
          </motion.div>
          <div className="md:hidden">
            <Button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white/90 backdrop-blur-md shadow-lg absolute top-20 left-0 right-0 z-40 overflow-hidden"
        >
          <div className="px-4 py-6 space-y-4">
            <a
              href="#features"
              className="block text-gray-600 hover:text-blue-600"
            >
              Features
            </a>
            <a
              href="#about"
              className="block text-gray-600 hover:text-blue-600"
            >
              About
            </a>
            <a
              href="#contact"
              className="block text-gray-600 hover:text-blue-600"
            >
              Contact
            </a>
            <Button
              onClick={() => setIsDemoModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white w-full"
            >
              Try Demo
            </Button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
