"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LuShoppingCart, LuPlus, LuMinus } from "react-icons/lu"
import { useCartStore } from "@/store/cart-store"
import { toast } from "sonner"

interface Product {
  id: string
  name: string
  price: number
  image: string
}

interface AddToCartButtonProps {
  product: Product
  inventory: number
}

export default function AddToCartButton({ product, inventory }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore((state) => state.addItem)
  const isOutOfStock = inventory === 0

  const increaseQuantity = () => {
    if (quantity < inventory) {
      setQuantity(quantity + 1)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image
    })

    toast.success(`${product.name} added to cart`, {
      description: `${quantity} item${quantity > 1 ? 's' : ''} added to your cart`
    })
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Quantity selector */}
      <div className="flex items-center space-x-2">
        <span className="font-medium">Quantity:</span>
        <div className="flex items-center border rounded-md">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-none"
            onClick={decreaseQuantity}
            disabled={quantity <= 1 || isOutOfStock}
          >
            <LuMinus className="h-3 w-3" />
          </Button>
          <span className="flex items-center justify-center w-8 h-8 text-center">
            {quantity}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-none"
            onClick={increaseQuantity}
            disabled={quantity >= inventory || isOutOfStock}
          >
            <LuPlus className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Add to cart button */}
      <Button 
        size="lg" 
        className="flex items-center gap-2"
        disabled={isOutOfStock}
        onClick={handleAddToCart}
      >
        <LuShoppingCart /> Add to Cart
      </Button>
    </div>
  )
} 