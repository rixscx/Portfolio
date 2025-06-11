import React from "react";
import HeroSection from "@/components/hero-section"
import Navbar from "@/components/navbar"
import AboutSection from "@/components/about-section"
import SkillsSection from "@/components/skills-section"
import ProjectsSection from "@/components/projects-section"
import ContactSection from "@/components/contact-section"
import AdaptiveBackground from "@/components/black-hole-background"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="portfolio-theme">
      <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white overflow-x-hidden transition-colors duration-500 relative">
        <AdaptiveBackground />
        <div className="relative z-10">
          <Navbar />
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </div>
      </main>
    </ThemeProvider>
  )
}
