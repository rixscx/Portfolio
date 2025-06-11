"use client"

import React from "react";
import { useEffect, useRef, useState, useCallback } from "react"
import { motion, useScroll, useTransform, useInView, AnimatePresence, useReducedMotion } from "framer-motion"
import { Tilt } from "react-tilt"
import { ExternalLink, Github, Eye, GitBranch, Search, X, Filter, Heart, Bookmark, Settings } from "lucide-react"

// Error Boundary Component
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center py-20 text-black">
          <h3 className="text-2xl font-bold mb-4">Something went wrong.</h3>
          <p className="text-gray-300">Please refresh the page or try again later.</p>
        </div>
      )
    }
    return this.props.children
  }
}

// Project data
interface Project {
  id: number
  title: string
  description: string
  longDescription: string
  image: string
  tags: string[]
  category: string
  status: string
  github: string
  demo: string | null
  featured: boolean
  difficulty: string
  duration: string
  teamSize: number
  year: number
  stats: Record<string, number>
  metrics: Record<string, number>
  milestones: { date: string; event: string }[]
}

const projects: Project[] = [
  {
    id: 1,
    title: "NeuraCare AI",
    description: "AI-driven healthcare diagnostics platform.",
    longDescription: "A neural network-powered platform for medical diagnostics, achieving 96% accuracy and transforming patient care.",
    image: "https://images.unsplash.com/photo-1576091160399-112e81d9111a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75",
    tags: ["React", "TensorFlow", "Python", "AWS"],
    category: "AI & Machine Learning",
    status: "Live",
    github: "https://github.com/username/neuracare-ai",
    demo: "https://neuracare-ai.com",
    featured: true,
    difficulty: "Advanced",
    duration: "9 months",
    teamSize: 6,
    year: 2025,
    stats: { accuracy: 96, users: 2500, diagnoses: 10000 },
    metrics: { performance: 97, scalability: 90, security: 94 },
    milestones: [
      { date: "Feb 2024", event: "Project Kickoff" },
      { date: "Jun 2024", event: "AI Model Trained" },
      { date: "Jan 2025", event: "Global Launch" }
    ]
  },
  {
    id: 2,
    title: "CyberFlow Traffic",
    description: "IoT-based traffic optimization system.",
    longDescription: "A smart city IoT solution reducing urban congestion by 40% with real-time analytics.",
    image: "https://images.unsplash.com/photo-1516919980-4c4b4b854b4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75",
    tags: ["Node.js", "MongoDB", "IoT", "Docker"],
    category: "IoT & Smart Systems",
    status: "In Development",
    github: "https://github.com/username/cyberflow-traffic",
    demo: null,
    featured: true,
    difficulty: "Expert",
    duration: "14 months",
    teamSize: 10,
    year: 2025,
    stats: { reduction: 40, sensors: 750, uptime: 99.8 },
    metrics: { performance: 94, scalability: 98, security: 91 },
    milestones: [
      { date: "Mar 2024", event: "Sensor Network Deployed" },
      { date: "Aug 2024", event: "Backend Completed" },
      { date: "Mar 2025", event: "Full Deployment" }
    ]
  },
  {
    id: 3,
    title: "VoteChain",
    description: "Blockchain-based secure voting system.",
    longDescription: "A decentralized voting platform using Ethereum smart contracts for 100% transparency.",
    image: "https://images.unsplash.com/photo-1643185450452-6e8b5e1e9f40?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75",
    tags: ["Solidity", "React", "Web3.js", "IPFS"],
    category: "Blockchain",
    status: "Live",
    github: "https://github.com/username/votechain",
    demo: "https://votechain.app",
    featured: false,
    difficulty: "Advanced",
    duration: "7 months",
    teamSize: 5,
    year: 2025,
    stats: { voters: 15000, transactions: 50000 },
    metrics: { performance: 92, scalability: 87, security: 99 },
    milestones: [
      { date: "Oct 2024", event: "Smart Contract Audited" },
      { date: "Dec 2024", event: "Frontend Integrated" },
      { date: "Feb 2025", event: "Mainnet Launch" }
    ]
  },
  {
    id: 4,
    title: "ARStudy",
    description: "Augmented reality education platform.",
    longDescription: "An AR app enhancing education with interactive 3D models, boosting engagement by 65%.",
    image: "https://images.unsplash.com/photo-1611598639740-4803d1f2f48b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75",
    tags: ["Unity", "C#", "ARCore", "Vuforia"],
    category: "Augmented Reality",
    status: "Prototype",
    github: "https://github.com/username/arstudy",
    demo: null,
    featured: true,
    difficulty: "Intermediate",
    duration: "5 months",
    teamSize: 4,
    year: 2025,
    stats: { engagement: 65, downloads: 1000 },
    metrics: { performance: 89, scalability: 82, security: 88 },
    milestones: [
      { date: "Nov 2024", event: "AR Models Designed" },
      { date: "Jan 2025", event: "Prototype Tested" },
      { date: "Apr 2025", event: "Full Release" }
    ]
  },
  {
    id: 5,
    title: "QuantumShield",
    description: "Post-quantum encryption suite.",
    longDescription: "A cybersecurity suite with quantum-resistant algorithms to secure data against quantum threats.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75",
    tags: ["Python", "Qiskit", "Cryptography", "Rust"],
    category: "Cybersecurity",
    status: "In Development",
    github: "https://github.com/username/quantumshield",
    demo: null,
    featured: false,
    difficulty: "Expert",
    duration: "11 months",
    teamSize: 7,
    year: 2025,
    stats: { encryption: 512, tests: 2000 },
    metrics: { performance: 87, scalability: 92, security: 99 },
    milestones: [
      { date: "Sep 2024", event: "Algorithm Research" },
      { date: "Feb 2025", event: "Beta Release" },
      { date: "Jul 2025", event: "Production Launch" }
    ]
  },
  {
    id: 6,
    title: "GreenLogix",
    description: "AI-powered sustainable supply chain.",
    longDescription: "An AI platform optimizing supply chains for sustainability, cutting emissions by 30%.",
    image: "https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75",
    tags: ["Python", "Flask", "AI", "GraphQL"],
    category: "Sustainability",
    status: "Live",
    github: "https://github.com/username/greenlogix",
    demo: "https://greenlogix.com",
    featured: true,
    difficulty: "Advanced",
    duration: "10 months",
    teamSize: 8,
    year: 2024,
    stats: { emissionReduction: 30, clients: 75 },
    metrics: { performance: 95, scalability: 89, security: 93 },
    milestones: [
      { date: "Apr 2024", event: "AI Optimization Model" },
      { date: "Aug 2024", event: "Pilot Program" },
      { date: "Dec 2024", event: "Global Expansion" }
    ]
  },
  {
    id: 7,
    title: "CosmicRacer",
    description: "Multiplayer space racing game.",
    longDescription: "A high-speed multiplayer racing game set in a cosmic environment with procedurally generated tracks, achieving 85% player retention.",
    image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75",
    tags: ["Unity", "C#", "Photon", "Blender"],
    category: "Gaming",
    status: "Live",
    github: "https://github.com/username/cosmicracer",
    demo: "https://cosmicracer.com",
    featured: true,
    difficulty: "Intermediate",
    duration: "6 months",
    teamSize: 5,
    year: 2025,
    stats: { retention: 85, players: 5000, races: 25000 },
    metrics: { performance: 90, scalability: 88, security: 92 },
    milestones: [
      { date: "Jan 2025", event: "Core Mechanics Developed" },
      { date: "Mar 2025", event: "Multiplayer Tested" },
      { date: "May 2025", event: "Public Launch" }
    ]
  }
]

