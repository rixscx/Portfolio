"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Award } from "lucide-react";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [imageError, setImageError] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const skills = [
    { name: "Creativity", level: 90 },
    { name: "Branding", level: 85 },
    { name: "Visual Design", level: 80 },
    { name: "Digital Marketing", level: 75 },
  ];

  const experience = [
    {
      company: "Independent Projects",
      role: "AI/ML Project Developer",
      period: "2022 – Present",
      description:
        "Built ML-powered apps like disease detection, price prediction, and chatbots using Python, Flask & Streamlit.",
    },
    {
      company: "Academic Projects",
      role: "Cybersecurity & Blockchain Developer",
      period: "2023 – Present",
      description:
        "Created smart contracts and built ML-based threat detection tools with up to 95% accuracy.",
    },
    {
      company: "Hobby Projects",
      role: "Game Developer",
      period: "2021 – 2022",
      description:
        "Designed and developed 2D/3D games using Unity and C# with focus on gameplay mechanics.",
    },
  ];

  const education = [
    {
      institution: "MIT Mysore (VTU)",
      degree: "B.Tech in Computer Science & Engineering (AI)",
      specialization: "Artificial Intelligence",
      period: "2022 – 2026",
    },
    {
      institution: "St. Joseph's PU College, Hunsur",
      degree: "PUC – PCMC (Physics, Chemistry, Maths, CS)",
      specialization: "",
      period: "2020 – 2022",
    },
  ];

  return (
    <>
      <style jsx global>{`
        @keyframes black-hole-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes particle-spiral {
          0% {
            transform: rotate(0deg) translateX(120px) rotate(0deg);
            opacity: 0.8;
          }
          50% {
            transform: rotate(180deg) translateX(60px) rotate(-180deg);
            opacity: 0.4;
          }
          100% {
            transform: rotate(360deg) translateX(0px) rotate(-360deg);
            opacity: 0;
          }
        }

        .black-hole-entity {
          position: absolute;
          top: 20%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: black-hole-spin 30s linear infinite;
        }

        .orbit-particle {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 3px;
          height: 3px;
          background: rgba(59, 130, 246, 0.6);
          border-radius: 50%;
          animation: particle-spiral 10s ease-in infinite;
          box-shadow: 0 0 6px rgba(59, 130, 246, 0.5);
        }

        .orbit-particle:nth-child(1) {
          animation-duration: 12s;
          animation-delay: -2s;
          background: rgba(147, 51, 234, 0.5);
        }

        .orbit-particle:nth-child(2) {
          animation-duration: 15s;
          animation-delay: -4s;
          background: rgba(139, 92, 246, 0.4);
          width: 2px;
          height: 2px;
        }

        .dark .orbit-particle {
          opacity: 0.9;
          box-shadow: 0 0 8px rgba(59, 130, 246, 0.7);
        }

        .progress-bar {
          height: clamp(3px, 0.5vw, 5px);
          background: linear-gradient(to right, #3b82f6, #9333ea);
          border-radius: 2px;
          transition: width 0.5s ease-in-out;
        }

        .progress-bar-container:hover .progress-bar {
          box-shadow: 0 0 6px rgba(59, 130, 246, 0.5);
        }

        .dark .progress-bar-container:hover .progress-bar {
          box-shadow: 0 0 8px rgba(59, 130, 246, 0.7);
        }

        .profile-image-container {
          position: relative;
          display: inline-block;
        }

        .profile-image {
          transition: transform 0.3s ease;
          width: clamp(12rem, 20vw, 16rem);
          height: clamp(12rem, 20vw, 16rem);
        }

        .profile-image:hover {
          transform: scale(1.05);
          animation: image-glow 2s ease-in-out infinite;
        }

        @keyframes image-glow {
          0% {
            filter: brightness(1) drop-shadow(0 0 4px rgba(59, 130, 246, 0.3));
          }
          50% {
            filter: brightness(1.1) drop-shadow(0 0 8px rgba(147, 51, 234, 0.5));
          }
          100% {
            filter: brightness(1) drop-shadow(0 0 4px rgba(59, 130, 246, 0.3));
          }
        }

        .image-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: linear-gradient(to right, #3b82f6, #9333ea);
          border-radius: 50%;
          pointer-events: none;
          animation: particle-burst 1s ease-out forwards;
        }

        @keyframes particle-burst {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.8;
          }
          100% {
            transform: translate(var(--x), var(--y)) scale(0);
            opacity: 0;
          }
        }

        .divider {
          height: 1px;
          background: linear-gradient(to right, #3b82f6, #9333ea);
          opacity: 0.2;
          margin: clamp(1rem, 2vw, 2rem) 0;
        }

        .section-heading-edu,
        .section-heading-skills,
        .section-heading-resume {
          position: relative;
          display: inline-flex;
          align-items: center;
        }

        .section-heading-edu::after,
        .section-heading-skills::after,
        .section-heading-resume::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(to right, #3b82f6, #9333ea);
          transition: width 0.3s ease;
        }

        .section-heading-edu:hover::after,
        .section-heading-skills:hover::after,
        .section-heading-resume:hover::after {
          width: 100%;
        }

        section {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          padding-top: clamp(3rem, 5vw, 5rem);
          padding-bottom: clamp(3rem, 5vw, 5rem);
        }

        /* Fluid Typography and Spacing */
        .main-heading {
          font-size: clamp(2.5rem, 5vw, 4rem);
          line-height: 1.1;
        }

        .section-heading {
          font-size: clamp(1.5rem, 3vw, 2.5rem);
        }

        .sub-heading {
          font-size: clamp(1rem, 2vw, 1.25rem);
        }

        .description-text {
          font-size: clamp(0.75rem, 1.5vw, 1rem);
        }

        .label-text {
          font-size: clamp(0.625rem, 1.2vw, 0.875rem);
        }

        .grid-gap {
          gap: clamp(1.5rem, 3vw, 3rem);
        }

        .section-margin {
          margin-bottom: clamp(3rem, 5vw, 6rem);
        }

        .item-margin {
          margin-bottom: clamp(1rem, 2vw, 2rem);
        }

        .progress-bar-container .w-1\\/3 {
          width: clamp(8rem, 20vw, 12rem);
        }

        /* Respect Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          .black-hole-entity,
          .orbit-particle,
          .profile-image:hover,
          .image-particle {
            animation: none !important;
            transform: none !important;
          }
        }

        /* Small Screens: Stack Grids */
        @media (max-width: 767px) {
          .grid {
            grid-template-columns: 1fr;
          }

          .grid > div {
            text-align: center;
          }

          .profile-image-container {
            margin: 0 auto;
          }

          .section-heading-edu,
          .section-heading-skills,
          .section-heading-resume {
            justify-content: center;
          }

          .progress-bar-container {
            justify-content: center;
          }
        }
      `}</style>

      <section id="about" className="relative overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 background-animation">
          <div className="black-hole-entity">
            <div className="orbit-particle"></div>
            <div className="orbit-particle"></div>
            <div className="orbit-particle"></div>
          </div>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          {/* Intro Section */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-2 grid-gap mb-24 items-center section-margin">
            <div>
              <h1 className="main-heading font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white uppercase">
                I Create Digital
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Future.</span>
              </h1>
              <p className="mt-6 description-text font-medium text-gray-600 dark:text-gray-300 max-w-md leading-relaxed">
                I’m Manish P, a final-year B.Tech CSE (AI) student at VTU. I develop AI-powered apps, create secure blockchain systems, and build immersive games. Passionate about tech that makes a difference.
              </p>
              <p className="mt-3 label-text text-gray-500 dark:text-gray-400">
                <a href="https://manishp.dev" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-400">
                  manishp.dev
                </a>
              </p>
            </div>

            <div className="flex justify-center md:justify-end">
              {imageError ? (
                <div className="profile-image bg-gray-300 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <p className="description-text text-gray-600 dark:text-gray-400 text-center">
                    [Image Failed to Load: Add your profile picture here]
                  </p>
                </div>
              ) : (
                <div
                  className="profile-image-container"
                  onMouseMove={(e) => {
                    const particle = document.createElement("div");
                    particle.className = "image-particle";
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    particle.style.left = `${x}px`;
                    particle.style.top = `${y}px`;
                    particle.style.setProperty("--x", `${Math.random() * 100 - 50}px`);
                    particle.style.setProperty("--y", `${Math.random() * 100 - 50}px`);
                    e.currentTarget.appendChild(particle);
                    setTimeout(() => particle.remove(), 1000);
                  }}
                >
                  <img
                    src="https://3.bp.blogspot.com/-q8JyW3Xpk70/VksvhCkB0bI/AAAAAAAAbyU/Ny5cqzwuWGY/s1600/one-piece-luffy-by-aykutsagbili-on-deviantart.jpg"
                    alt="Luffy from One Piece"
                    className="profile-image rounded-lg object-cover"
                    onError={() => setImageError(true)}
                  />
                </div>
              )}
            </div>
          </motion.div>

          {/* Experience & Education Section */}
          <motion.div variants={itemVariants} className="section-margin">
            <div className="grid md:grid-cols-2 grid-gap">
              <div>
                <h2 className="section-heading font-bold text-gray-900 dark:text-white uppercase section-heading-resume mb-10">
                  My Resume
                </h2>
                {experience.map((exp, index) => (
                  <motion.div key={index} variants={itemVariants} className="item-margin last:mb-0">
                    <h4 className="sub-heading font-semibold text-gray-900 dark:text-white">{exp.company}</h4>
                    <p className="label-text font-medium text-gray-600 dark:text-gray-400">{exp.role}</p>
                    <p className="label-text text-gray-500 dark:text-gray-500">{exp.period}</p>
                    <p className="mt-3 description-text text-gray-600 dark:text-gray-300">{exp.description}</p>
                  </motion.div>
                ))}
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <Award className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" style={{ width: 'clamp(1rem, 2vw, 1.5rem)', height: 'clamp(1rem, 2vw, 1.5rem)' }} />
                  <h3 className="sub-heading font-semibold text-gray-900 dark:text-gray-200 uppercase section-heading-edu">
                    Education
                  </h3>
                </div>
                {education.map((edu, index) => (
                  <motion.div key={index} variants={itemVariants} className="item-margin last:mb-0">
                    <h4 className="sub-heading font-semibold text-gray-900 dark:text-white">{edu.institution}</h4>
                    <p className="label-text font-medium text-gray-600 dark:text-gray-400">{edu.degree}</p>
                    {edu.specialization && (
                      <p className="label-text text-gray-600 dark:text-gray-400">{edu.specialization}</p>
                    )}
                    <p className="label-text text-gray-500 dark:text-gray-500">{edu.period}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="divider"></div>

          {/* Skills Section */}
          <motion.div variants={itemVariants} className="section-margin">
            <h2 className="section-heading font-bold mb-10 text-gray-900 dark:text-white uppercase section-heading-skills">
              Skills
            </h2>
            <div className="grid md:grid-cols-2 grid-gap">
              <p className="description-text font-medium text-gray-600 dark:text-gray-300 max-w-md leading-relaxed">
                A showcase of my technical and creative abilities, honed through years of experience and a passion for innovation. I specialize in transforming complex ideas into user-friendly, impactful solutions.
              </p>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <motion.div key={index} variants={itemVariants} className="flex items-center justify-between progress-bar-container">
                    <span className="label-text font-medium text-gray-900 dark:text-gray-200">{skill.name}</span>
                    <div className="flex items-center w-1/3">
                      <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-1 mr-2">
                        <div
                          className="progress-bar h-1 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      <span className="label-text text-gray-600 dark:text-gray-400">{skill.level}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
