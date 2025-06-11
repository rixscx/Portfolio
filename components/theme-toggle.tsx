"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <motion.button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 dark:bg-black/20 dark:border-cyan-500/30 hover:bg-white/20 dark:hover:bg-cyan-500/10 transition-all duration-300 group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <AnimatePresence mode="wait">
        {theme === "dark" ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-yellow-400"
          >
            <Sun size={20} />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-gray-700"
          >
            <Moon size={20} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glow effect for dark mode */}
      <div className="absolute inset-0 rounded-full bg-cyan-400/20 dark:bg-cyan-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />
    </motion.button>
  )
}
