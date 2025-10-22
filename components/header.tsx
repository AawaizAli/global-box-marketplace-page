"use client"

import { useState } from "react"
import { ShoppingCart, Menu, X, Moon, Sun } from "lucide-react"
import { useTheme } from "@/hooks/use-theme"

interface HeaderProps {
  country: string
}

export default function Header({ country }: HeaderProps) {
  const [language, setLanguage] = useState<"EN" | "UR">("EN")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border transition-colors duration-300">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Navigation */}
        <div className="flex items-center justify-between h-16">
          {/* Left: Language Selector */}
          <div className="flex items-center gap-4">
            <div className="flex gap-2 bg-muted rounded-lg p-1">
              <button
                onClick={() => setLanguage("EN")}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  language === "EN" ? "bg-primary text-primary-foreground" : "text-foreground hover:text-primary"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("UR")}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  language === "UR" ? "bg-primary text-primary-foreground" : "text-foreground hover:text-primary"
                }`}
              >
                UR
              </button>
            </div>
          </div>

          {/* Center: Logo */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <h1 className="text-2xl font-bold tracking-tight text-primary">GLOBALBOX</h1>
          </div>

          {/* Right: Cart, Theme Toggle and Menu */}
          <div className="flex items-center gap-6">
            <a href="#cart" className="flex items-center gap-2 hover:text-primary transition-colors">
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline text-sm font-medium">PKR 0</span>
            </a>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Main Menu */}
        <div className="hidden md:flex items-center justify-center gap-8 py-4 border-t border-border">
          <a href="#deals" className="text-sm font-medium hover:text-primary transition-colors">
            DEALS AND PROMOTIONS
          </a>
          <a href="#search" className="text-sm font-medium hover:text-primary transition-colors">
            ADVANCED SEARCH
          </a>
        </div>

        {/* Tagline */}
        <div className="text-center py-3 border-t border-border">
          <p className="text-xs sm:text-sm font-semibold tracking-widest text-muted-foreground">
            THE WORLD'S ONLINE STORE • {country.toUpperCase()}
          </p>
        </div>
      </nav>
    </header>
  )
}
