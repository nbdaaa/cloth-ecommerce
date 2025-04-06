"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LuHeart } from "react-icons/lu"
import { useWishlistStore } from "@/store/wishlist-store"
import { toast } from "sonner"

interface Product {
  id: string
  name: string
  price: number
  image: string
  inStock: boolean
}

interface WishlistButtonProps {
  product: Product
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export default function WishlistButton({ 
  product, 
  variant = "outline",
  size = "lg",
  className = ""
}: WishlistButtonProps) {
  const { addItem, removeItem, isInWishlist } = useWishlistStore()
  const [isInList, setIsInList] = useState(isInWishlist(product.id))
  
  const toggleWishlist = () => {
    if (isInList) {
      removeItem(product.id)
      toast.success(`${product.name} removed from wishlist`)
    } else {
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        inStock: product.inStock
      })
      toast.success(`${product.name} added to wishlist`)
    }
    
    setIsInList(!isInList)
  }
  
  return (
    <Button
      variant={isInList ? "secondary" : variant}
      size={size}
      className={`${className} flex items-center gap-2`}
      onClick={toggleWishlist}
    >
      <LuHeart className={isInList ? "fill-current" : ""} />
      {size !== "icon" && (isInList ? "Remove from Wishlist" : "Add to Wishlist")}
    </Button>
  )
} 