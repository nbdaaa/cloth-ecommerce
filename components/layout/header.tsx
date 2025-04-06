"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { 
  Search, 
  ShoppingCart, 
  User, 
  Heart, 
  Menu,
  X
} from "lucide-react"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet"
import CartButton from "./cart-button"

export default function Header() {
  const router = useRouter()
  const { data: session } = useSession()
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const categories = [
    { name: "T-shirts", slug: "tshirts-category" },
    { name: "Jeans", slug: "jeans-category" },
    { name: "Shoes", slug: "shoes-category" },
  ]

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 mr-4 ml-4">
            <Link href="/" className="text-3xl font-bold">
              NBDAStore
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 ml-6">
            <Link
              href="/"
              className="text-gray-600 hover:text-black transition-colors font-medium"
            >
              Home
            </Link>
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="text-gray-600 hover:text-black transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block flex-grow max-w-md mx-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Search for products..."
                className="w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-0 h-full"
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </form>
          </div>

          {/* Desktop User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/wishlist">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Wishlist</span>
              </Button>
            </Link>
            
            <CartButton />
            
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link href="/account">My Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/orders">My Orders</Link>
                  </DropdownMenuItem>
                  {session.user.role === "ADMIN" && (
                    <DropdownMenuItem>
                      <Link href="/admin">Admin Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <CartButton />
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  <div className="py-4">
                    <form onSubmit={handleSearch} className="relative">
                      <Input
                        type="search"
                        placeholder="Search for products..."
                        className="w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Button 
                        type="submit" 
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-0 top-0 h-full"
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                  
                  <nav className="flex flex-col space-y-4 py-4">
                    <h3 className="font-semibold text-lg mb-2">Categories</h3>
                    <Link
                      href="/"
                      className="py-2 px-4 hover:bg-gray-100 rounded-md font-medium"
                    >
                      Home
                    </Link>
                    {categories.map((category) => (
                      <Link
                        key={category.slug}
                        href={`/category/${category.slug}`}
                        className="py-2 px-4 hover:bg-gray-100 rounded-md"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </nav>
                  
                  <div className="mt-auto border-t pt-4">
                    {session ? (
                      <>
                        <div className="flex items-center mb-4">
                          <User className="h-5 w-5 mr-2" />
                          <span>{session.user.name || session.user.email}</span>
                        </div>
                        <div className="space-y-2">
                          <Link href="/account" className="block py-2 px-4 hover:bg-gray-100 rounded-md">
                            My Account
                          </Link>
                          <Link href="/orders" className="block py-2 px-4 hover:bg-gray-100 rounded-md">
                            My Orders
                          </Link>
                          <Link href="/wishlist" className="block py-2 px-4 hover:bg-gray-100 rounded-md">
                            My Wishlist
                          </Link>
                          {session.user.role === "ADMIN" && (
                            <Link href="/admin" className="block py-2 px-4 hover:bg-gray-100 rounded-md">
                              Admin Dashboard
                            </Link>
                          )}
                          <button 
                            onClick={() => signOut()} 
                            className="w-full text-left py-2 px-4 hover:bg-gray-100 rounded-md text-red-600"
                          >
                            Sign Out
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="space-y-2">
                        <Link href="/login">
                          <Button className="w-full">Sign In</Button>
                        </Link>
                        <Link href="/register">
                          <Button variant="outline" className="w-full">Create Account</Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
} 