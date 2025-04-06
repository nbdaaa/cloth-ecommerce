"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const banners = [
  {
    id: 1,
    title: "Summer Collection",
    description: "Discover the latest trends for the season",
    imageUrl: "/images/banner1.jpg",
    link: "/category/summer",
    buttonText: "Shop Now",
  },
  {
    id: 2,
    title: "New Arrivals",
    description: "Be the first to try our fresh styles",
    imageUrl: "/images/banner2.jpg",
    link: "/new-arrivals",
    buttonText: "Explore",
  },
  {
    id: 3,
    title: "Special Offers",
    description: "Limited time discounts on selected items",
    imageUrl: "/images/banner3.jpg",
    link: "/sale",
    buttonText: "View Deals",
  },
]

export default function BannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    )
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Auto-rotate the carousel
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative rounded-lg overflow-hidden">
      {/* Carousel container */}
      <div className="relative h-[300px] md:h-[500px] w-full">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Background image */}
            <div className="absolute inset-0">
              <Image
                src={banner.imageUrl}
                alt={banner.title}
                fill
                priority={index === 0}
                className="object-cover"
              />
              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-black/30" />
            </div>
            
            {/* Content */}
            <div className="relative h-full flex flex-col justify-center text-white p-6 md:p-12">
              <div className="max-w-lg">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">{banner.title}</h2>
                <p className="text-lg md:text-xl mb-6">{banner.description}</p>
                <Link href={banner.link}>
                  <Button size="lg" className="bg-white text-black hover:bg-gray-200">
                    {banner.buttonText}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/20 text-white hover:bg-black/40 rounded-full"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous slide</span>
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/20 text-white hover:bg-black/40 rounded-full"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next slide</span>
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
} 