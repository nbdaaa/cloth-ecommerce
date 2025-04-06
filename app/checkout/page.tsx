"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useCartStore } from "@/store/cart-store"
import { formatCurrency } from "@/lib/utils"
import { toast } from "sonner"
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { LuArrowLeft, LuShieldCheck, LuCreditCard, LuCircleCheck } from "react-icons/lu"

const checkoutFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Phone number is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  postalCode: z.string().min(3, "Postal code is required"),
  country: z.string().min(2, "Country is required"),
  paymentMethod: z.enum(["card", "paypal", "bank"])
})

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>

export default function CheckoutPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const { items, totalPrice, clearCart } = useCartStore()
  const [mounted, setMounted] = useState(false)
  
  // Initialize form at the top of the component, before any conditional returns
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      name: session?.user?.name || "",
      email: session?.user?.email || "",
      phone: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "United States",
      paymentMethod: "card"
    }
  })
  
  // Fix hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Redirect if cart is empty
  useEffect(() => {
    if (mounted && items.length === 0 && !orderComplete) {
      router.push("/cart")
    }
  }, [mounted, items, router, orderComplete])
  
  const onSubmit = async (data: CheckoutFormValues) => {
    setIsProcessing(true)
    
    try {
      // In a real app, you would:
      // 1. Create a payment intent with Stripe
      // 2. Submit the order to your backend
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Clear cart and show success
      clearCart()
      setOrderComplete(true)
    } catch (error) {
      console.error("Error processing order:", error)
      toast.error("Failed to process your order. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }
  
  // Only render content when mounted to prevent hydration issues
  if (!mounted) {
    return null
  }
  
  // Calculate order summary
  const subtotal = totalPrice
  const shippingFee = subtotal > 100 ? 0 : 10
  const taxRate = 0.07
  const taxAmount = subtotal * taxRate
  const total = subtotal + shippingFee + taxAmount
  
  if (orderComplete) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-lg mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-green-100 p-4">
              <LuCircleCheck className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. Your order has been confirmed and will be processed shortly.
          </p>
          <p className="font-medium mb-6">
            We have sent a confirmation email to your registered email address.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/account/orders">View My Orders</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Button 
          variant="ghost" 
          size="sm" 
          asChild 
          className="mr-4"
        >
          <Link href="/cart">
            <LuArrowLeft className="mr-2 h-4 w-4" /> Back to Cart
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Checkout</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="(123) 456-7890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main St, Apt 4B" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="New York" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State/Province</FormLabel>
                          <FormControl>
                            <Input placeholder="NY" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal/ZIP Code</FormLabel>
                          <FormControl>
                            <Input placeholder="10001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input placeholder="United States" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                              className="flex flex-col space-y-3"
                            >
                              <div className="flex items-center space-x-2 border rounded-md p-3">
                                <RadioGroupItem value="card" id="card" />
                                <Label className="flex items-center gap-2 cursor-pointer" htmlFor="card">
                                  <LuCreditCard className="h-5 w-5" />
                                  <span>Credit / Debit Card</span>
                                </Label>
                              </div>
                              
                              <div className="flex items-center space-x-2 border rounded-md p-3">
                                <RadioGroupItem value="paypal" id="paypal" />
                                <Label className="flex items-center gap-2 cursor-pointer" htmlFor="paypal">
                                  <Image 
                                    src="/images/paypal.svg" 
                                    alt="PayPal" 
                                    width={20} 
                                    height={20} 
                                  />
                                  <span>PayPal</span>
                                </Label>
                              </div>
                              
                              <div className="flex items-center space-x-2 border rounded-md p-3">
                                <RadioGroupItem value="bank" id="bank" />
                                <Label className="flex items-center gap-2 cursor-pointer" htmlFor="bank">
                                  <Image 
                                    src="/images/bank.svg" 
                                    alt="Bank Transfer" 
                                    width={20} 
                                    height={20} 
                                  />
                                  <span>Bank Transfer</span>
                                </Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {/* Additional payment fields would go here depending on selected payment method */}
                  
                  <div className="flex items-center space-x-4 bg-blue-50 p-4 rounded-lg">
                    <LuShieldCheck className="h-6 w-6 text-blue-500" />
                    <p className="text-sm">
                      Your payment information is secure and encrypted. We never store your credit card details.
                    </p>
                  </div>
                  
                  <div className="lg:hidden pt-6">
                    <Button 
                      className="w-full" 
                      size="lg" 
                      type="submit"
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing..." : `Pay ${formatCurrency(total)}`}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden border">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium line-clamp-1">{item.name}</h4>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                        <span className="text-sm font-medium">{formatCurrency(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator />
              
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shippingFee > 0 ? formatCurrency(shippingFee) : "Free"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>{formatCurrency(taxAmount)}</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full hidden lg:flex" 
                size="lg" 
                onClick={form.handleSubmit(onSubmit)}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : `Pay ${formatCurrency(total)}`}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
} 