"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Heart, Share2, Play, Pause } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"

interface FeaturedProduct {
  id: number
  image: string
  name?: string
  price?: string
}

const FEATURED_PRODUCTS: FeaturedProduct[] = [
  { id: 1, image: "/premium-product-showcase-1.jpg", name: "Premium Drone", price: "$299" },
  { id: 2, image: "/premium-product-showcase-2.jpg", name: "Portable Projector", price: "$199" },
  { id: 3, image: "/premium-product-showcase-3.jpg", name: "Outdoor Jacket", price: "$149" },
  { id: 4, image: "/premium-product-showcase-4.jpg", name: "Robot Vacuum", price: "$399" },
  { id: 5, image: "/premium-product-showcase-5.jpg", name: "Cycling Jersey", price: "$79" },
  { id: 6, image: "/electronics-product.jpg", name: "Smart Watch", price: "$249" },
  { id: 7, image: "/manufacturing-product.jpg", name: "Industrial Tool", price: "$89" },
  { id: 8, image: "/retail-product.jpg", name: "Designer Bag", price: "$199" },
]

// Group products into slides (3 products per slide)
const PRODUCTS_PER_SLIDE = 3
const PRODUCT_SLIDES: FeaturedProduct[][] = []
for (let i = 0; i < FEATURED_PRODUCTS.length; i += PRODUCTS_PER_SLIDE) {
  PRODUCT_SLIDES.push(FEATURED_PRODUCTS.slice(i, i + PRODUCTS_PER_SLIDE))
}

