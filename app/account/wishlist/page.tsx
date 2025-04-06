"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { formatCurrency } from "@/lib/utils"
import { LuShoppingCart, LuTrash, LuHeart } from "react-icons/lu"
import { useWishlistStore } from "@/store/wishlist-store"
import { useCartStore } from "@/store/cart-store"

export default function WishlistPage() {
  const router = useRouter()
  const { items: wishlistItems, removeItem } = useWishlistStore()
  const addToCart = useCartStore((state) => state.addItem)
  const [mounted, setMounted] = useState(false)
  
  // Fix hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return null
  }
  
  const handleRemoveFromWishlist = (id: string, name: string) => {
    removeItem(id)
    toast.success(`${name} removed from wishlist`)
  }
  
  const handleAddToCart = (item: any) => {
    addToCart({
      productId: item.productId,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image
    })
    
    toast.success(`${item.name} added to cart`)
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Wishlist</h1>
      </div>
      
      {wishlistItems.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center text-center p-10">
            <LuHeart className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your wishlist is empty</h3>
            <p className="text-gray-500 mb-4">
              Save items you love to your wishlist to purchase them later or share with friends.
            </p>
            <Button asChild>
              <Link href="/">Start Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative aspect-square">
                <Image 
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
                
                {!item.inStock && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="bg-white text-black px-3 py-1 rounded-full text-sm font-medium">
                      Out of Stock
                    </span>
                  </div>
                )}
                
                <Button 
                  variant="destructive" 
                  size="icon" 
                  className="absolute top-2 right-2 rounded-full"
                  onClick={() => handleRemoveFromWishlist(item.productId, item.name)}
                >
                  <LuTrash className="h-4 w-4" />
                </Button>
              </div>
              
              <CardContent className="p-4">
                <Link href={`/product/${item.productId}`} className="hover:underline">
                  <h3 className="font-semibold">{item.name}</h3>
                </Link>
                <p className="font-medium my-2">{formatCurrency(item.price)}</p>
                
                <Button 
                  className="w-full mt-2 flex items-center justify-center gap-2"
                  disabled={!item.inStock}
                  onClick={() => handleAddToCart(item)}
                >
                  <LuShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  )
} 