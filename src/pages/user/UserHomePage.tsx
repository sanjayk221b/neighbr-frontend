import { useState, useEffect, useCallback } from "react";
import {
  Shield,
  Users,
  Wrench,
  Menu,
  X,
  ArrowRight,
  Star,
  ChevronDown,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { features } from "@/constants/user/features";

const UserHomePage = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isNavbarSticky, setIsNavbarSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);
  const { scrollY } = useScroll();

  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const scale = useTransform(scrollY, [0, 200], [1, 0.95]);

  const handleScroll = useCallback(() => {
    setIsNavbarSticky(window.scrollY > 0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const DemoModal = () => (
    <Dialog open={isDemoModalOpen} onOpenChange={setIsDemoModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-600">
            Experience Neighbr
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Step into different roles and explore our comprehensive community
            management system.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {[
            { title: "Resident Demo", color: "blue", href: "/demo/resident" },
            {
              title: "Caretaker Demo",
              color: "green",
              href: "/demo/caretaker",
            },
            { title: "Admin Demo", color: "purple", href: "/demo/admin" },
          ].map((demo) => (
            <motion.div
              key={demo.title}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={() => (window.location.href = demo.href)}
                className={`w-full bg-${demo.color}-600 hover:bg-${demo.color}-700 text-white font-semibold py-3 flex items-center justify-between`}
              >
                <span>{demo.title}</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );

  const NavLink = ({ href, children }) => (
    <motion.a
      href={href}
      className="text-gray-600 hover:text-blue-600 transition-colors duration-300 relative group"
      whileHover={{ scale: 1.05 }}
    >
      {children}
      <motion.span
        className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );

  const FeatureCard = ({ feature, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg transform -rotate-1 group-hover:rotate-1 transition-transform duration-300" />
      <div className="relative p-6 bg-white rounded-lg shadow-lg transform group-hover:-translate-y-2 transition-all duration-300">
        <feature.icon className="h-12 w-12 text-blue-600 mb-4 transform group-hover:scale-110 transition-transform duration-300" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {feature.title}
        </h3>
        <p className="text-gray-600">{feature.description}</p>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
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
              <NavLink href="#features">Features</NavLink>
              <NavLink href="#about">About</NavLink>
              <NavLink href="#contact">Contact</NavLink>
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
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/90 backdrop-blur-md shadow-lg absolute top-20 left-0 right-0 z-40 overflow-hidden"
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
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => setIsDemoModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 rounded-full shadow-lg"
                >
                  Get Started
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() =>
                    document
                      .getElementById("features")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                  className="bg-white text-blue-600 hover:bg-gray-50 text-lg px-8 py-4 rounded-full shadow-lg"
                >
                  Learn More
                  <ChevronDown className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        <div className="absolute inset-0 z-0">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1200 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            className="transform scale-110"
          >
            <motion.path
              d="M0 400L1200 600V0H0V400Z"
              fill="#C7D2FE"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            <motion.path
              d="M0 300L1200 500V0H0V300Z"
              fill="#A5B4FC"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
            />
            <motion.rect
              x="100"
              y="100"
              width="200"
              height="200"
              fill="#4F46E5"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
            <motion.rect
              x="900"
              y="300"
              width="200"
              height="200"
              fill="#4F46E5"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-indigo-100/50 mix-blend-multiply" />
        </div>
      </header>

      <main>
        <section id="features" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                Empowering Gated Communities
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover how Neighbr transforms community living with
                cutting-edge features designed for modern residential spaces.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <FeatureCard key={index} feature={feature} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section
          id="about"
          className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:flex lg:items-center lg:justify-between lg:space-x-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="lg:w-1/2"
              >
                <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
                  Why Choose{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Neighbr
                  </span>
                  ?
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  We're not just a management system – we're your partner in
                  building thriving, connected communities where residents feel
                  safe, valued, and truly at home.
                </p>
                <div className="space-y-6">
                  {[
                    {
                      icon: Shield,
                      title: "Industry-Leading Security",
                      description:
                        "Advanced encryption and privacy measures to protect your community",
                    },
                    {
                      icon: Users,
                      title: "Community Engagement",
                      description:
                        "Powerful tools to bring neighbors together and build lasting connections",
                    },
                    {
                      icon: Wrench,
                      title: "Smart Management",
                      description:
                        "Efficient solutions for seamless property operations and maintenance",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-4"
                    >
                      <div className="flex-shrink-0">
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <item.icon className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {item.title}
                        </h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mt-12 lg:mt-0 lg:w-1/2"
              >
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg transform rotate-3"
                    animate={{ rotate: [3, -3, 3] }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <div className="relative bg-white p-8 rounded-lg shadow-xl">
                    <div className="grid grid-cols-2 gap-6">
                      {[
                        { number: "95%", label: "User Satisfaction" },
                        { number: "50k+", label: "Active Users" },
                        { number: "200+", label: "Communities" },
                        { number: "24/7", label: "Support" },
                      ].map((stat, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="text-center"
                        >
                          <div className="text-3xl font-bold text-blue-600 mb-2">
                            {stat.number}
                          </div>
                          <div className="text-gray-600">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="contact" className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700" />
          <div className="absolute inset-0">
            <svg
              className="absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/2 opacity-20"
              width="404"
              height="404"
              fill="none"
              viewBox="0 0 404 404"
            >
              <defs>
                <pattern
                  id="85737c0e-0916-41d7-917f-596dc7edfa27"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    className="text-white"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width="404"
                height="404"
                fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
              />
            </svg>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-4xl font-extrabold text-white mb-6">
                Ready to Transform Your Community?
              </h2>
              <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
                Join the growing network of communities that trust Neighbr to
                create safer, more connected, and efficiently managed
                residential spaces.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Button className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-12 py-4 rounded-full shadow-xl">
                  Contact Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

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
              <div className="flex space-x-4">
                {[
                  { icon: "facebook", href: "#" },
                  { icon: "twitter", href: "#" },
                  { icon: "instagram", href: "#" },
                  { icon: "linkedin", href: "#" },
                ].map((social) => (
                  <motion.a
                    key={social.icon}
                    href={social.href}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <span className="sr-only">{social.icon}</span>
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </motion.a>
                ))}
              </div>
            </div>
            {[
              {
                title: "Product",
                links: ["Features", "Security", "Updates", "Pricing"],
              },
              {
                title: "Company",
                links: ["About", "Careers", "Press", "Contact"],
              },
              {
                title: "Resources",
                links: ["Blog", "Newsletter", "Events", "Help Center"],
              },
            ].map((column, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-lg font-semibold">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link}>
                      <motion.a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors duration-300"
                        whileHover={{ x: 5 }}
                      >
                        {link}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
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
