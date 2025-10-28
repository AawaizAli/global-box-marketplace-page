"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { Search, ChevronDown, X, Share2, Heart, ShoppingCart } from "lucide-react"

interface Product {
  id: number
  title: string
  image: string
  vendor: string
  city: string
  region: string
  country: string
  postCode: string
  priceUSD: number
  priceGBP: number
  pricePKR: number
  conversionRate: number
  memberSince: number
  category: string
  segment: string
}

interface TooltipState {
  type: "vendor" | "city" | "region" | "country" | "postCode" | null
  productId: number | null
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Industrial Electronics Module",
    image: "/electronics-product.jpg",
    vendor: "TechVision Industries",
    city: "ABBOTSFORD",
    region: "BRITISH COLUMBIA",
    country: "CANADA",
    postCode: "V2S0B6CAD",
    priceUSD: 322.5,
    priceGBP: 255.0,
    pricePKR: 84885.72,
    conversionRate: 263.0,
    memberSince: 2017,
    category: "Electronics",
    segment: "B2B",
  },
  {
    id: 2,
    title: "Premium Textile Fabric Roll",
    image: "/textile-product.jpg",
    vendor: "Global Textile Co.",
    city: "MITCHAM",
    region: "COVENT GARDEN",
    country: "UNITED KINGDOM",
    postCode: "CR43AQGBP",
    priceUSD: 309.6,
    priceGBP: 245.0,
    pricePKR: 101768.75,
    conversionRate: 328.0,
    memberSince: 2017,
    category: "Textiles",
    segment: "B2C",
  },
  {
    id: 3,
    title: "Manufacturing Equipment Part",
    image: "/manufacturing-product.jpg",
    vendor: "Premier Manufacturing Ltd.",
    city: "SHANGHAI",
    region: "SHANGHAI",
    country: "CHINA",
    postCode: "12345CNY",
    priceUSD: 148.35,
    priceGBP: 117.5,
    pricePKR: 48876.56,
    conversionRate: 329.0,
    memberSince: 2017,
    category: "Manufacturing",
    segment: "B2B",
  },
  {
    id: 4,
    title: "Retail Solutions Package",
    image: "/retail-product.jpg",
    vendor: "Retail Solutions Inc.",
    city: "TORONTO",
    region: "ONTARIO",
    country: "CANADA",
    postCode: "M5H2N2CAD",
    priceUSD: 450.0,
    priceGBP: 356.0,
    pricePKR: 147450.0,
    conversionRate: 327.5,
    memberSince: 2015,
    category: "Retail",
    segment: "B2C",
  },
  {
    id: 5,
    title: "Fashion Forward Collection",
    image: "/diverse-fashion-display.png",
    vendor: "Fashion Forward Ltd.",
    city: "LONDON",
    region: "GREATER LONDON",
    country: "UNITED KINGDOM",
    postCode: "SW1A1AAGBP",
    priceUSD: 275.0,
    priceGBP: 217.5,
    pricePKR: 90500.0,
    conversionRate: 329.0,
    memberSince: 2016,
    category: "Fashion",
    segment: "B2C",
  },
  {
    id: 6,
    title: "Organic Harvest Products",
    image: "/agriculture-product.jpg",
    vendor: "Organic Harvest Group",
    city: "SYDNEY",
    region: "NEW SOUTH WALES",
    country: "AUSTRALIA",
    postCode: "2000AUD",
    priceUSD: 395.0,
    priceGBP: 312.5,
    pricePKR: 129400.0,
    conversionRate: 327.5,
    memberSince: 2018,
    category: "Agriculture",
    segment: "B2B",
  },
  {
    id: 7,
    title: "ElectroTech Premium Device",
    image: "/electronics-premium.jpg",
    vendor: "ElectroTech Premium",
    city: "TOKYO",
    region: "TOKYO",
    country: "JAPAN",
    postCode: "100-0001JPY",
    priceUSD: 520.0,
    priceGBP: 411.5,
    pricePKR: 170600.0,
    conversionRate: 328.0,
    memberSince: 2014,
    category: "Electronics",
    segment: "B2B",
  },
  {
    id: 8,
    title: "Luxury Goods International",
    image: "/retail-luxury.jpg",
    vendor: "Luxury Goods International",
    city: "DUBAI",
    region: "DUBAI",
    country: "UNITED ARAB EMIRATES",
    postCode: "00000AED",
    priceUSD: 410.0,
    priceGBP: 324.5,
    pricePKR: 134700.0,
    conversionRate: 328.5,
    memberSince: 2016,
    category: "Retail",
    segment: "B2C",
  },
  {
    id: 9,
    title: "Singapore Industrial Supply",
    image: "/manufacturing-industrial.jpg",
    vendor: "Singapore Industrial Corp.",
    city: "SINGAPORE",
    region: "SINGAPORE",
    country: "SINGAPORE",
    postCode: "018956SGD",
    priceUSD: 365.0,
    priceGBP: 289.0,
    pricePKR: 119300.0,
    conversionRate: 326.5,
    memberSince: 2017,
    category: "Manufacturing",
    segment: "B2B",
  },
]

