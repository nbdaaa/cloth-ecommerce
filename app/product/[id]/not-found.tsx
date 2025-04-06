import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ProductNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        We couldn't find the product you're looking for. It may have been removed or is no longer available.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/category">Browse Categories</Link>
        </Button>
      </div>
    </div>
  )
} 