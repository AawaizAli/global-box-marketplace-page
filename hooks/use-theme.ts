"use client"

import { useEffect, useState } from "react"

interface ThemeContextType {
  isDarkMode: boolean
  toggleTheme: () => void
  setTheme: (isDark: boolean) => void
}

export function useTheme(): ThemeContextType {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Initialize theme from localStorage and system preference
  useEffect(() => {
    setMounted(true)

    // Check localStorage first
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      const isDark = savedTheme === "dark"
      setIsDarkMode(isDark)
      applyTheme(isDark)
    } else {
      // Check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setIsDarkMode(prefersDark)
      applyTheme(prefersDark)
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        setIsDarkMode(e.matches)
        applyTheme(e.matches)
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const applyTheme = (isDark: boolean) => {
    const html = document.documentElement
    if (isDark) {
      html.classList.add("dark")
    } else {
      html.classList.remove("dark")
    }
  }

  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    applyTheme(newTheme)
    localStorage.setItem("theme", newTheme ? "dark" : "light")
  }

  const setTheme = (isDark: boolean) => {
    setIsDarkMode(isDark)
    applyTheme(isDark)
    localStorage.setItem("theme", isDark ? "dark" : "light")
  }

  return { isDarkMode, toggleTheme, setTheme }
}
