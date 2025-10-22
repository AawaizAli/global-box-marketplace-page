"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface FeaturedProduct {
  id: number
  image: string
}

const FEATURED_PRODUCTS: FeaturedProduct[] = [
  { id: 1, image: "/premium-product-showcase-1.jpg" },
  { id: 2, image: "/premium-product-showcase-2.jpg" },
  { id: 3, image: "/premium-product-showcase-3.jpg" },
  { id: 4, image: "/premium-product-showcase-4.jpg" },
  { id: 5, image: "/premium-product-showcase-5.jpg" },
]

export default function FeaturedProducts() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? FEATURED_PRODUCTS.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === FEATURED_PRODUCTS.length - 1 ? 0 : prev + 1))
  }

  const currentProduct = FEATURED_PRODUCTS[currentIndex]

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Section Header */}
      <div className="mb-12">
        <h2 className="text-4xl font-bold tracking-tight mb-2">FEATURED PRODUCTS</h2>
        <p className="text-muted-foreground text-sm">DISCOVER OUR CURATED SELECTION</p>
      </div>

      {/* Featured Products Slider - Image Only */}
      <div className="relative bg-card border border-border rounded-lg overflow-hidden">
        {/* Slider Image */}
        <div className="relative w-full h-96 md:h-[500px] bg-muted">
          <img
            src={currentProduct.image || "/placeholder.svg"}
            alt={`Featured product ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Navigation Buttons */}
        <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 -translate-y-1/2 pointer-events-none">
          <button
            onClick={handlePrevious}
            className="p-2 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity pointer-events-auto shadow-lg"
            aria-label="Previous product"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity pointer-events-auto shadow-lg"
            aria-label="Next product"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Indicators - Bottom */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-2">
          <span className="text-xs font-semibold text-white bg-black/40 px-3 py-1 rounded-full">
            {currentIndex + 1} / {FEATURED_PRODUCTS.length}
          </span>
          <div className="flex gap-1">
            {FEATURED_PRODUCTS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? "bg-primary w-8" : "bg-white/50 w-2"
                }`}
                aria-label={`Go to product ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
