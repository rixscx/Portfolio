"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion, Variants } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamically import Lucide icons to reduce bundle size
const Palette = dynamic(() => import("lucide-react").then(mod => mod.Palette), { ssr: false });
const Code2 = dynamic(() => import("lucide-react").then(mod => mod.Code2), { ssr: false });
const Layout = dynamic(() => import("lucide-react").then(mod => mod.Layout), { ssr: false });
const Paintbrush = dynamic(() => import("lucide-react").then(mod => mod.Paintbrush), { ssr: false });
const FileText = dynamic(() => import("lucide-react").then(mod => mod.FileText), { ssr: false });
const Database = dynamic(() => import("lucide-react").then(mod => mod.Database), { ssr: false });
const Brain = dynamic(() => import("lucide-react").then(mod => mod.Brain), { ssr: false });
const DatabaseIcon = dynamic(() => import("lucide-react").then(mod => mod.DatabaseIcon), { ssr: false });
const Code = dynamic(() => import("lucide-react").then(mod => mod.Code), { ssr: false });

// Define TypeScript interfaces for skills
interface Skill {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  description: string;
}

// Skills list with realistic colors and concise descriptions
const skills: Skill[] = [
  { name: "Bootstrap", icon: Palette, iconColor: "#7952B3", description: "Responsive CSS framework for modern web design." },
  { name: "C", icon: Code2, iconColor: "#A8B9CC", description: "Low-level language for system programming." },
  { name: "C++", icon: Code2, iconColor: "#00599C", description: "Object-oriented language for high-performance apps." },
  { name: "CSS3", icon: Layout, iconColor: "#1572B6", description: "Styling language for responsive UI design." },
  { name: "Figma", icon: Paintbrush, iconColor: "#F24E1E", description: "Design tool for UI/UX prototyping." },
  { name: "Flask", icon: Code, iconColor: "#000000", description: "Lightweight Python web framework." },
  { name: "HTML5", icon: FileText, iconColor: "#E34F26", description: "Standard for structuring web content." },
  { name: "Java", icon: Code, iconColor: "#007396", description: "Platform-independent language for enterprise apps." },
  { name: "JavaScript", icon: Code, iconColor: "#F7DF1E", description: "Dynamic language for interactive web apps." },
  { name: "MongoDB", icon: Database, iconColor: "#47A248", description: "NoSQL database for scalable data storage." },
  { name: "MySQL", icon: Database, iconColor: "#4479A1", description: "Relational database for structured data." },
  { name: "OpenCV", icon: Brain, iconColor: "#5C3EE8", description: "Library for computer vision tasks." },
  { name: "Pandas", icon: DatabaseIcon, iconColor: "#150458", description: "Python library for data analysis." },
  { name: "PHP", icon: Code, iconColor: "#777BB4", description: "Server-side language for web development." },
  { name: "Python", icon: Code, iconColor: "#3776AB", description: "Versatile language for multiple domains." },
  { name: "React", icon: Layout, iconColor: "#61DAFB", description: "JavaScript library for component-based UIs." },
  { name: "TensorFlow", icon: Brain, iconColor: "#FF6F00", description: "Framework for machine learning models." },
  { name: "TypeScript", icon: Code, iconColor: "#3178C6", description: "Typed JavaScript for scalable code." },
];

// Animation variants for container and items
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const SkillsSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion(); // Respect reduced motion preference
  const [isLoading, setIsLoading] = useState(true); // Loading state for skill cards

  // Simulate loading (remove in production or adjust based on actual loading logic)
  setTimeout(() => setIsLoading(false), 500);

  return (
    <>
      <style jsx global>{`
        @keyframes spin-icon {
          0% { transform: rotate(0deg) scale(1.1); }
          100% { transform: rotate(360deg) scale(1.2); }
        }

        .skill-card {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 12px;
          padding: 1.25rem;
          width: 100px;
          height: 100px;
          transition: all 0.3s ease;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
        }

        .dark .skill-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
        }

        .skill-card:hover {
          transform: translateY(-4px) scale(1.03);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
          border-color: rgba(0, 0, 0, 0.2);
        }

        .dark .skill-card:hover {
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .skill-icon {
          width: 40px;
          height: 40px;
          margin-bottom: 0.75rem;
          transition: all 0.3s ease;
          filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.3));
        }

        .dark .skill-icon {
          filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.4));
        }

        .skill-card:hover .skill-icon {
          animation: spin-icon 0.6s ease-in-out forwards;
        }

        .skill-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: #1f2937;
          text-align: center;
          transition: transform 0.3s ease;
        }

        .dark .skill-label {
          color: #ffffff;
        }

        .skill-card:hover .skill-label {
          transform: scale(1.05);
        }

        .description-box {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(-8px);
          width: 180px;
          background: rgba(0, 0, 0, 0.7); /* Even more opaque background for better contrast in light mode */
          border: 1px solid rgba(0, 0, 0, 0.4); /* Darker border for definition */
          border-radius: 8px;
          padding: 1rem; /* Increased padding for better spacing */
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.2s ease, visibility 0.2s ease, transform 0.2s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          z-index: 10;
        }

        .dark .description-box {
          background: rgba(255, 255, 255, 0.5); /* More opaque background for dark mode */
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .skill-card:hover .description-box,
        .skill-card:focus-within .description-box {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(-12px);
        }

        .description-box::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 6px solid transparent;
          border-top-color: rgba(0, 0, 0, 0.7); /* Match the updated background */
        }

        .dark .description-box::after {
          border-top-color: rgba(255, 255, 255, 0.5); /* Match the updated dark mode background */
        }

        .description-text {
          font-size: 0.75rem;
          font-weight: 500; /* Slightly bolder text for better readability */
          color: #000000; /* Pure black for maximum contrast in light mode */
          text-align: center;
          line-height: 1.3;
        }

        .dark .description-text {
          color: #ffffff; /* Pure white for maximum contrast in dark mode */
        }

        .skill-card-placeholder {
          width: 100px;
          height: 100px;
          background: rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 12px;
          animation: placeholder-pulse 1.5s ease-in-out infinite;
        }

        .dark .skill-card-placeholder {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        @keyframes placeholder-pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }

        section {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
      `}</style>
      <section
        id="skills"
        className="relative py-20 overflow-hidden transition-colors duration-300 bg-transparent"
      >
        {/* Subtle overlay */}
        <div className="absolute inset-0"></div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight uppercase">
              Technologies I
              <span
                style={{
                  background: "linear-gradient(to right, #1E40AF, #7C3AED)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {" "}
                Work With
              </span>
            </h2>
            <p className="text-base font-medium text-gray-700 dark:text-gray-300 max-w-md mx-auto leading-relaxed">
              A versatile toolkit of modern technologies to build innovative solutions
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-12 justify-items-center w-full max-w-5xl mx-auto"
          >
            {isLoading
              ? Array.from({ length: skills.length }).map((_, index) => (
                  <div key={index} className="skill-card-placeholder" />
                ))
              : skills.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.name}
                      variants={itemVariants}
                      className="skill-card"
                      tabIndex={0}
                      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && e.currentTarget.focus()}
                      role="button"
                      aria-label={`${skill.name}: ${skill.description}`}
                    >
                      <Icon
                        className="skill-icon"
                        style={{ color: skill.iconColor, animation: shouldReduceMotion ? "none" : undefined }}
                      />
                      <span className="skill-label">{skill.name}</span>
                      <div className="description-box">
                        <p className="description-text">{skill.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default SkillsSection;
