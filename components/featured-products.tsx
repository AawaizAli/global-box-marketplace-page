"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Heart, Share2 } from "lucide-react"
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

  const handlePrevious = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? PRODUCT_SLIDES.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev === PRODUCT_SLIDES.length - 1 ? 0 : prev + 1))
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
      <div className="relative group">
        {/* Main Slider with Curvy Design */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card via-card/95 to-card/90 border border-border/50 shadow-2xl backdrop-blur-sm">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-accent to-primary opacity-60"></div>
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-xl"></div>
          
          {/* Products Grid Container */}
          <div className="relative w-full p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentSlide.map((product: FeaturedProduct, index: number) => (
                <div key={product.id} className="group/product relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  {/* Product Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name || `Product ${product.id}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover/product:scale-105"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                    
                    {/* Action Buttons */}
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover/product:opacity-100 transition-opacity duration-300">
                      <button className="p-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-white/20 hover:scale-110 transition-all duration-300 hover:bg-white">
                        <Heart className="w-4 h-4 text-primary" />
                      </button>
                      <button className="p-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-white/20 hover:scale-110 transition-all duration-300 hover:bg-white">
                        <Share2 className="w-4 h-4 text-accent" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                      {product.name || `Product ${product.id}`}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">
                        {product.price || "$99"}
                      </span>
                      <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200 text-sm font-medium">
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
              className="group/btn p-3 bg-white/90 backdrop-blur-md text-primary rounded-2xl hover:bg-white hover:scale-110 transition-all duration-300 pointer-events-auto shadow-xl border border-white/20 hover:shadow-2xl"
              aria-label="Previous product"
            >
              <ChevronLeft className="w-6 h-6 group-hover/btn:-translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={handleNext}
              className="group/btn p-3 bg-white/90 backdrop-blur-md text-primary rounded-2xl hover:bg-white hover:scale-110 transition-all duration-300 pointer-events-auto shadow-xl border border-white/20 hover:shadow-2xl"
              aria-label="Next product"
            >
              <ChevronRight className="w-6 h-6 group-hover/btn:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Modern Navigation Indicators */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-3">
            {/* Page Counter */}
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-white/20">
              <span className="text-xs font-bold text-primary">
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
                  onClick={() => setCurrentSlideIndex(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentSlideIndex 
                      ? "bg-primary w-8 h-3 shadow-lg" 
                      : "bg-white/60 w-3 h-3 hover:bg-white/80 hover:scale-110"
                  }`}
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