// Categories and sorting options
const categories = ["All", "AI & Machine Learning", "IoT & Smart Systems", "Blockchain", "Augmented Reality", "Cybersecurity", "Sustainability", "Gaming"]
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "difficulty", label: "Difficulty" }
]

// Helper functions for status and difficulty colors
const getStatusColor = (status: string) => ({
  Live: "bg-gradient-to-r from-blue-500 to-purple-500 text-white",
  "In Development": "bg-gradient-to-r from-blue-700 to-purple-700 text-white",
  Prototype: "bg-gradient-to-r from-blue-300 to-purple-300 text-white",
}[status] || "bg-gradient-to-r from-gray-600 to-gray-700 text-white")

const getDifficultyColor = (difficulty: string) => ({
  Beginner: "bg-gradient-to-r from-blue-200 to-purple-200 text-white",
  Intermediate: "bg-gradient-to-r from-blue-400 to-purple-400 text-white",
  Advanced: "bg-gradient-to-r from-blue-500 to-purple-500 text-white",
  Expert: "bg-gradient-to-r from-blue-700 to-purple-700 text-white",
}[difficulty] || "bg-gradient-to-r from-gray-600 to-gray-700 text-white")

// Settings interface
interface Settings {
  animations: boolean
  highContrast: boolean
}

