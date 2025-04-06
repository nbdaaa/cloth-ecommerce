"use client"

import WishlistButton from "./wishlist-button"

interface Product {
  id: string
  name: string
  price: number
  image: string
  inStock: boolean
}

interface WishlistButtonWrapperProps {
  product: Product
}

export default function WishlistButtonWrapper({ product }: WishlistButtonWrapperProps) {
  return <WishlistButton product={product} />
} 