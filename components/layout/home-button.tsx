"use client"

import Link from "next/link"
import { Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomeButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link href="/">
        <Button 
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg bg-primary hover:bg-primary/90"
        >
          <Home className="h-5 w-5 text-white" />
          <span className="sr-only">Home</span>
        </Button>
      </Link>
    </div>
  )
} 