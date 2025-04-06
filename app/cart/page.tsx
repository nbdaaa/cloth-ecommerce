"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/store/cart-store"
import { formatCurrency } from "@/lib/utils"
import { LuTrash, LuPlus, LuMinus, LuArrowLeft } from "react-icons/lu"

export default function CartPage() {
  const { items, totalItems, totalPrice, removeItem, updateQuantity, clearCart } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8 max-w-md">
          You haven't added any items to your cart yet. Start shopping to add items.
        </p>
        <Button asChild size="lg">
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Your Shopping Cart</h1>
      <p className="text-sm text-gray-500 mb-8">
        You have {totalItems} item{totalItems === 1 ? '' : 's'} in your cart
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart items */}
        <div className="lg:w-3/4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="hidden md:grid grid-cols-12 gap-4 py-2 font-medium text-sm">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-center">Total</div>
            </div>
            
            <Separator className="my-2" />
            
            {items.map((item) => (
              <div key={item.id}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-4 items-center">
                  {/* Product information */}
                  <div className="col-span-6 flex space-x-4">
                    <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                      <Image 
                        src={item.image} 
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">
                        <Link 
                          href={`/product/${item.productId}`}
                          className="hover:underline"
                        >
                          {item.name}
                        </Link>
                      </h3>
                      <button
                        type="button"
                        className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1 mt-1"
                        onClick={() => removeItem(item.productId)}
                      >
                        <LuTrash className="h-3 w-3" /> Remove
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="md:col-span-2 flex justify-between md:justify-center items-center">
                    <span className="md:hidden font-medium">Price:</span>
                    <span>{formatCurrency(item.price)}</span>
                  </div>

                  {/* Quantity */}
                  <div className="md:col-span-2 flex justify-between md:justify-center items-center">
                    <span className="md:hidden font-medium">Quantity:</span>
                    <div className="flex items-center border rounded-md">
                      <button
                        type="button"
                        className="p-1 hover:bg-gray-100"
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <LuMinus className="h-3 w-3" />
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        type="button"
                        className="p-1 hover:bg-gray-100"
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      >
                        <LuPlus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="md:col-span-2 flex justify-between md:justify-center items-center font-medium">
                    <span className="md:hidden font-medium">Total:</span>
                    <span>{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                </div>
                <Separator className="my-2" />
              </div>
            ))}

            <div className="flex justify-between items-center py-4">
              <Button 
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                asChild
              >
                <Link href="/">
                  <LuArrowLeft className="h-4 w-4" /> Continue Shopping
                </Link>
              </Button>
              <Button 
                variant="destructive"
                size="sm"
                className="flex items-center gap-2"
                onClick={clearCart}
              >
                <LuTrash className="h-4 w-4" /> Clear Cart
              </Button>
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow p-4 sticky top-4">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal ({totalItems} items)</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
            </div>
            <Button 
              className="w-full mt-6"
              size="lg"
              asChild
            >
              <Link href="/checkout">
                Proceed to Checkout
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 