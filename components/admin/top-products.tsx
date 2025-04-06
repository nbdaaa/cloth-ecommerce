"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUp, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Generate mock top product data (would be replaced with real data from your database)
const MOCK_TOP_PRODUCTS = [
  {
    id: "prod_01",
    name: "Men's Casual T-shirt",
    category: "T-shirts",
    imageUrl: "/images/placeholder.jpg",
    salesCount: 87,
    revenue: 1739.99,
    stockStatus: "In Stock",
  },
  {
    id: "prod_02",
    name: "Women's Slim Jeans",
    category: "Jeans",
    imageUrl: "/images/placeholder.jpg",
    salesCount: 72,
    revenue: 3599.50,
    stockStatus: "Low Stock",
  },
  {
    id: "prod_03",
    name: "Running Shoes",
    category: "Shoes",
    imageUrl: "/images/placeholder.jpg",
    salesCount: 58,
    revenue: 5800.00,
    stockStatus: "In Stock",
  },
  {
    id: "prod_04",
    name: "Leather Handbag",
    category: "Accessories",
    imageUrl: "/images/placeholder.jpg",
    salesCount: 45,
    revenue: 8050.25,
    stockStatus: "In Stock",
  },
  {
    id: "prod_05",
    name: "Casual Winter Jacket",
    category: "Outerwear",
    imageUrl: "/images/placeholder.jpg",
    salesCount: 37,
    revenue: 3700.00,
    stockStatus: "Out of Stock",
  },
]

const getStockStatusColor = (status: string) => {
  switch (status) {
    case "In Stock":
      return "bg-green-100 text-green-800"
    case "Low Stock":
      return "bg-yellow-100 text-yellow-800"
    case "Out of Stock":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function TopProducts() {
  const [products] = useState(MOCK_TOP_PRODUCTS)
  const [sortBy, setSortBy] = useState<"salesCount" | "revenue">("salesCount")
  
  // Sort products by chosen metric
  const sortedProducts = [...products].sort((a, b) => b[sortBy] - a[sortBy])
  
  return (
    <div className="space-y-5">
      <div className="flex space-x-2">
        <Button
          variant={sortBy === "salesCount" ? "default" : "outline"}
          size="sm"
          onClick={() => setSortBy("salesCount")}
          className="text-xs h-7"
        >
          By Units Sold
        </Button>
        <Button
          variant={sortBy === "revenue" ? "default" : "outline"}
          size="sm"
          onClick={() => setSortBy("revenue")}
          className="text-xs h-7"
        >
          By Revenue
        </Button>
      </div>
      
      <div className="space-y-3">
        {sortedProducts.slice(0, 5).map((product, index) => (
          <div 
            key={product.id}
            className="flex items-center space-x-3 p-3 border rounded-md hover:bg-gray-50 transition-colors"
          >
            <div className="flex-shrink-0 text-sm font-bold text-gray-500 w-6 text-center">
              #{index + 1}
            </div>
            
            <div className="flex-shrink-0 w-10 h-10 relative overflow-hidden rounded-md">
              <Image 
                src={product.imageUrl} 
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <Link 
                href={`/admin/products/${product.id}`}
                className="text-sm font-medium block truncate hover:underline"
              >
                {product.name}
              </Link>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-gray-500">
                  {product.category}
                </span>
                <Badge 
                  variant="outline" 
                  className={getStockStatusColor(product.stockStatus)}
                >
                  {product.stockStatus}
                </Badge>
              </div>
            </div>
            
            <div className="flex-shrink-0 text-right">
              <div className="text-sm font-semibold">
                {sortBy === "salesCount" 
                  ? `${product.salesCount} sold` 
                  : `$${product.revenue.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
                }
              </div>
              <div className="flex items-center justify-end text-xs text-green-600 font-medium mt-1">
                <ArrowUp className="h-3 w-3 mr-0.5" />
                <span>12%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div>
        <Button variant="outline" size="sm" asChild className="w-full">
          <Link href="/admin/products" className="flex items-center justify-center">
            <span>View All Products</span>
            <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </Link>
        </Button>
      </div>
    </div>
  )
} 