// Settings Panel Component
const SettingsPanel: React.FC<{
  settings: Settings
  toggleSetting: (key: keyof Settings | "showSettings") => void
}> = ({ settings, toggleSetting }) => {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") toggleSetting("showSettings")
    }
    panelRef.current?.focus()
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSetting])

  return (
    <motion.div
      ref={panelRef}
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      className="relative mt-4 bg-gray-900/90 backdrop-blur-md rounded-xl p-6 border border-blue-500/30 z-10 w-full max-w-xs"
      tabIndex={-1}
      role="dialog"
      aria-label="Settings panel"
    >
      <h3 className="text-lg font-extrabold text-white mb-4 uppercase bg-gradient-to-r from-blue-900 to-purple-600 bg-clip-text text-transparent">Settings</h3>
      <div className="space-y-4">
        <label className="flex items-center gap-2 text-sm text-gray-300">
          <input
            type="checkbox"
            checked={settings.animations}
            onChange={() => toggleSetting("animations")}
            className="form-checkbox text-blue-500"
            aria-label="Toggle animations"
          />
          Enable Animations
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-300">
          <input
            type="checkbox"
            checked={settings.highContrast}
            onChange={() => toggleSetting("highContrast")}
            className="form-checkbox text-blue-500"
            aria-label="Toggle high contrast mode"
          />
          High Contrast Mode
        </label>
      </div>
    </motion.div>
  )
}

