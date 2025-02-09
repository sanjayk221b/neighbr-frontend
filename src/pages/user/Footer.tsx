import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center">
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
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Neighbr
              </span>
            </div>
            <p className="text-gray-400">
              Bringing communities together, one neighborhood at a time.
            </p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Neighbr. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