const ITEMS_PER_PAGE = 6

// Helper functions to count products by filter criteria
const getProductCountByVendor = (vendor: string, products: Product[]) => {
  return products.filter((p) => p.vendor === vendor).length
}

const getProductCountByCity = (city: string, products: Product[]) => {
  return products.filter((p) => p.city === city).length
}

const getProductCountByRegion = (region: string, products: Product[]) => {
  return products.filter((p) => p.region === region).length
}

const getProductCountByCountry = (country: string, products: Product[]) => {
  return products.filter((p) => p.country === country).length
}

const getProductCountByPostCode = (postCode: string, products: Product[]) => {
  return products.filter((p) => p.postCode === postCode).length
}

// Tooltip component
const Tooltip = ({
  text,
  children,
  isVisible,
  mouseX,
  mouseY,
}: {
  text: string
  children: React.ReactNode
  isVisible: boolean
  mouseX: number
  mouseY: number
}) => (
  <div className="relative block">
    {children}
    {isVisible && (
      <div
        className="fixed px-3 py-2 bg-primary text-primary-foreground text-xs font-medium rounded-lg whitespace-nowrap z-50 shadow-lg pointer-events-none"
        style={{
          left: `${mouseX + 10}px`,
          top: `${mouseY - 10}px`,
        }}
      >
        {text}
      </div>
    )}
  </div>
)

