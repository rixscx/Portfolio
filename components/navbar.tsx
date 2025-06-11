"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      try {
        setScrolled(window.scrollY > 50);
        const sections = document.querySelectorAll("section[id]");
        const scrollPosition = window.scrollY + 100;

        sections.forEach((section) => {
          const sectionTop = (section as HTMLElement).offsetTop;
          const sectionHeight = (section as HTMLElement).offsetHeight;
          const sectionId = section.getAttribute("id") || "";
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(sectionId);
          }
        });
      } catch (error) {
        console.error("Scroll handler error:", error);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    try {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setMobileMenuOpen(false);
      }
    } catch (error) {
      console.error(`Scroll to ${href} failed:`, error);
    }
  };

  const getLightModeBackground = () => {
    return scrolled
      ? {
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }
      : {
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0) 100%)",
          backdropFilter: "none",
          WebkitBackdropFilter: "none",
        };
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
      >
        <div className="absolute inset-0 dark:hidden transition-all duration-500" style={getLightModeBackground()} />
        <div className="absolute inset-0 hidden dark:block" />
        <div className="max-w-screen-xl mx-auto px-3 sm:px-4 lg:px-8 w-full relative z-10">
          <div className="flex flex-wrap items-center justify-between h-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <button
                onClick={() => scrollToSection("#home")}
                className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-900 to-purple-600 bg-clip-text text-transparent animate-gradient-x hover:scale-105 transition-all duration-500"
              >
                Manish P
              </button>
            </motion.div>

            <nav className="hidden lg:flex items-center space-x-12">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  onClick={() => scrollToSection(item.href)}
                  className={cn(
                    "relative text-base font-medium transition-all duration-300 py-2 group",
                    activeSection === item.href.substring(1)
                      ? "text-gray-800 dark:text-cyan-400"
                      : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white dark:hover:text-cyan-300"
                  )}
                >
                  {item.name}
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: activeSection === item.href.substring(1) ? "100%" : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full group-hover:w-full transition-all duration-300" />
                </motion.button>
              ))}
            </nav>

            <div className="hidden lg:flex items-center space-x-4">
              <ThemeToggle />
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <button
                  onClick={() => scrollToSection("#contact")}
                  className="bg-gradient-to-r from-blue-900 to-purple-600 text-white px-8 py-3 rounded-full font-medium shadow-[0_0_20px_#6b21a840] hover:scale-105 transition-all duration-300"
                >
                  Let's Talk
                </button>
              </motion.div>
            </div>

            <div className="lg:hidden flex items-center space-x-3">
              <ThemeToggle />
              <button
                className="p-3 rounded-xl text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white dark:hover:text-cyan-400 hover:bg-gray-200/50 dark:hover:bg-gray-800/20 transition-all duration-300 min-h-[44px] min-w-[44px]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={24} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute right-0 top-0 h-full w-[85vw] max-w-[300px] bg-black/95 backdrop-blur-xl shadow-2xl border-l border-gray-800"
            >
              <div className="p-6 pt-20">
                <nav className="space-y-6">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      onClick={() => scrollToSection(item.href)}
                      className={cn(
                        "block w-full text-left text-base sm:text-lg font-medium transition-all duration-300 py-3 hover:bg-gray-800/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-md",
                        activeSection === item.href.substring(1)
                          ? "text-white dark:text-cyan-400"
                          : "text-gray-300 hover:text-white dark:hover:text-cyan-300"
                      )}
                    >
                      {item.name}
                    </motion.button>
                  ))}
                </nav>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  onClick={() => scrollToSection("#contact")}
                  className="mt-10 w-full bg-gradient-to-r from-blue-900 to-purple-600 text-white px-8 py-4 rounded-full font-medium shadow-[0_0_20px_#6b21a840] hover:scale-105 transition-all duration-300 min-h-[44px]"
                >
                  Let's Talk
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
