"use client"

import { useState } from "react"
import { Share2, MapPin, Calendar, Heart, ChevronLeft, ChevronRight } from "lucide-react"

interface Vendor {
  id: number
  name: string
  city: string
  province: string
  country: string
  postCode: string
  priceUSD: number
  pricePKR: number
  memberSince: number
  rating: number
  reviews: number
  badge: "FEATURED" | "VERIFIED" | "TOP_SELLER"
}

const VENDORS: Vendor[] = [
  {
    id: 1,
    name: "ABBOTSFORD",
    city: "ABBOTSFORD",
    province: "BRITISH COLUMBIA",
    country: "CANADA",
    postCode: "V2S0B6CAD",
    priceUSD: 322.5,
    pricePKR: 64885.72,
    memberSince: 2017,
    rating: 4.8,
    reviews: 342,
    badge: "FEATURED",
  },
  {
    id: 2,
    name: "TORONTO TRADERS",
    city: "TORONTO",
    province: "ONTARIO",
    country: "CANADA",
    postCode: "M5H2N2CAD",
    priceUSD: 450.0,
    pricePKR: 90450.0,
    memberSince: 2015,
    rating: 4.9,
    reviews: 521,
    badge: "TOP_SELLER",
  },
  {
    id: 3,
    name: "VANCOUVER VENTURES",
    city: "VANCOUVER",
    province: "BRITISH COLUMBIA",
    country: "CANADA",
    postCode: "V6B2R3CAD",
    priceUSD: 275.75,
    pricePKR: 55350.0,
    memberSince: 2018,
    rating: 4.7,
    reviews: 289,
    badge: "VERIFIED",
  },
  {
    id: 4,
    name: "CALGARY COMMERCE",
    city: "CALGARY",
    province: "ALBERTA",
    country: "CANADA",
    postCode: "T2P1M4CAD",
    priceUSD: 380.0,
    pricePKR: 76400.0,
    memberSince: 2016,
    rating: 4.6,
    reviews: 198,
    badge: "FEATURED",
  },
  {
    id: 5,
    name: "MONTREAL MARKET",
    city: "MONTREAL",
    province: "QUEBEC",
    country: "CANADA",
    postCode: "H2X1Y7CAD",
    priceUSD: 410.25,
    pricePKR: 82450.0,
    memberSince: 2014,
    rating: 4.9,
    reviews: 612,
    badge: "TOP_SELLER",
  },
  {
    id: 6,
    name: "OTTAWA OUTLETS",
    city: "OTTAWA",
    province: "ONTARIO",
    country: "CANADA",
    postCode: "K1A0B1CAD",
    priceUSD: 295.5,
    pricePKR: 59400.0,
    memberSince: 2017,
    rating: 4.5,
    reviews: 156,
    badge: "VERIFIED",
  },
  {
    id: 7,
    name: "WINNIPEG WHOLESALE",
    city: "WINNIPEG",
    province: "MANITOBA",
    country: "CANADA",
    postCode: "R3B0N9CAD",
    priceUSD: 365.0,
    pricePKR: 73400.0,
    memberSince: 2016,
    rating: 4.4,
    reviews: 127,
    badge: "VERIFIED",
  },
  {
    id: 8,
    name: "EDMONTON ENTERPRISES",
    city: "EDMONTON",
    province: "ALBERTA",
    country: "CANADA",
    postCode: "T5J2R7CAD",
    priceUSD: 395.0,
    pricePKR: 79400.0,
    memberSince: 2015,
    rating: 4.7,
    reviews: 234,
    badge: "FEATURED",
  },
  {
    id: 9,
    name: "QUEBEC QUALITY",
    city: "QUEBEC CITY",
    province: "QUEBEC",
    country: "CANADA",
    postCode: "G1R4P5CAD",
    priceUSD: 340.0,
    pricePKR: 68400.0,
    memberSince: 2017,
    rating: 4.6,
    reviews: 189,
    badge: "TOP_SELLER",
  },
]

const ITEMS_PER_PAGE = 6

