"use client"

import { useState } from "react"
import Link from "next/link"
import { LuShoppingCart } from "react-icons/lu"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet"
import { useCartStore } from "@/store/cart-store"
import { formatCurrency } from "@/lib/utils"
import Image from "next/image"

export default function CartButton() {
  const [open, setOpen] = useState(false)
  const { items, totalItems, totalPrice, removeItem, updateQuantity } = useCartStore()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <LuShoppingCart className="h-6 w-6" />
          {totalItems > 0 && (
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md w-full">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({totalItems})</SheetTitle>
        </SheetHeader>
        
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <LuShoppingCart className="h-16 w-16 text-gray-300" />
            <p className="text-gray-500">Your cart is empty</p>
            <Button asChild onClick={() => setOpen(false)}>
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto py-4">
              {items.map((item) => (
                <div key={item.id} className="flex py-4">
                  <div className="relative h-24 w-24 rounded-md overflow-hidden">
                    <Image 
                      src={item.image} 
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-medium line-clamp-2">
                      <Link 
                        href={`/product/${item.productId}`}
                        onClick={() => setOpen(false)}
                        className="hover:underline"
                      >
                        {item.name}
                      </Link>
                    </h3>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex text-sm">
                        <p className="text-gray-500">Qty: {item.quantity}</p>
                        <div className="ml-4">
                          <button 
                            className="text-primary hover:text-primary/80 text-xs"
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button 
                            className="text-primary hover:text-primary/80 text-xs"
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <p className="text-sm font-medium">{formatCurrency(item.price)}</p>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-gray-500">
                        {formatCurrency(item.price)} per item
                      </p>
                      <button
                        type="button"
                        className="text-xs text-red-500 hover:text-red-700"
                        onClick={() => removeItem(item.productId)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t py-4 space-y-4">
              <div className="flex items-center justify-between font-medium">
                <p>Subtotal</p>
                <p>{formatCurrency(totalPrice)}</p>
              </div>
              <p className="text-xs text-gray-500">
                Shipping and taxes calculated at checkout
              </p>
              <div className="space-y-2">
                <Button 
                  asChild
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  <Link href="/checkout">
                    Checkout
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  asChild
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  <Link href="/cart">
                    View Cart
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
} 