import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface HeaderProps {
  opacity: any;
  scale: any;
}

const Header = ({ opacity, scale }: HeaderProps) => {
  return (
    <header className="relative overflow-hidden pt-16 pb-32">
      <motion.div
        style={{ opacity, scale }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="text-center mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold">
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                NEIGHBR
              </span>
              <span className="block text-gray-900 text-4xl sm:text-5xl md:text-6xl mt-4">
                BRINGING COMMUNITIES TOGETHER
              </span>
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 max-w-3xl mx-auto text-xl text-gray-600"
          >
            Elevate your gated community experience with our comprehensive
            management solution. Foster connections, enhance security, and
            streamline operations seamlessly.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex justify-center space-x-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 rounded-full shadow-lg">
                Get Started
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => {
                  document
                    .getElementById("features")!
                    .scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-white text-blue-600 hover:bg-gray-50 text-lg px-8 py-4 rounded-full shadow-lg"
              >
                Learn More
                <ChevronDown className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
