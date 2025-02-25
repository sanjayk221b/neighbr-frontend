import { useState, useEffect, useCallback } from "react";
import { useScroll, useTransform } from "framer-motion";
import Navbar from "./Navbar";
import Header from "./Header";
import Features from "./Features";
import About from "./About";
import Footer from "./Footer";
import DemoModal from "./DemoModal";

const UserHomePage = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isNavbarSticky, setIsNavbarSticky] = useState(false);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navbar
        setIsDemoModalOpen={setIsDemoModalOpen}
        isNavbarSticky={isNavbarSticky}
      />
      <Header opacity={opacity} scale={scale} />
      <Features />
      <About />
      <Footer />
      <DemoModal
        isDemoModalOpen={isDemoModalOpen}
        setIsDemoModalOpen={setIsDemoModalOpen}
      />
    </div>
  );
};

export default UserHomePage;
