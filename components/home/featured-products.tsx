"use client"

import Link from "next/link"
import Image from "next/image"
import { Product, Image as ProductImage, Category } from "@prisma/client"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"

type ProductWithImageAndCategory = Product & {
  images: ProductImage[]
  category: Category
}

interface FeaturedProductsProps {
  products: ProductWithImageAndCategory[]
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No products available</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

function ProductCard({ product }: { product: ProductWithImageAndCategory }) {
  const imageUrl = product.images.length > 0 
    ? product.images[0].url 
    : "/images/placeholder.jpg"

  const hasDiscount = product.salePrice !== null && product.salePrice < product.price

  const productUrl = `/product/${product.id}`

  return (
    <Card className="overflow-hidden h-full flex flex-col group">
      <Link href={productUrl} className="relative overflow-hidden flex-shrink-0">
        <div className="aspect-square relative">
          <Image 
            src={imageUrl} 
            alt={product.name} 
            fill 
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {product.inventory === 0 && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Badge className="bg-gray-800 text-white px-3 py-1">Out of Stock</Badge>
            </div>
          )}
          
          {/* Category */}
          <Badge className="absolute top-3 left-3 bg-white text-black">
            {product.category.name}
          </Badge>
          
          {/* Sale badge */}
          {hasDiscount && (
            <Badge className="absolute top-3 right-3 bg-red-500">
              Sale
            </Badge>
          )}
        </div>
      </Link>
      
      <CardContent className="pt-4 flex-grow">
        <Link href={productUrl} className="hover:underline">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h3>
        </Link>
        <p className="text-gray-500 text-sm line-clamp-2 mb-2">{product.description}</p>
      </CardContent>
      
      <CardFooter className="flex items-center justify-between pt-0">
        <div className="flex items-center gap-2">
          {hasDiscount ? (
            <>
              <span className="font-semibold">{formatCurrency(product.salePrice!)}</span>
              <span className="text-gray-500 text-sm line-through">{formatCurrency(product.price)}</span>
            </>
          ) : (
            <span className="font-semibold">{formatCurrency(product.price)}</span>
          )}
        </div>
        
        <Badge variant={product.inventory > 0 ? "outline" : "secondary"} className="font-normal">
          {product.inventory > 0 ? `${product.inventory} in stock` : 'Out of stock'}
        </Badge>
      </CardFooter>
    </Card>
  )
} 