const getBadgeColor = (badge: string) => {
  switch (badge) {
    case "FEATURED":
      return "bg-primary text-primary-foreground"
    case "TOP_SELLER":
      return "bg-accent text-accent-foreground"
    case "VERIFIED":
      return "bg-green-500/20 text-green-700 dark:text-green-400"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export default function VendorGrid() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(VENDORS.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentVendors = VENDORS.slice(startIndex, endIndex)

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const handlePageClick = (page: number) => {
    setCurrentPage(page)
  }

  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= maxVisible; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push("...")
        for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push("...")
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Section Header */}
      <div className="mb-12">
        <h2 className="text-4xl font-bold tracking-tight mb-2">FEATURED VENDORS</h2>
        <p className="text-muted-foreground text-sm">
          Trusted sellers from around the world with verified ratings and secure transactions
        </p>
      </div>

      {/* Vendor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {currentVendors.map((vendor) => (
          <div
            key={vendor.id}
            onMouseEnter={() => setHoveredId(vendor.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-xl hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Card Header with Badge */}
            <div className="relative bg-gradient-to-r from-primary/10 to-accent/10 px-6 py-4 border-b border-border">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest ${getBadgeColor(vendor.badge)}`}
                  >
                    {vendor.badge.replace("_", " ")}
                  </span>
                </div>
                <button
                  onClick={() => toggleFavorite(vendor.id)}
                  className="p-2 hover:bg-background rounded-full transition-colors"
                  aria-label={favorites.includes(vendor.id) ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart
                    className={`w-5 h-5 transition-all ${
                      favorites.includes(vendor.id)
                        ? "fill-red-500 text-red-500"
                        : "text-muted-foreground hover:text-red-500"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 space-y-4">
              {/* Vendor Info */}
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {vendor.name}
                </h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>
                      {vendor.city}, {vendor.province}
                    </span>
                  </div>
                  <p>{vendor.country}</p>
                  <p className="text-xs font-mono">POST CODE: {vendor.postCode}</p>
                </div>
              </div>

              {/* Rating and Reviews */}
              <div className="border-t border-border pt-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-lg ${i < Math.floor(vendor.rating) ? "text-yellow-500" : "text-muted-foreground"}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="font-bold text-foreground">{vendor.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">({vendor.reviews} reviews)</span>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <p className="text-2xl font-bold text-primary">${vendor.priceUSD.toFixed(2)} USD</p>
                <p className="text-sm text-muted-foreground">
                  {vendor.pricePKR.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  PKR
                </p>
              </div>

              {/* Member Since */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="w-4 h-4 text-primary" />
                <span>MEMBER SINCE {vendor.memberSince}</span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button className="flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm font-medium group/btn">
                  <Share2 className="w-4 h-4 group-hover/btn:text-primary transition-colors" />
                  <span className="hidden sm:inline">SHARE</span>
                </button>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm font-medium">
                  VIEW STORE
                </button>
              </div>
            </div>

            {/* Hover Indicator */}
            {hoveredId === vendor.id && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent"></div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 py-8 border-t border-border">
        {/* Previous Button */}
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="p-2 border border-border rounded-lg hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => (
            <div key={index}>
              {page === "..." ? (
                <span className="px-2 text-muted-foreground">...</span>
              ) : (
                <button
                  onClick={() => handlePageClick(page as number)}
                  className={`px-3 py-2 rounded-lg font-medium transition-all ${
                    currentPage === page ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"
                  }`}
                  aria-label={`Go to page ${page}`}
                  aria-current={currentPage === page ? "page" : undefined}
                >
                  {page}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="p-2 border border-border rounded-lg hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Next page"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Results Info */}
      <div className="text-center mt-6 text-sm text-muted-foreground">
        Showing {startIndex + 1} to {Math.min(endIndex, VENDORS.length)} of {VENDORS.length} vendors
      </div>

      {/* View All Vendors CTA */}
      <div className="mt-12 text-center">
        <button className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-105">
          VIEW ALL VENDORS
        </button>
      </div>
    </section>
  )
}
