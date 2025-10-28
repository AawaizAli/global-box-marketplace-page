"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { Search, ChevronDown, X, Share2, Heart, ShoppingCart, Grid3X3, List } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"

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
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState("")
  const [marketSegment, setMarketSegment] = useState("")
  const [sortBy, setSortBy] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [wishlist, setWishlist] = useState<number[]>([])
  const [tooltip, setTooltip] = useState<TooltipState>({ type: null, productId: null })
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

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
        <h2 className="text-4xl font-bold tracking-tight mb-2">{t('products')}</h2>
        <p className="text-muted-foreground text-sm mb-4">{t('pricesIncludeTaxes')}</p>
      </div>

      {/* Search and Filter Controls */}
      <div className="bg-card border border-border rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
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
              <option value="">{t('filterBySegment')}</option>
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
              <option value="">{t('sortBy')}</option>
              <option value="price-low">{t('priceLowToHigh')}</option>
              <option value="price-high">{t('priceHighToLow')}</option>
              <option value="city-az">{t('cityAZ')}</option>
              <option value="rating">{t('newestMembers')}</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 items-center pt-4 border-t border-border">
            <span className="text-sm text-muted-foreground">{t('activeFilters')}</span>
            {searchTerm && (
              <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                <span>{t('search')}: {searchTerm}</span>
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
                <span>{t('segment')}: {marketSegment}</span>
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
                <span>{t('sort')}: {sortBy.replace("-", " ")}</span>
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
              {t('clearAll')}
            </button>
          </div>
        )}
      </div>

      {/* Results Count and View Toggle */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {t('showing')} <span className="font-semibold text-foreground">{filteredAndSortedProducts.length}</span> {t('of')}{" "}
          <span className="font-semibold text-foreground">{PRODUCTS.length}</span> {t('products')}
        </p>
        
        {/* View Toggle Buttons */}
        <div className="flex items-center gap-2 bg-gray-100 rounded-2xl p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
              viewMode === "grid"
                ? "bg-white text-primary shadow-md font-semibold"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
            }`}
            aria-label="Grid view"
          >
            <Grid3X3 className="w-4 h-4" />
            <span className="hidden sm:inline text-sm">Grid</span>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
              viewMode === "list"
                ? "bg-white text-primary shadow-md font-semibold"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
            }`}
            aria-label="List view"
          >
            <List className="w-4 h-4" />
            <span className="hidden sm:inline text-sm">List</span>
          </button>
        </div>
      </div>

      {/* Products Display */}
      {currentProducts.length > 0 ? (
        viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {currentProducts.map((product) => (
              <div
                key={product.id}
                className="group relative bg-gradient-to-br from-white via-white to-gray-50/50 border border-gray-200/60 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-500 ease-out flex flex-col backdrop-blur-sm"
                style={{
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1), 0 4px 20px rgba(0,0,0,0.05)',
                }}
              >
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Product title header */}
              <div className="relative px-6 pt-6 pb-4">
                <h3 className="text-center text-lg font-bold text-gray-900 line-clamp-2 leading-tight">{product.title}</h3>
              </div>

              {/* Product image container with 3D effect */}
              <div className="relative mx-6 mb-6">
                <div className="relative w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-500">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Gradient overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Wishlist button with modern styling */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-4 right-4 p-3 bg-white/95 backdrop-blur-md hover:bg-white rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 border border-white/20"
                    aria-label="Add to wishlist"
                  >
                    <Heart
                      className={`w-5 h-5 transition-all duration-300 ${
                        wishlist.includes(product.id) ? "fill-red-500 text-red-500 scale-110" : "text-gray-600 hover:text-red-500"
                      }`}
                    />
                  </button>
                  
                  {/* Floating action indicator */}
                  <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-semibold text-gray-700 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    {product.category}
                  </div>
                </div>
              </div>

              {/* Product Content */}
              <div className="relative px-6 flex flex-col flex-grow">
                {/* Vendor Section */}
                <div className="mb-5 pb-5 border-b border-gray-200/60">
                  <p className="text-xs font-bold text-gray-500 tracking-widest mb-3 uppercase">{t('vendor')}</p>
                  <Tooltip
                    text={`Show ${getProductCountByVendor(product.vendor, PRODUCTS)} products posted by this vendor`}
                    isVisible={tooltip.type === "vendor" && tooltip.productId === product.id}
                    mouseX={mousePos.x}
                    mouseY={mousePos.y}
                  >
                    <p
                      className="text-base font-bold text-gray-900 cursor-pointer hover:text-primary transition-colors duration-300"
                      onMouseEnter={() => setTooltip({ type: "vendor", productId: product.id })}
                      onMouseLeave={() => setTooltip({ type: null, productId: null })}
                    >
                      {product.vendor}
                    </p>
                  </Tooltip>
                </div>

                {/* Location Information */}
                <div className="space-y-3 mb-5 pb-5 border-b border-gray-200/60">
                  <Tooltip
                    text={`Show ${getProductCountByCity(product.city, PRODUCTS)} products posted in ${product.city}`}
                    isVisible={tooltip.type === "city" && tooltip.productId === product.id}
                    mouseX={mousePos.x}
                    mouseY={mousePos.y}
                  >
                    <p
                      className="text-xl font-bold text-gray-900 cursor-pointer hover:text-primary transition-colors duration-300"
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
                      className="text-sm text-gray-600 cursor-pointer hover:text-primary transition-colors duration-300"
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
                      className="text-sm text-gray-600 cursor-pointer hover:text-primary transition-colors duration-300"
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
                      className="text-xs font-mono text-gray-500 cursor-pointer hover:text-primary transition-colors duration-300"
                      onMouseEnter={() => setTooltip({ type: "postCode", productId: product.id })}
                      onMouseLeave={() => setTooltip({ type: null, productId: null })}
                    >
                      {t('postCode')} {product.postCode}
                    </p>
                  </Tooltip>
                </div>

                {/* Pricing Section */}
                <div className="space-y-3 mb-5 pb-5 border-b border-gray-200/60">
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold text-primary">${product.priceUSD.toFixed(2)}</p>
                    <p className="text-sm text-gray-500 font-medium">USD</p>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <p className="text-xl font-bold text-gray-800">£{product.priceGBP.toFixed(2)}</p>
                    <p className="text-sm text-gray-500 font-medium">GBP</p>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <p className="text-lg font-semibold text-gray-700">{product.pricePKR.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">PKR (1 USD = {product.conversionRate.toFixed(2)})</p>
                  </div>
                </div>

                {/* Member Since */}
                <div className="flex items-center justify-between mb-6 pb-5 border-b border-gray-200/60">
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{t('memberSince')}</p>
                  <div className="px-3 py-1 bg-primary/10 rounded-full">
                    <p className="text-sm font-bold text-primary">{product.memberSince}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-auto mb-6">
                  <button
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-2xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 text-sm shadow-sm hover:shadow-md"
                    aria-label="Share product"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="hidden sm:inline">{t('share')}</span>
                  </button>
                  <button
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-primary to-primary/90 text-white rounded-2xl font-bold hover:from-primary/90 hover:to-primary hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 text-sm transform hover:scale-105"
                    aria-label="Add to cart"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>{t('addToCart')}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        ) : (
          /* List View */
          <div className="space-y-6 mb-12">
            {currentProducts.map((product) => (
              <div
                key={product.id}
                className="group relative bg-gradient-to-r from-white via-white to-gray-50/50 border border-gray-200/60 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-500 ease-out backdrop-blur-sm"
                style={{
                  boxShadow: '0 8px 30px rgba(0,0,0,0.08), 0 2px 10px rgba(0,0,0,0.04)',
                }}
              >
                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="flex flex-col lg:flex-row">
                  {/* Product Image */}
                  <div className="relative lg:w-80 lg:h-64 h-48 overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Wishlist button */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-4 right-4 p-3 bg-white/95 backdrop-blur-md hover:bg-white rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 border border-white/20"
                      aria-label="Add to wishlist"
                    >
                      <Heart
                        className={`w-5 h-5 transition-all duration-300 ${
                          wishlist.includes(product.id) ? "fill-red-500 text-red-500 scale-110" : "text-gray-600 hover:text-red-500"
                        }`}
                      />
                    </button>
                    
                    {/* Category badge */}
                    <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-semibold text-gray-700 shadow-lg">
                      {product.category}
                    </div>
                  </div>
                  
                  {/* Product Content */}
                  <div className="flex-1 p-6 lg:p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between h-full">
                      {/* Left Content */}
                      <div className="flex-1 lg:pr-8">
                        {/* Product Title */}
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 line-clamp-2 leading-tight">{product.title}</h3>
                        
                        {/* Vendor */}
                        <div className="mb-4">
                          <p className="text-xs font-bold text-gray-500 tracking-widest mb-2 uppercase">{t('vendor')}</p>
                          <Tooltip
                            text={`Show ${getProductCountByVendor(product.vendor, PRODUCTS)} products posted by this vendor`}
                            isVisible={tooltip.type === "vendor" && tooltip.productId === product.id}
                            mouseX={mousePos.x}
                            mouseY={mousePos.y}
                          >
                            <p
                              className="text-lg font-bold text-gray-900 cursor-pointer hover:text-primary transition-colors duration-300"
                              onMouseEnter={() => setTooltip({ type: "vendor", productId: product.id })}
                              onMouseLeave={() => setTooltip({ type: null, productId: null })}
                            >
                              {product.vendor}
                            </p>
                          </Tooltip>
                        </div>
                        
                        {/* Location */}
                        <div className="mb-4">
                          <Tooltip
                            text={`Show ${getProductCountByCity(product.city, PRODUCTS)} products posted in ${product.city}`}
                            isVisible={tooltip.type === "city" && tooltip.productId === product.id}
                            mouseX={mousePos.x}
                            mouseY={mousePos.y}
                          >
                            <p
                              className="text-xl font-bold text-gray-900 cursor-pointer hover:text-primary transition-colors duration-300 mb-1"
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
                              className="text-sm text-gray-600 cursor-pointer hover:text-primary transition-colors duration-300"
                              onMouseEnter={() => setTooltip({ type: "region", productId: product.id })}
                              onMouseLeave={() => setTooltip({ type: null, productId: null })}
                            >
                              {product.region}, {product.country}
                            </p>
                          </Tooltip>
                        </div>
                        
                        {/* Member Since */}
                        <div className="flex items-center gap-3">
                          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{t('memberSince')}</p>
                          <div className="px-3 py-1 bg-primary/10 rounded-full">
                            <p className="text-sm font-bold text-primary">{product.memberSince}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Right Content - Pricing and Actions */}
                      <div className="mt-6 lg:mt-0 lg:w-80">
                        {/* Pricing */}
                        <div className="mb-6">
                          <div className="flex items-baseline gap-2 mb-2">
                            <p className="text-4xl font-bold text-primary">${product.priceUSD.toFixed(2)}</p>
                            <p className="text-sm text-gray-500 font-medium">USD</p>
                          </div>
                          <div className="flex items-baseline gap-2 mb-2">
                            <p className="text-xl font-bold text-gray-800">£{product.priceGBP.toFixed(2)}</p>
                            <p className="text-sm text-gray-500 font-medium">GBP</p>
                          </div>
                          <div className="flex items-baseline gap-2">
                            <p className="text-lg font-semibold text-gray-700">{product.pricePKR.toFixed(2)}</p>
                            <p className="text-xs text-gray-500">PKR</p>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <button
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-2xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 text-sm shadow-sm hover:shadow-md"
                            aria-label="Share product"
                          >
                            <Share2 className="w-4 h-4" />
                            <span>{t('share')}</span>
                          </button>
                          <button
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-primary to-primary/90 text-white rounded-2xl font-bold hover:from-primary/90 hover:to-primary hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 text-sm transform hover:scale-105"
                            aria-label="Add to cart"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            <span>{t('addToCart')}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">{t('noProductsFound')}</p>
          <button onClick={handleClearFilters} className="text-primary font-medium hover:underline">
            {t('clearFiltersTryAgain')}
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
            {t('previous')}
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
            {t('next')}
          </button>
        </div>
      )}

      {/* Results Info */}
      <div className="text-center mt-6 text-sm text-muted-foreground">
        {t('showingResults')} {startIndex + 1} {t('to')} {Math.min(endIndex, filteredAndSortedProducts.length)} {t('of')}{" "}
        {filteredAndSortedProducts.length} {t('products')}
      </div>
    </section>
  )
}
