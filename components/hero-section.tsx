"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useInView, useReducedMotion, Variants } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Mail, Lock } from "lucide-react";

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const pullVariants: Variants = {
  pull: { scaleY: [1, 1.3, 1], y: [0, 5, 0], transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" } },
  idle: { scaleY: 1, y: 0 },
};

const HeroSection: React.FC = () => {
  const [typedText, setTypedText] = useState("");
  const [isBelowButton, setIsBelowButton] = useState(false);
  const [projectCount, setProjectCount] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const phrases = ["Aspiring AI Engineer", "Cybersecurity Enthusiast", "Blockchain Enthusiast", "Game Dev. Enthusiast"];
  const currentPhraseIndex = useRef(0);
  const isDeleting = useRef(false);
  const charIndex = useRef(0);
  const pauseTimeout = useRef<NodeJS.Timeout | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 80]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.97]);
  const shouldReduceMotion = useReducedMotion();

  const typeText = useCallback(() => {
    const phrase = phrases[currentPhraseIndex.current];
    charIndex.current += isDeleting.current ? -1 : 1;
    setTypedText(phrase.substring(0, charIndex.current));
    const delay = isDeleting.current
      ? 30
      : charIndex.current === phrase.length
      ? 1400
      : charIndex.current === 0
      ? 0
      : 70;

    if (!isDeleting.current && charIndex.current === phrase.length) isDeleting.current = true;
    else if (isDeleting.current && charIndex.current === 0) {
      isDeleting.current = false;
      currentPhraseIndex.current = (currentPhraseIndex.current + 1) % phrases.length;
    }
    pauseTimeout.current = setTimeout(typeText, delay);
  }, []);

  useEffect(() => {
    if (isInView && !shouldReduceMotion) typeText();
    return () => pauseTimeout.current && clearTimeout(pauseTimeout.current);
  }, [isInView, typeText, shouldReduceMotion]);

  useEffect(() => {
    const debounce = (func: Function, wait: number) => {
      let timeout: NodeJS.Timeout;
      return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
      };
    };

    const handleScroll = debounce(() => {
      if (buttonRef.current) {
        setIsBelowButton(buttonRef.current.getBoundingClientRect().top < 0);
      }
    }, 100);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setProjectCount((prev) => (prev < 10 ? prev + 1 : prev));
    }, 150);
    return () => clearInterval(interval);
  }, [isInView]);

  const scrollToSection = (sectionId: string) =>
    document.querySelector(sectionId)?.scrollIntoView({ behavior: "smooth" });

  const downloadCV = () => {
    setIsDownloading(true);
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Manish_P_Resume.pdf";
    link.click();
    setTimeout(() => setIsDownloading(false), 1000);
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/rixscx", label: "GitHub", color: "text-gray-800 dark:text-gray-300" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/rixscx", label: "LinkedIn", color: "text-gray-800 dark:text-gray-300" },
    { icon: Mail, href: "mailto:manish@example.com", label: "Email", color: "text-gray-800 dark:text-gray-300" },
  ];

  return (
    <>
      <link rel="preload" href="/resume.pdf" as="document" />
      <link rel="preload" href="/fonts/poppins.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <style jsx global>{`
        @keyframes text-glow {
          0% { text-shadow: 0 0 8px rgba(59, 130, 246, 0.5), 0 0 10px rgba(147, 51, 234, 0.4); }
          50% { text-shadow: 0 0 12px rgba(59, 130, 246, 0.7), 0 0 16px rgba(147, 51, 234, 0.6); }
          100% { text-shadow: 0 0 8px rgba(59, 130, 246, 0.5), 0 0 10px rgba(147, 51, 234, 0.4); }
        }

        @keyframes subtle-pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.03); }
          100% { transform: scale(1); }
        }

        @keyframes cursor-trail {
          0% { transform: translateX(0); opacity: 0.7; }
          100% { transform: translateX(10px); opacity: 0; }
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        .action-element,
        .discover-more {
          position: relative;
        }

        .action-element::after,
        .discover-more::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(to right, #1e3a8a, #a855f7);
          transition: width 0.3s ease;
        }

        .action-element:hover::after,
        .action-element:focus-visible::after,
        .discover-more:hover::after,
        .discover-more:focus-visible::after {
          width: 100%;
        }

        .action-element:focus-visible,
        .discover-more:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }

        .download-button:hover {
          will-change: background-position;
          background: linear-gradient(90deg, #1e3a8a, #a855f7, #1e3a8a);
          background-size: 200% 100%;
          animation: gradient-shift 2s linear 3;
        }

        .social-icon {
          transition: all 0.3s ease;
        }

        .social-icon.github:hover {
          color: #6b7280 !important;
        }

        .social-icon.linkedin:hover {
          color: #2563eb !important;
        }

        .social-icon.email:hover {
          color: #dc2626 !important;
        }

        section {
          font-family: 'Poppins', 'Inter', 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          width: 100%;
          overflow-x: hidden;
          padding-top: clamp(3rem, 7vw, 8rem);
          padding-bottom: clamp(2rem, 6vw, 7rem);
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }

        .hero-container {
          width: 100%;
          max-width: 896px;
          width: calc(100% - clamp(1rem, 2vw, 3rem));
          transform: translateX(clamp(-12rem, -12vw, -8rem));
          padding: clamp(0.5rem, 1vw, 1rem);
          margin: 0 auto;
        }

        .hero-container > .flex {
          align-items: flex-start;
          width: 100%;
        }

        /* Typography */
        .hero-text-sm {
          font-size: clamp(0.625rem, 2vw, 1rem);
        }

        .hero-title {
          font-size: clamp(1.75rem, 10vw, 6rem);
        }

        .hero-subtitle {
          font-size: clamp(1rem, 4vw, 2.25rem);
        }

        .hero-description {
          font-size: clamp(0.75rem, 2.5vw, 1.2rem);
        }

        .hero-metric {
          font-size: clamp(0.625rem, 2vw, 1rem);
        }

        .hero-button {
          font-size: clamp(0.75rem, 2vw, 1.125rem);
        }

        .hero-icon-sm {
          width: clamp(1rem, 2.5vw, 1.75rem);
          height: clamp(1rem, 2.5vw, 1.75rem);
        }

        .hero-icon-md {
          width: clamp(1.25rem, 3vw, 2rem);
          height: clamp(1.25rem, 3vw, 2rem);
        }

        /* Spacing */
        .hero-spacing-sm {
          margin-bottom: clamp(0.25rem, 2vw, 1.5rem);
        }

        .hero-spacing-md {
          margin-bottom: clamp(1rem, 3vw, 3rem);
        }

        .hero-spacing-lg {
          margin-bottom: clamp(1.5rem, 4vw, 4rem);
        }

        .hero-spacing-xl {
          margin-bottom: clamp(2rem, 5vw, 4.5rem);
        }

        .hero-gap-sm {
          gap: clamp(0.25rem, 2vw, 1rem);
        }

        .hero-gap-md {
          gap: clamp(0.5rem, 2.5vw, 1.25rem);
        }

        .hero-gap-lg {
          gap: clamp(0.75rem, 3vw, 2.5rem);
        }

        .hero-height-lg {
          height: clamp(1.5rem, 4vw, 4rem);
        }

        .hero-margin-right {
          margin-right: clamp(0.25rem, 2vw, 1rem);
        }

        .hero-margin-left {
          margin-left: clamp(0.125rem, 1vw, 0.5rem);
        }

        /* Cursor Trail */
        .cursor-trail {
          right: clamp(-4px, -1vw, -12px);
          height: clamp(6px, 2vw, 14px);
        }

        /* Responsive Adjustments */
        @media (max-width: 640px) {
          .hero-container {
            width: calc(100% - 1rem);
            transform: translateX(clamp(-8rem, -10vw, -4rem));
          }
          .hero-description {
            max-width: 100%;
          }
        }

        @media (min-width: 641px) and (max-width: 1024px) {
          .hero-container {
            width: calc(100% - 1.5rem);
            transform: translateX(clamp(-10rem, -11vw, -6rem));
          }
          .hero-description {
            max-width: 80%;
          }
        }

        @media (min-width: 1025px) and (max-width: 1440px) {
          .hero-container {
            width: calc(100% - 2rem);
            transform: translateX(0); /* Align to leftmost edge */
            margin-left: 0;
          }
          .hero-description {
            max-width: 28rem;
          }
        }

        @media (min-width: 1441px) {
          .hero-container {
            width: calc(100% - 3rem);
            transform: translateX(clamp(-14rem, -13vw, -10rem));
          }
        }
      `}</style>
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-300"
      >
        <motion.div
          ref={ref}
          style={{ y: shouldReduceMotion ? 0 : y, opacity: shouldReduceMotion ? 1 : opacity, scale: shouldReduceMotion ? 1 : scale }}
          className="hero-container relative z-10"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col items-start justify-center"
          >
            {/* Tagline */}
            <motion.p
              variants={itemVariants}
              className="hero-text-sm font-medium text-gray-700 dark:text-gray-400 hero-spacing-sm tracking-wider uppercase"
            >
              Innovating at the Intersection of AI, Blockchain, and Cybersecurity
            </motion.p>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              className="hero-title font-bold leading-tight tracking-tight text-gray-900 dark:text-white uppercase animate-text-glow hero-spacing-md"
            >
              Hey, 
              <span className="bg-gradient-to-r from-blue-900 to-purple-600 bg-clip-text text-transparent"> I'mManish</span>
            </motion.h1>

            {/* Typing Animation */}
            <motion.div
              variants={itemVariants}
              className="hero-subtitle text-gray-800 dark:text-gray-300 hero-spacing-lg hero-height-lg flex items-baseline animate-text-glow"
              aria-live="polite"
            >
              <span className="hero-margin-right font-medium tracking-wide">I'm a </span>
              <span className="relative flex items-baseline">
                <motion.span
                  className="font-semibold bg-gradient-to-r from-blue-900 to-purple-600 bg-clip-text text-transparent tracking-wide"
                  key={typedText}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {typedText}
                </motion.span>
                <motion.span
                  className="inline-block w-1 hero-height-lg bg-gradient-to-r from-blue-900 to-purple-600 hero-margin-left relative"
                  animate={{ opacity: [1, 0], scaleY: [1, 1.3, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="cursor-trail"></span>
                </motion.span>
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="hero-description font-medium text-gray-800 dark:text-gray-300 max-w-md leading-relaxed hero-spacing-md"
            >
              Crafting innovative solutions in{" "}
              <span className="font-semibold bg-gradient-to-r from-blue-900 to-purple-600 bg-clip-text text-transparent animate-text-glow">
                AI, Blockchain, and Cybersecurity
              </span>
              , I turn ideas into reality with precision and creativity.
            </motion.p>

            {/* Metric Counter */}
            <motion.div
              variants={itemVariants}
              className="hero-metric text-gray-700 dark:text-gray-400 hero-spacing-xl flex items-center hero-gap-sm"
            >
              <span>3+ Years of Technical Exploration</span>
              <span className="text-amber-500 font-semibold">|</span>
              <motion.span
                className="bg-gradient-to-r from-blue-900 to-purple-600 bg-clip-text text-transparent"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {projectCount}+ Hands-on Projects in AI, ML, and Full-Stack Development
              </motion.span>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex items-center hero-gap-lg hero-spacing-xl"
            >
              <motion.button
                onClick={downloadCV}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && downloadCV()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="action-element download-button hero-button text-gray-900 dark:text-white font-semibold transition-all duration-300"
                aria-label="Download Resume"
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin hero-icon-sm hero-margin-right" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Downloading...
                  </span>
                ) : (
                  <>
                    <Download className="inline-block hero-icon-sm hero-margin-right" />
                    Download Resume
                  </>
                )}
              </motion.button>
              <motion.button
                onClick={() => scrollToSection("#contact")}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && scrollToSection("#contact")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="action-element hero-button text-gray-800 dark:text-gray-300 font-semibold transition-all duration-300"
                aria-label="Get In Touch"
              >
                <Lock className="inline-block hero-icon-sm hero-margin-right bg-gradient-to-r from-blue-900 to-purple-600 bg-clip-text text-transparent" />
                Get In Touch
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex items-center hero-gap-md hero-spacing-xl"
            >
              {socialLinks.map(({ icon: Icon, href, label, color }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  whileTap={{ scale: 0.95 }}
                  className={`action-element ${color} social-icon ${label.toLowerCase()} transition-all duration-300`}
                  aria-label={label}
                >
                  <Icon className="hero-icon-md" />
                </motion.a>
              ))}
            </motion.div>

            {/* Discover More Button */}
            <motion.button
              ref={buttonRef}
              onClick={() => scrollToSection("#about")}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && scrollToSection("#about")}
              className="discover-more text-gray-700 dark:text-gray-400 animate-subtle-pulse"
              aria-label="Scroll to about section"
            >
              <div className="flex flex-col items-start">
                <span className="hero-text-sm font-medium hero-spacing-sm">Discover More</span>
                <motion.div
                  className="transition-all duration-300"
                  animate={{ y: shouldReduceMotion ? 0 : [0, 10, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <motion.div animate={isBelowButton && !shouldReduceMotion ? "pull" : "idle"} variants={pullVariants}>
                    <ArrowDown className="hero-icon-md bg-gradient-to-r from-blue-900 to-purple-600 bg-clip-text text-transparent" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.button>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default HeroSection;
