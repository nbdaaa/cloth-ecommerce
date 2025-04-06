"use client"

import { useState } from "react"
import Link from "next/link"
import { Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  const [email, setEmail] = useState("")

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement newsletter subscription logic
    alert(`Subscribed with: ${email}`)
    setEmail("")
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and social */}
          <div className="col-span-1">
            <h3 className="text-2xl font-bold mb-4">NBDAStore</h3>
            <p className="text-gray-600 mb-4">
              Your one-stop shop for fashionable and high-quality clothing
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-black">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-600 hover:text-black">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-600 hover:text-black">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-600 hover:text-black">
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div className="col-span-1">
            <h3 className="font-bold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/tshirts-category" className="text-gray-600 hover:text-black">
                  T-shirts
                </Link>
              </li>
              <li>
                <Link href="/category/jeans-category" className="text-gray-600 hover:text-black">
                  Jeans
                </Link>
              </li>
              <li>
                <Link href="/category/shoes-category" className="text-gray-600 hover:text-black">
                  Shoes
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="text-gray-600 hover:text-black">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/sale" className="text-gray-600 hover:text-black">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer service */}
          <div className="col-span-1">
            <h3 className="font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-black">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-black">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-600 hover:text-black">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-black">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-black">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h3 className="font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-600 mb-4">
              Subscribe to our newsletter to receive updates and exclusive offers
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-r-none"
                />
                <Button type="submit" className="rounded-l-none">
                  <Mail className="h-4 w-4 mr-2" />
                  Subscribe
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t mt-12 pt-8 text-center text-gray-600">
          <p>&copy; {currentYear} NBDAStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 