// Project Modal with Nebula Theme
const ProjectModal: React.FC<{
  project: Project
  onClose: () => void
  settings: Settings
}> = ({ project, onClose, settings }) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "Tab") {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (focusableElements?.length) {
          const firstElement = focusableElements[0] as HTMLElement
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault()
            lastElement.focus()
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    modalRef.current?.focus()
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          ref={modalRef}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-900/70 backdrop-blur-md rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-blue-500/50"
          onClick={e => e.stopPropagation()}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label={`Project details for ${project.title}`}
        >
          <div className="relative h-72 overflow-hidden rounded-t-2xl">
            <div className="absolute inset-0 nebula-overlay"></div>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover opacity-70"
              loading="lazy"
              onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75"; }}
            />
            <motion.div
              className="absolute bottom-8 left-8 text-3xl font-extrabold uppercase bg-gradient-to-r from-blue-900 to-purple-600 bg-clip-text text-transparent"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {project.title}
            </motion.div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-blue-500/80 text-white rounded-full p-2 hover:bg-blue-500"
              aria-label="Close project details modal"
            >
              <X size={20} />
            </button>
          </div>
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-3">
                <span className={`px-4 py-1 rounded-full text-xs font-bold ${getStatusColor(project.status)}`}>{project.status}</span>
                <span className={`px-4 py-1 rounded-full text-xs font-bold ${getDifficultyColor(project.difficulty)}`}>{project.difficulty}</span>
              </div>
            </div>
            <p className="text-base text-gray-200 mb-8 leading-relaxed">{project.longDescription}</p>
            <div className="grid grid-cols-3 gap-6 mb-8">
              {["performance", "scalability", "security"].map((metric, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: settings.animations ? 1.1 : 1 }}
                  className="relative bg-gray-800/40 rounded-xl p-6 text-center border border-blue-500/30"
                >
                  <div className="absolute inset-0 nebula-pulse">
                    <div className="pulse-node"></div>
                  </div>
                  <div className="text-2xl font-extrabold bg-gradient-to-r from-blue-900 to-purple-600 bg-clip-text text-transparent">{project.metrics[metric]}%</div>
                  <div className="text-sm text-gray-300 capitalize">{metric}</div>
                </motion.div>
              ))}
            </div>
            <div className="mb-8">
              <h4 className="text-xl font-extrabold uppercase bg-gradient-to-r from-blue-900 to-purple-600 bg-clip-text text-transparent mb-4">Milestones</h4>
              <div className="space-y-4">
                {project.milestones.map((milestone, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center"
                  >
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-900 to-purple-600 rounded-full mr-4" />
                    <div>
                      <p className="text-sm font-bold text-white">{milestone.event}</p>
                      <p className="text-xs text-gray-400">{milestone.date}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: settings.animations ? 1.05 : 1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-900 to-purple-600 text-white rounded-full hover:from-blue-900/80 hover:to-purple-600/80"
                aria-label="View project code on GitHub"
              >
                <Github size={18} className="mr-2" />Code
              </motion.a>
              {project.demo && (
                <motion.a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: settings.animations ? 1.05 : 1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-900 to-purple-600 text-white rounded-full hover:from-blue-900/80 hover:to-purple-600/80"
                  aria-label="View live demo of the project"
                >
                  <ExternalLink size={18} className="mr-2" />Demo
                </motion.a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// Main EnhancedProjectsSection component
const EnhancedProjectsSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-200px" })
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 400], [0, -80])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [showFilters, setShowFilters] = useState<boolean>(false)
  const [showSettings, setShowSettings] = useState<boolean>(false)
  const [likedProjects, setLikedProjects] = useState<Set<number>>(new Set())
  const [bookmarkedProjects, setBookmarkedProjects] = useState<Set<number>>(new Set())
  const [filter, setFilter] = useState<string>("All")
  const [sortBy, setSortBy] = useState<string>("featured")
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [imageLoadingStates, setImageLoadingStates] = useState<Record<number, boolean>>({})
  const [settings, setSettings] = useState<Settings>({
    animations: true,
    highContrast: false
  })
  const shouldReduceMotion = useReducedMotion()
  const trailRef = useRef<number>(0)

  // Fix hydration issue with random stars
  const [stars, setStars] = useState<{ left: string; top: string; delay: string; duration: string }[]>([])
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const generatedStars = Array.from({ length: 20 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${-Math.random() * 10}s`,
        duration: `${3 + Math.random() * 7}s`,
      }))
      setStars(generatedStars)
    }
  }, [])

  const toggleSetting = useCallback((key: keyof Settings | "showSettings") => {
    if (key === "showSettings") {
      setShowSettings(prev => !prev)
    } else {
      setSettings(prev => ({ ...prev, [key]: !prev[key] }))
    }
  }, [])

  const toggleLike = useCallback((id: number) => {
    setLikedProjects(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) newSet.delete(id)
      else newSet.add(id)
      return newSet
    })
  }, [])

  const toggleBookmark = useCallback((id: number) => {
    setBookmarkedProjects(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) newSet.delete(id)
      else newSet.add(id)
      return newSet
    })
  }, [])

  const debounce = <T extends (...args: any[]) => void>(func: T, wait: number) => {
    let timeout: NodeJS.Timeout
    return (...args: Parameters<T>) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func(...args), wait)
    }
  }

  const debouncedSetSearchTerm = useCallback(
    debounce((value: string) => setSearchTerm(value), 300),
    []
  )

  useEffect(() => {
    let filtered = filter === "All" ? projects : projects.filter(p => p.category === filter)
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }
    filtered.sort((a, b) => {
      if (sortBy === "featured") return Number(b.featured) - Number(a.featured)
      if (sortBy === "newest") return b.year - a.year
      if (sortBy === "difficulty") {
        const difficultyOrder = { Beginner: 1, Intermediate: 2, Advanced: 3, Expert: 4 }
        return difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty]
      }
      return 0
    })
    setFilteredProjects(filtered)

    // Initialize image loading states for all projects
    const initialLoadingStates: Record<number, boolean> = {}
    projects.forEach(project => {
      initialLoadingStates[project.id] = true
    })
    setImageLoadingStates(initialLoadingStates)
  }, [filter, searchTerm, sortBy])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!settings.animations || shouldReduceMotion || trailRef.current > 10) return
    trailRef.current += 1
    const trail = document.createElement("div")
    trail.className = "cursor-trail"
    document.body.appendChild(trail)
    trail.style.left = `${e.clientX}px`
    trail.style.top = `${e.clientY}px`
    setTimeout(() => {
      trail.remove()
      trailRef.current -= 1
    }, 1000)
  }, [settings.animations, shouldReduceMotion])

  return (
    <ErrorBoundary>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');

        @keyframes nebula-pulse {
          0% { background-position: 0% 0%; opacity: 0.3; }
          50% { background-position: 100% 100%; opacity: 0.6; }
          100% { background-position: 0% 0%; opacity: 0.3; }
        }

        @keyframes star-pulse {
          0% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.5); opacity: 0.8; }
          100% { transform: scale(1); opacity: 0.5; }
        }

        .nebula-bg {
          background: radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.2), rgba(236, 72, 153, 0.1), transparent);
          animation: nebula-pulse 25s ease-in-out infinite;
        }

        .star-node {
          position: absolute;
          width: 3px;
          height: 3px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          animation: star-pulse 5s ease-in-out infinite;
        }

        .nebula-overlay {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2), rgba(236, 72, 153, 0.1));
          animation: nebula-pulse 25s ease-in-out infinite;
        }

        .pulse-node {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 4px;
          height: 4px;
          background: linear-gradient(to right, #1e3a8a, #7e22ce);
          border-radius: 50%;
          animation: star-pulse 3s ease-in-out infinite;
        }

        .card-holo {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(59, 130, 246, 0.3);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          animation: card-pulse 6s ease-in-out infinite;
          min-height: 420px;
        }

        @keyframes card-pulse {
          0% { box-shadow: 0 0 10px rgba(59, 130, 246, 0.2); }
          50% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.4); }
          100% { box-shadow: 0 0 10px rgba(59, 130, 246, 0.2); }
        }

        .card-holo:hover {
          box-shadow: 0 12px 24px rgba(59, 130, 246, 0.3), 0 0 48px rgba(147, 51, 234, 0.2);
        }

        .image-placeholder {
          width: 100%;
          height: 192px;
          background: rgba(255, 255, 255, 0.05);
          animation: placeholder-pulse 1.5s ease-in-out infinite;
        }

        @keyframes placeholder-pulse {
          0% { opacity: 0.3; }
          50% { opacity: 0.6; }
          100% { opacity: 0.3; }
        }

        .cursor-trail {
          position: fixed;
          width: 8px;
          height: 8px;
          background: linear-gradient(to right, #1e3a8a, #7e22ce);
          border-radius: 50%;
          pointer-events: none;
          animation: cursor-fade 1s ease-out forwards;
          z-index: 1000;
        }

        @keyframes cursor-fade {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(0); opacity: 0; }
        }

        .divider {
          height: 2px;
          background: linear-gradient(to right, #1e3a8a, #7e22ce);
          opacity: 0.3;
          margin: 3rem 0;
        }

        .filter-glow::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(to right, #1e3a8a, #7e22ce);
          transition: width 0.3s ease;
        }

        .filter-glow:hover::after {
          width: 100%;
        }

        .high-contrast .card-holo {
          background: rgba(255, 255, 255, 0.8);
          border: 2px solid #000;
        }

        .high-contrast .text-white {
          color: #000 !important;
        }

        .high-contrast .bg-gradient-to-r {
          background: #000 !important;
          color: #fff !important;
        }

        .text-white {
          color: #fff;
        }

        .text-darkslategray {
        color: #363747c7;
        }

        .placeholder-gray-400::placeholder {
          color: #9ca3af;
        }

        @media (prefers-color-scheme: light) {
          section {
            background: #fff !important;
          }
          .card-holo {
            background: #fff !important;
            color: #111 !important;
            border: 1px solid rgba(0, 0, 0, 0.1);
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
            backdrop-filter: none !important;
          }
          .card-holo h3,
          .card-holo .text-white,
          .card-holo .text-gray-300 {
            color: #111 !important;
          }
          .star-node {
            background: rgba(0, 0, 0, 0.4) !important;
          }
          .bg-gray-900\/90,
          .bg-gray-900\/70,
          .bg-gray-800\/70,
          .bg-gray-800\/40 {
            background: rgba(255, 255, 255, 0.9) !important;
            backdrop-filter: none !important;
          }
          .placeholder-gray-400::placeholder {
            color: #444 !important;
          }
          .nebula-bg,
          .nebula-overlay {
            background: none !important;
            animation: none !important;
          }
          .text-white,
          .text-white-black {
            color: #000 !important;
          }
        }

        section {
          font-family: 'Orbitron', sans-serif;
        }

        .description-container {
          min-height: 48px;
        }
      `}</style>

      <section
        id="projects"
        className={`relative py-24 overflow-hidden ${settings.highContrast ? "high-contrast" : ""}`}
        onMouseMove={handleMouseMove}
      >
        <div className="absolute inset-0 opacity-15">
          {stars.map((star, i) => (
            <div
              key={i}
              className="star-node"
              style={{
                left: star.left,
                top: star.top,
                animationDelay: star.delay,
                animationDuration: star.duration,
              }}
            />
          ))}
        </div>
        <motion.div
          ref={ref}
          style={{ y: shouldReduceMotion || !settings.animations ? 0 : y }}
          className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12"
        >
          <motion.div
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.4 } }}}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }}}
              className="text-center mb-20"
            >
              <h2 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white-black uppercase">
                Things
                <span className="bg-gradient-to-r from-blue-900 to-purple-600 bg-clip-text text-transparent"> I’ve Built</span>
              </h2>
              <p className="mt-6 text-base font-medium text-white-black max-w-lg mx-auto leading-relaxed">
                A galaxy of groundbreaking innovations illuminating the digital cosmos.
              </p>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }}}
              className="mb-16"
            >
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-lg">
                  <Search className="w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-white-black" size={20} />
                  <input
                    type="text"
                    placeholder="Explore the cosmos..."
                    value={searchTerm}
                    onChange={e => debouncedSetSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-transparent border border-blue-500/30 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 text-white-black placeholder-gray-400 text-sm"
                    aria-label="Search projects by title, description, or tags"
                  />
                </div>
                <div className="flex gap-4">
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="px-4 py-2 bg-transparent border border-blue-500/30 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 text-white-black text-sm"
                    aria-label="Sort projects"
                  >
                    {sortOptions.map(opt => (
                      <option key={opt.value} value={opt.value} className="bg-gray-900 text-white-black">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <motion.button
                    onClick={() => setShowFilters(!showFilters)}
                    whileHover={{ scale: settings.animations ? 1.1 : 1 }}
                    whileTap={{ scale: 0.9 }}
                    className="px-4 py-2 bg-transparent border border-blue-500/30 text-white-black rounded-full hover:bg-blue-500/10 flex items-center relative filter-glow text-sm"
                    aria-label={showFilters ? "Hide filters" : "Show filters"}
                  >
                    <Filter size={20} className="mr-1" />Filters
                  </motion.button>
                  <motion.button
                    onClick={() => toggleSetting("showSettings")}
                    whileHover={{ scale: settings.animations ? 1.1 : 1 }}
                    whileTap={{ scale: 0.9 }}
                    className="px-4 py-2 bg-transparent border border-blue-500/30 text-white-black rounded-full hover:bg-blue-500/10 flex items-center relative filter-glow text-sm"
                    aria-label={showSettings ? "Hide settings" : "Show settings"}
                  >
                    <Settings size={20} />
                  </motion.button>
                </div>
              </div>
              <div className="relative flex justify-end">
                <AnimatePresence>
                  {showSettings && <SettingsPanel settings={settings} toggleSetting={toggleSetting} />}
                </AnimatePresence>
              </div>
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex flex-wrap justify-center gap-4 mt-10"
                  >
                    {categories.map(cat => (
                      <motion.button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        whileHover={{ scale: settings.animations ? 1.1 : 1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`px-8 py-3 rounded-full font-medium text-base relative filter-glow ${filter === cat ? "bg-gradient-to-r from-blue-900 to-purple-600 text-white" : "bg-gray-900/70 backdrop-blur-md text-gray-300 hover:bg-gray-800/70 border border-blue-500/30"}`}
                        aria-label={`Filter projects by ${cat}`}
                      >
                        {cat}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <div className="divider"></div>

            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 2 } }}}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              {filteredProjects.map(project => (
                <Tilt key={project.id} options={{ max: 15, scale: 1.05, speed: 400 }}>
                  <motion.div
                    variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }}}
                    className="relative group rounded-2xl overflow-hidden card-holo"
                  >
                    {project.featured && (
                      <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-blue-900 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center">
                        <GitBranch size={16} className="mr-2" />Featured
                      </div>
                    )}
                    <div className="absolute top-4 right-4 z-20 flex gap-3">
                      <motion.button
                        onClick={() => toggleLike(project.id)}
                        whileHover={{ scale: settings.animations ? 1.2 : 1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`p-2 rounded-full ${likedProjects.has(project.id) ? "bg-gradient-to-r from-blue-900 to-purple-600 text-white" : "bg-gray-800/70 text-gray-300"}`}
                        aria-label={likedProjects.has(project.id) ? "Unlike project" : "Like project"}
                      >
                        <Heart size={18} fill={likedProjects.has(project.id) ? "currentColor" : "none"} />
                      </motion.button>
                      <motion.button
                        onClick={() => toggleBookmark(project.id)}
                        whileHover={{ scale: settings.animations ? 1.2 : 1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`p-2 rounded-full ${bookmarkedProjects.has(project.id) ? "bg-gradient-to-r from-blue-900 to-purple-600 text-white" : "bg-gray-800/70 text-gray-300"}`}
                        aria-label={bookmarkedProjects.has(project.id) ? "Remove bookmark" : "Bookmark project"}
                      >
                        <Bookmark size={18} fill={bookmarkedProjects.has(project.id) ? "currentColor" : "none"} />
                      </motion.button>
                    </div>
                    <div className="relative w-full h-48">
                      {imageLoadingStates[project.id] && (
                        <div className="image-placeholder absolute inset-0"></div>
                      )}
                      <img
                        src={project.image}
                        alt={project.title}
                        width={480}
                        height={192}
                        onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75"; }}
                        className={`w-full h-48 object-cover transition-opacity duration-200 ${imageLoadingStates[project.id] ? "opacity-0" : "opacity-100"}`}
                        loading="eager"
                        fetchPriority={project.featured ? "high" : "low"}
                        onLoad={() => setImageLoadingStates(prev => ({ ...prev, [project.id]: false }))}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex gap-2">
                          <span className={`px-4 py-1 rounded-full text-xs font-bold ${getStatusColor(project.status)}`}>{project.status}</span>
                          <span className={`px-4 py-1 rounded-full text-xs font-bold ${getDifficultyColor(project.difficulty)}`}>{project.difficulty}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-extrabold text-white-black mb-2 uppercase group-hover:bg-gradient-to-r group-hover:from-blue-900 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-colors">{project.title}</h3>
                      <div className="description-container p-3 text-sm text-white-black mb-3 line-clamp-2 leading-relaxed">{project.description}</div>
                      <div className="flex gap-3 flex-wrap mb-2">
                        {project.tags.slice(0, 3).map(tag => (
                          <motion.span
                            key={tag}
                            whileHover={{ scale: settings.animations ? 1.2 : 1 }}
                            className="px-3 py-1 bg-gradient-to-r from-blue-900 to-purple-600 text-white rounded-full text-sm font-medium"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="flex-1 flex items-center justify-center py-2 px-4 bg-white text-blue-600 border border-blue-500 rounded-full hover:bg-blue-50 text-sm font-semibold"
                          aria-label={`View details for ${project.title}`}
                        >
                          <Eye size={18} className="mr-2 inline" />Details
                        </button>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 px-4 bg-white border border-blue-500 text-blue-600 rounded-full hover:bg-blue-50"
                          aria-label="View project code on GitHub"
                        >
                          <Github size={18} />
                        </a>
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 px-4 bg-white border border-purple-500 text-purple-600 rounded-full hover:bg-purple-50"
                            aria-label="View live demo of the project"
                          >
                            <ExternalLink size={18} />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </Tilt>
              ))}
            </motion.div>

            {filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="text-8xl mb-6 text-blue-600 animate-pulse">🌌</div>
                <h3 className="text-3xl font-extrabold text-white-black mb-4 uppercase">No Projects Found</h3>
                <p className="text-base text-white-black mb-6 leading-relaxed">Try different search terms or filters to explore more.</p>
                <motion.button
                  onClick={() => {
                    setSearchTerm("")
                    setFilter("All")
                  }}
                  whileHover={{ scale: settings.animations ? 1.2 : 1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-gradient-to-r from-blue-900 to-purple-600 text-white px-6 py-3 rounded-full hover:from-blue-900/80 hover:to-purple-600/80"
                  aria-label="Clear search and view all projects"
                >
                  Reset Filters
                </motion.button>
              </motion.div>
            )}

            <motion.div
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }}}
              className="text-center mt-20"
            >
              <motion.a
                href="https://github.com/rixscx?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: settings.animations ? 1.2 : 1 }}
                whileTap={{ scale: 0.9 }}
                className="px-10 py-4 bg-gradient-to-r from-blue-900 to-purple-600 text-white rounded-full hover:from-blue-900/80 hover:to-purple-600/80 font-medium text-lg"
                aria-label="View all projects"
              >
                Explore All Projects
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>

        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            settings={settings}
          />
        )}
      </section>
    </ErrorBoundary>
  )
}

export default EnhancedProjectsSection
