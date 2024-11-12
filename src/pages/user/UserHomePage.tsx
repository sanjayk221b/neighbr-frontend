import { useState, useEffect, useCallback } from "react";
import {
  Shield,
  Users,
  Wrench,
  MessageSquare,
  Calendar,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const UserHomePage = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isNavbarSticky, setIsNavbarSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setIsNavbarSticky(window.scrollY > 0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const features = [
    {
      icon: Shield,
      title: "Enhanced Security",
      description: "State-of-the-art visitor management for gated communities",
    },
    {
      icon: Users,
      title: "Community Engagement",
      description: "Foster connections with community events and forums",
    },
    {
      icon: Wrench,
      title: "Swift Maintenance",
      description:
        "Rapid response to maintenance requests for a worry-free living",
    },
    {
      icon: MessageSquare,
      title: "Open Communication",
      description: "Efficient handling of resident feedback and concerns",
    },
    {
      icon: Calendar,
      title: "Convenient Services",
      description: "Easy scheduling for amenities and community services",
    },
  ];

  const DemoModal = () => (
    <Dialog open={isDemoModalOpen} onOpenChange={setIsDemoModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Experience Neighbr</DialogTitle>
          <DialogDescription>
            Choose a role to explore our community management system.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button
            onClick={() => (window.location.href = "/demo/resident")}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Resident Demo
          </Button>
          <Button
            onClick={() => (window.location.href = "/demo/caretaker")}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Caretaker Demo
          </Button>
          <Button
            onClick={() => (window.location.href = "/demo/admin")}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Admin Demo
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  const NavLink = ({ href, children }) => (
    <a
      href={href}
      className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
    >
      {children}
    </a>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav
        className={`transition-all duration-300 ${
          isNavbarSticky
            ? "fixed top-0 left-0 right-0 bg-white shadow-md"
            : "bg-transparent"
        } z-50`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
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
              <span className="font-bold text-2xl text-blue-800">Neighbr</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <NavLink href="#features">Features</NavLink>
              <NavLink href="#about">About</NavLink>
              <NavLink href="#contact">Contact</NavLink>
            </div>
            <div className="hidden md:block">
              <Button
                onClick={() => setIsDemoModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Try Demo
              </Button>
            </div>
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
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white shadow-lg absolute top-20 left-0 right-0 z-40"
          >
            <div className="px-4 py-6 space-y-4">
              <NavLink href="#features">Features</NavLink>
              <NavLink href="#about">About</NavLink>
              <NavLink href="#contact">Contact</NavLink>
              <Button
                onClick={() => setIsDemoModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full"
              >
                Try Demo
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="relative overflow-hidden pt-16 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mt-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl font-extrabold text-gray-900 sm:text-6xl md:text-7xl"
            >
              <span className="block">NEIGHBR</span>
              <span className="block text-blue-600">
                BRINGING COMMUNITIES TOGETHER
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
            >
              Elevate your gated community experience with our comprehensive
              management solution. Foster connections, enhance security, and
              streamline operations seamlessly.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 flex justify-center"
            >
              <Button
                onClick={() => setIsDemoModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3"
              >
                Get Started
              </Button>
            </motion.div>
          </div>
        </div>
        <div className="absolute inset-0 z-0">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1200 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            <rect width="1200" height="600" fill="#E0E7FF" />
            <path d="M0 400L1200 600V0H0V400Z" fill="#C7D2FE" />
            <path d="M0 300L1200 500V0H0V300Z" fill="#A5B4FC" />
            <rect x="100" y="100" width="200" height="200" fill="#4F46E5" />
            <rect x="900" y="300" width="200" height="200" fill="#4F46E5" />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-200 mix-blend-multiply" />
        </div>
      </header>

      <main>
        <section id="features" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
              Empowering Gated Communities
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:flex lg:items-center lg:justify-between">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="lg:w-1/2"
              >
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
                  Why Choose Neighbr?
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Neighbr is more than just a management system. We're committed
                  to fostering thriving, connected communities where residents
                  feel safe, valued, and engaged.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <Shield className="h-6 w-6 text-green-500 mr-2" />
                    <span>Industry-leading security measures</span>
                  </li>
                  <li className="flex items-center">
                    <Users className="h-6 w-6 text-green-500 mr-2" />
                    <span>Robust community engagement tools</span>
                  </li>
                  <li className="flex items-center">
                    <Wrench className="h-6 w-6 text-green-500 mr-2" />
                    <span>Efficient property management solutions</span>
                  </li>
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mt-10 lg:mt-0 lg:w-1/2"
              >
                <svg
                  width="100%"
                  height="auto"
                  viewBox="0 0 400 300"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="400" height="300" fill="#E0E7FF" />
                  <path d="M0 100L400 200V0H0V100Z" fill="#C7D2FE" />
                  <rect x="50" y="50" width="100" height="100" fill="#4F46E5" />
                  <rect
                    x="250"
                    y="150"
                    width="100"
                    height="100"
                    fill="#4F46E5"
                  />
                  <circle cx="200" cy="150" r="50" fill="#4F46E5" />
                </svg>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl font-extrabold mb-4"
            >
              Ready to Transform Your Community?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl mb-8"
            >
              Get in touch with us to learn how Neighbr can elevate your gated
              community experience.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Button className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
                Contact Us
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Neighbr</h3>
              <p className="text-gray-400">
                Bringing communities together, one neighborhood at a time.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#features"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} Neighbr. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <DemoModal />
    </div>
  );
};

export default UserHomePage;
