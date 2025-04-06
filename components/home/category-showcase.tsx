"use client"

import Link from "next/link"
import Image from "next/image"
import { Category } from "@prisma/client"
import { Card, CardContent } from "@/components/ui/card"

interface CategoryShowcaseProps {
  categories: Category[]
}

export default function CategoryShowcase({ categories }: CategoryShowcaseProps) {
  if (!categories || categories.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No categories available</p>
      </div>
    )
  }

  // Get image paths for categories
  const getCategoryImage = (categoryName: string) => {
    const images: Record<string, string> = {
      "T-shirts": "/images/c-tshirts.jpg",
      "Jeans": "/images/c-jeans.jpg",
      "Shoes": "/images/c-shoes.jpg",
    }
    
    return images[categoryName] || "/images/placeholder.jpg"
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {categories.map((category) => (
        <CategoryCard 
          key={category.id} 
          category={category} 
          imageUrl={getCategoryImage(category.name)}
        />
      ))}
    </div>
  )
}

interface CategoryCardProps {
  category: Category
  imageUrl: string
}

function CategoryCard({ category, imageUrl }: CategoryCardProps) {
  const categoryUrl = `/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <Link href={categoryUrl}>
      <Card className="overflow-hidden h-full relative group">
        <div className="relative aspect-[16/9]">
          <Image 
            src={imageUrl} 
            alt={category.name} 
            fill 
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
        </div>
        <CardContent className="absolute inset-0 flex items-center justify-center text-center">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
            {category.description && (
              <p className="text-white/80 max-w-xs mx-auto">{category.description}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
} 