import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CategoryNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        We couldn't find the category you're looking for. It may have been removed or renamed.
      </p>
      <p className="text-gray-500 mb-8">
        Try checking one of our main categories below:
      </p>
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <Button asChild variant="outline">
          <Link href="/category/tshirts-category">T-shirts</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/category/jeans-category">Jeans</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/category/shoes-category">Shoes</Link>
        </Button>
      </div>
      <Button asChild>
        <Link href="/">Return to Homepage</Link>
      </Button>
    </div>
  )
} 