export default function FeaturedProducts() {
  const { t } = useTranslation()
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && !isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentSlideIndex((prev) => (prev === PRODUCT_SLIDES.length - 1 ? 0 : prev + 1))
      }, 4000) // Change slide every 4 seconds
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying, isHovered])

  const handleSlideChange = (newIndex: number) => {
    if (isTransitioning || newIndex === currentSlideIndex) return
    
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentSlideIndex(newIndex)
      setTimeout(() => setIsTransitioning(false), 50)
    }, 300)
  }

  const handlePrevious = () => {
    const newIndex = currentSlideIndex === 0 ? PRODUCT_SLIDES.length - 1 : currentSlideIndex - 1
    handleSlideChange(newIndex)
  }

  const handleNext = () => {
    const newIndex = currentSlideIndex === PRODUCT_SLIDES.length - 1 ? 0 : currentSlideIndex + 1
    handleSlideChange(newIndex)
  }

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
  }

  const currentSlide = PRODUCT_SLIDES[currentSlideIndex]

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Section Header */}
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold tracking-tight mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {t('featuredProducts')}
        </h2>
        <p className="text-muted-foreground text-sm">{t('discoverCurated')}</p>
      </div>

      {/* Modern Curvy Slider Container */}
      <div 
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Main Slider with Curvy Design */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card via-card/95 to-card/90 border border-border/50 shadow-2xl backdrop-blur-sm">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-accent to-primary opacity-60"></div>
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-xl"></div>
          
          {/* Products Grid Container */}
          <div className="relative w-full p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentSlide.map((product: FeaturedProduct, index: number) => (
                <div 
                  key={`${currentSlideIndex}-${product.id}`}
                  className={`group/product relative bg-gradient-to-br from-white via-white to-gray-50/50 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700 ease-out hover:-translate-y-3 border border-gray-200/40 ${
                    isTransitioning ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'
                  }`}
                  style={{
                    boxShadow: '0 20px 60px rgba(0,0,0,0.15), 0 8px 30px rgba(0,0,0,0.08)',
                    animationDelay: `${index * 100}ms`,
                    animation: isTransitioning ? 'none' : 'slideInUp 0.6s ease-out forwards'
                  }}
                >
                  {/* Decorative gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover/product:opacity-100 transition-opacity duration-700"></div>
                  
                  {/* Product Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name || `Product ${product.id}`}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/product:scale-110"
                    />
                    
                    {/* Enhanced Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover/product:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Floating Action Buttons */}
                    <div className="absolute top-4 right-4 flex gap-3 opacity-0 group-hover/product:opacity-100 transition-all duration-500 transform translate-y-2 group-hover/product:translate-y-0">
                      <button className="p-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/30 hover:scale-110 hover:bg-white transition-all duration-300 hover:shadow-2xl">
                        <Heart className="w-5 h-5 text-red-500 hover:text-red-600 transition-colors" />
                      </button>
                      <button className="p-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/30 hover:scale-110 hover:bg-white transition-all duration-300 hover:shadow-2xl">
                        <Share2 className="w-5 h-5 text-blue-500 hover:text-blue-600 transition-colors" />
                      </button>
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-gray-700 opacity-0 group-hover/product:opacity-100 transition-all duration-500 transform translate-y-2 group-hover/product:translate-y-0 shadow-lg">
                      Featured
                    </div>
                  </div>
                  
                  {/* Product Info */}
                  <div className="relative p-6">
                    <h3 className="font-bold text-xl text-gray-900 mb-4 line-clamp-2 leading-tight">
                      {product.name || `Product ${product.id}`}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-3xl font-bold text-primary mb-1">
                          {product.price || "$99"}
                        </span>
                        <span className="text-sm text-gray-500 font-medium">Starting Price</span>
                      </div>
                      <button className="px-6 py-3 bg-gradient-to-r from-primary to-primary/90 text-white rounded-2xl hover:from-primary/90 hover:to-primary hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 text-sm font-bold transform hover:scale-105">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Modern Navigation Buttons */}
          <div className="absolute top-1/2 left-0 right-0 flex justify-between px-6 -translate-y-1/2 pointer-events-none">
            <button
              onClick={handlePrevious}
              disabled={isTransitioning}
              className={`group/btn p-3 bg-white/90 backdrop-blur-md text-primary rounded-2xl hover:bg-white hover:scale-110 transition-all duration-300 pointer-events-auto shadow-xl border border-white/20 hover:shadow-2xl ${
                isTransitioning ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-primary/20'
              }`}
              aria-label="Previous product"
            >
              <ChevronLeft className="w-6 h-6 group-hover/btn:-translate-x-0.5 transition-transform duration-300" />
            </button>
            <button
              onClick={handleNext}
              disabled={isTransitioning}
              className={`group/btn p-3 bg-white/90 backdrop-blur-md text-primary rounded-2xl hover:bg-white hover:scale-110 transition-all duration-300 pointer-events-auto shadow-xl border border-white/20 hover:shadow-2xl ${
                isTransitioning ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-primary/20'
              }`}
              aria-label="Next product"
            >
              <ChevronRight className="w-6 h-6 group-hover/btn:translate-x-0.5 transition-transform duration-300" />
            </button>
          </div>

          {/* Modern Navigation Indicators */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-3">
            {/* Auto-play Toggle */}
            <button
              onClick={toggleAutoPlay}
              className="group/play p-2 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 hover:bg-white hover:scale-110 transition-all duration-300"
              aria-label={isAutoPlaying ? "Pause auto-play" : "Start auto-play"}
            >
              {isAutoPlaying ? (
                <Pause className="w-4 h-4 text-primary group-hover/play:text-primary/80 transition-colors" />
              ) : (
                <Play className="w-4 h-4 text-primary group-hover/play:text-primary/80 transition-colors" />
              )}
            </button>

            {/* Page Counter */}
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-white/20">
              <span className="text-xs font-bold text-primary transition-colors duration-300">
                {currentSlideIndex + 1}
              </span>
              <span className="text-xs text-muted-foreground">/</span>
              <span className="text-xs font-bold text-muted-foreground">
                {PRODUCT_SLIDES.length}
              </span>
            </div>
            
            {/* Modern Dots */}
            <div className="flex gap-2">
              {PRODUCT_SLIDES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleSlideChange(index)}
                  disabled={isTransitioning}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentSlideIndex 
                      ? "bg-primary w-8 h-3 shadow-lg scale-110" 
                      : "bg-white/60 w-3 h-3 hover:bg-white/80 hover:scale-110"
                  } ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
