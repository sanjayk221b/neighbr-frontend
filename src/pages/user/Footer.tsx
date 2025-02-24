import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Logo & Description */}
          <div className="space-y-2">
            <div className="flex items-center">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2"
                >
                  <rect width="40" height="40" rx="8" fill="#4F46E5" />
                  <path d="M20 10L28.6603 25H11.3397L20 10Z" fill="white" />
                  <circle cx="20" cy="27" r="3" fill="white" />
                </svg>
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Neighbr
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Bringing communities together, one neighborhood at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <ul className="space-y-1 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="flex justify-center space-x-4">
            <a
              href="https://www.linkedin.com/in/sanjaykeloth"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              <FaFacebookF size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/sanjaykeloth"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              <FaTwitter size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/sanjaykeloth"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              <FaLinkedinIn size={18} />
            </a>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-6 pt-4 border-t border-gray-800 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Neighbr. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