export default function ProductsGrid() {
  const [searchTerm, setSearchTerm] = useState("")
  const [marketSegment, setMarketSegment] = useState("")
  const [sortBy, setSortBy] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [wishlist, setWishlist] = useState<number[]>([])
  const [tooltip, setTooltip] = useState<TooltipState>({ type: null, productId: null })
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const filteredAndSortedProducts = useMemo(() => {
    let results = PRODUCTS

    // Search filter
    if (searchTerm) {
      results = results.filter(
        (product) =>
          product.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Market segment filter
    if (marketSegment) {
      results = results.filter((product) => product.segment === marketSegment)
    }

    // Sorting
    if (sortBy === "price-low") {
      results.sort((a, b) => a.priceUSD - b.priceUSD)
    } else if (sortBy === "price-high") {
      results.sort((a, b) => b.priceUSD - a.priceUSD)
    } else if (sortBy === "city-az") {
      results.sort((a, b) => a.city.localeCompare(b.city))
    } else if (sortBy === "rating") {
      results.sort((a, b) => b.memberSince - a.memberSince)
    }

    return results
  }, [searchTerm, marketSegment, sortBy])

  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentProducts = filteredAndSortedProducts.slice(startIndex, endIndex)

  const handleClearFilters = () => {
    setSearchTerm("")
    setMarketSegment("")
    setSortBy("")
    setCurrentPage(1)
  }

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  const hasActiveFilters = searchTerm || marketSegment || sortBy

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" onMouseMove={handleMouseMove}>
      {/* Section Header */}
      <div className="mb-12">
        <h2 className="text-4xl font-bold tracking-tight mb-2">PRODUCTS</h2>
        <p className="text-muted-foreground text-sm mb-4">PRICES INCLUDE ALL SALES TAXES EXCEPT CROSS-BORDER DUTIES</p>
      </div>

      {/* Search and Filter Controls */}
      <div className="bg-card border border-border rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by City, Country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              aria-label="Search by City or Country"
            />
          </div>

          {/* Market Segment Filter */}
          <div className="relative">
            <select
              value={marketSegment}
              onChange={(e) => setMarketSegment(e.target.value)}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer transition-all"
              aria-label="Filter by Market Segment"
            >
              <option value="">Filter by Market Segment</option>
              <option value="B2B">B2B</option>
              <option value="B2C">B2C</option>
              <option value="B2G">B2G</option>
              <option value="M2B">M2B</option>
              <option value="M2C">M2C</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-muted-foreground pointer-events-none" />
          </div>

          {/* Sort By Filter */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer transition-all"
              aria-label="Sort by"
            >
              <option value="">Sort by</option>
              <option value="price-low">Price - Low to High</option>
              <option value="price-high">Price - High to Low</option>
              <option value="city-az">City A-Z</option>
              <option value="rating">Newest Members</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 items-center pt-4 border-t border-border">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {searchTerm && (
              <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                <span>Search: {searchTerm}</span>
                <button
                  onClick={() => setSearchTerm("")}
                  className="hover:opacity-70 transition-opacity"
                  aria-label="Remove search filter"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            {marketSegment && (
              <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                <span>Segment: {marketSegment}</span>
                <button
                  onClick={() => setMarketSegment("")}
                  className="hover:opacity-70 transition-opacity"
                  aria-label="Remove segment filter"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            {sortBy && (
              <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                <span>Sort: {sortBy.replace("-", " ")}</span>
                <button
                  onClick={() => setSortBy("")}
                  className="hover:opacity-70 transition-opacity"
                  aria-label="Remove sort filter"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            <button
              onClick={handleClearFilters}
              className="ml-auto text-sm text-muted-foreground hover:text-foreground transition-colors underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{filteredAndSortedProducts.length}</span> of{" "}
          <span className="font-semibold text-foreground">{PRODUCTS.length}</span> products
        </p>
      </div>

      {/* Products Grid */}
      {currentProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all duration-300 group flex flex-col"
            >
              <div className="px-6 pt-6 pb-3">
                <h3 className="text-center text-sm font-bold text-foreground line-clamp-1">{product.title}</h3>
              </div>

              <div className="relative w-full aspect-square bg-muted overflow-hidden mb-6 rounded-lg">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full transition-all shadow-md"
                  aria-label="Add to wishlist"
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${
                      wishlist.includes(product.id) ? "fill-primary text-primary" : "text-muted-foreground"
                    }`}
                  />
                </button>
              </div>

              {/* Product Content */}
              <div className="px-6 flex flex-col flex-grow">
                {/* Product Header */}
                <div className="mb-4 pb-4 border-b border-border">
                  <p className="text-xs font-bold text-muted-foreground tracking-widest mb-2">VENDOR:</p>
                  <Tooltip
                    text={`Show ${getProductCountByVendor(product.vendor, PRODUCTS)} products posted by this vendor`}
                    isVisible={tooltip.type === "vendor" && tooltip.productId === product.id}
                    mouseX={mousePos.x}
                    mouseY={mousePos.y}
                  >
                    <p
                      className="text-sm font-semibold text-foreground cursor-pointer hover:text-primary transition-colors"
                      onMouseEnter={() => setTooltip({ type: "vendor", productId: product.id })}
                      onMouseLeave={() => setTooltip({ type: null, productId: null })}
                    >
                      {product.vendor}
                    </p>
                  </Tooltip>
                </div>

                {/* Location Information */}
                <div className="space-y-2 mb-4 pb-4 border-b border-border">
                  <Tooltip
                    text={`Show ${getProductCountByCity(product.city, PRODUCTS)} products posted in ${product.city}`}
                    isVisible={tooltip.type === "city" && tooltip.productId === product.id}
                    mouseX={mousePos.x}
                    mouseY={mousePos.y}
                  >
                    <p
                      className="text-lg font-bold text-foreground cursor-pointer hover:text-primary transition-colors"
                      onMouseEnter={() => setTooltip({ type: "city", productId: product.id })}
                      onMouseLeave={() => setTooltip({ type: null, productId: null })}
                    >
                      {product.city}
                    </p>
                  </Tooltip>
                  <Tooltip
                    text={`Show ${getProductCountByRegion(product.region, PRODUCTS)} products posted in ${product.region}`}
                    isVisible={tooltip.type === "region" && tooltip.productId === product.id}
                    mouseX={mousePos.x}
                    mouseY={mousePos.y}
                  >
                    <p
                      className="text-sm text-muted-foreground cursor-pointer hover:text-primary transition-colors"
                      onMouseEnter={() => setTooltip({ type: "region", productId: product.id })}
                      onMouseLeave={() => setTooltip({ type: null, productId: null })}
                    >
                      {product.region}
                    </p>
                  </Tooltip>
                  <Tooltip
                    text={`Show ${getProductCountByCountry(product.country, PRODUCTS)} products posted in ${product.country}`}
                    isVisible={tooltip.type === "country" && tooltip.productId === product.id}
                    mouseX={mousePos.x}
                    mouseY={mousePos.y}
                  >
                    <p
                      className="text-sm text-muted-foreground cursor-pointer hover:text-primary transition-colors"
                      onMouseEnter={() => setTooltip({ type: "country", productId: product.id })}
                      onMouseLeave={() => setTooltip({ type: null, productId: null })}
                    >
                      {product.country}
                    </p>
                  </Tooltip>
                  <Tooltip
                    text={`Show ${getProductCountByPostCode(product.postCode, PRODUCTS)} products with postal code ${product.postCode}`}
                    isVisible={tooltip.type === "postCode" && tooltip.productId === product.id}
                    mouseX={mousePos.x}
                    mouseY={mousePos.y}
                  >
                    <p
                      className="text-xs font-mono text-muted-foreground cursor-pointer hover:text-primary transition-colors"
                      onMouseEnter={() => setTooltip({ type: "postCode", productId: product.id })}
                      onMouseLeave={() => setTooltip({ type: null, productId: null })}
                    >
                      POST CODE: {product.postCode}
                    </p>
                  </Tooltip>
                </div>

                <div className="space-y-2 mb-4 pb-4 border-b border-border">
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold text-primary">${product.priceUSD.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">USD</p>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <p className="text-lg font-semibold text-foreground">£{product.priceGBP.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">GBP</p>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <p className="text-lg font-semibold text-foreground">{product.pricePKR.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">PKR (1 USD = {product.conversionRate.toFixed(2)})</p>
                  </div>
                </div>

                {/* Member Since */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                  <p className="text-xs font-semibold text-muted-foreground">MEMBER SINCE</p>
                  <p className="text-sm font-bold text-foreground">{product.memberSince}</p>
                </div>

                <div className="flex gap-2 mt-auto mb-6">
                  <button
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-border rounded-lg font-medium hover:bg-muted transition-colors text-sm"
                    aria-label="Share product"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Share</span>
                  </button>
                  <button
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-md hover:shadow-lg text-sm"
                    aria-label="Add to cart"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No products found matching your filters.</p>
          <button onClick={handleClearFilters} className="text-primary font-medium hover:underline">
            Clear filters and try again
          </button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 py-8 border-t border-border">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-border rounded-lg hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            aria-label="Previous page"
          >
            Previous
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded-lg font-medium transition-all ${
                  currentPage === page ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"
                }`}
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-border rounded-lg hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      )}

      {/* Results Info */}
      <div className="text-center mt-6 text-sm text-muted-foreground">
        Showing {startIndex + 1} to {Math.min(endIndex, filteredAndSortedProducts.length)} of{" "}
        {filteredAndSortedProducts.length} products
      </div>
    </section>
  )
}
