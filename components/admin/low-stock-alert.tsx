"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

interface LowStockAlertProps {
  threshold: number
}

// Generate mock product data (would be replaced with real data from your database)
const MOCK_LOW_STOCK_PRODUCTS = [
  {
    id: "prod_01",
    name: "Men's Casual T-shirt",
    inventory: 5,
    imageUrl: "/images/placeholder.jpg",
  },
  {
    id: "prod_02",
    name: "Women's Slim Jeans",
    inventory: 3,
    imageUrl: "/images/placeholder.jpg",
  },
  {
    id: "prod_03",
    name: "Running Shoes",
    inventory: 7,
    imageUrl: "/images/placeholder.jpg",
  },
  {
    id: "prod_04",
    name: "Leather Handbag",
    inventory: 2,
    imageUrl: "/images/placeholder.jpg",
  },
]

export default function LowStockAlert({ threshold }: LowStockAlertProps) {
  const [products, setProducts] = useState(MOCK_LOW_STOCK_PRODUCTS)

  // Filter products below threshold (in a real app this would be done in database query)
  const lowStockProducts = products.filter((product) => product.inventory <= threshold)

  if (lowStockProducts.length === 0) {
    return (
      <div className="py-3 text-center text-sm text-gray-500">
        No products with low stock
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {lowStockProducts.map((product) => (
        <div 
          key={product.id}
          className="flex items-center space-x-3 p-3 border rounded-md bg-gray-50"
        >
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
              className="text-sm font-medium hover:underline"
            >
              {product.name}
            </Link>
            <div className="flex items-center mt-1">
              <AlertTriangle 
                className={`h-3.5 w-3.5 mr-1 ${
                  product.inventory < 5 ? "text-red-600" : "text-amber-500"
                }`} 
              />
              <span className="text-xs font-medium text-gray-700">
                {product.inventory} left in stock
              </span>
            </div>
          </div>
          
          <Button variant="outline" size="sm" className="flex-shrink-0">
            Restock
          </Button>
        </div>
      ))}
      
      <div className="pt-2">
        <Button variant="outline" size="sm" asChild className="w-full">
          <Link href="/admin/inventory">Manage Inventory</Link>
        </Button>
      </div>
    </div>
  )
} 