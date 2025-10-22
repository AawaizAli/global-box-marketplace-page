"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import FeaturedProducts from "@/components/featured-products"
import ProductsGrid from "@/components/products-grid"
import Footer from "@/components/footer"
import { useLocationAndWeather } from "@/hooks/use-location-weather"

export default function Home() {
  const { country, isDarkMode, isLoading } = useLocationAndWeather()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground">Loading marketplace...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <Header country={country} />
        <Hero country={country} isDarkMode={isDarkMode} />
        <FeaturedProducts />
        <ProductsGrid />
        <Footer />
      </div>
    </div>
  )
}
