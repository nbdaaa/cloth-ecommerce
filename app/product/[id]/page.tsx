import { PrismaClient } from "@prisma/client"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { formatCurrency } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { LuShoppingCart, LuHeart } from "react-icons/lu"
import AddToCartButton from "@/components/cart/add-to-cart-button"
import WishlistButtonWrapper from "@/components/wishlist/wishlist-button-wrapper"

const prisma = new PrismaClient()

interface ProductPageParams {
  params: {
    id: string
  }
}

async function getProductById(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      images: true,
      reviews: {
        include: {
          user: true
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: 5
      }
    }
  })
}

export default async function ProductPage({ params }: ProductPageParams) {
  const resolvedParams = await params
  const product = await getProductById(resolvedParams.id)
  
  if (!product) {
    notFound()
  }

  const primaryImage = product.images.find(image => image.isPrimary)?.url || product.images[0]?.url || "/images/placeholder.jpg"
  const otherImages = product.images.filter(image => !image.isPrimary).map(image => image.url)
  const hasDiscount = product.salePrice !== null && product.salePrice < product.price
  const isOutOfStock = product.inventory === 0

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex text-sm mb-6 text-gray-500">
        <Link href="/" className="hover:text-gray-700">Home</Link>
        <span className="mx-2">/</span>
        <Link href={`/category/${product.category.id}`} className="hover:text-gray-700">{product.category.name}</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Product Images Section */}
        <div className="space-y-4">
          <div className="aspect-square relative rounded-lg overflow-hidden border">
            <Image 
              src={primaryImage} 
              alt={product.name} 
              fill 
              className="object-cover"
              priority
            />
            
            {/* Sale badge */}
            {hasDiscount && (
              <Badge className="absolute top-3 right-3 bg-red-500">
                Sale
              </Badge>
            )}
          </div>
          
          {/* Thumbnail images */}
          {otherImages.length > 0 && (
            <div className="grid grid-cols-5 gap-2">
              <div className="aspect-square relative rounded-md overflow-hidden border">
                <Image 
                  src={primaryImage} 
                  alt={product.name} 
                  fill 
                  className="object-cover"
                />
              </div>
              
              {otherImages.map((image, index) => (
                <div key={index} className="aspect-square relative rounded-md overflow-hidden border">
                  <Image 
                    src={image} 
                    alt={`${product.name} ${index + 1}`} 
                    fill 
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Info Section */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          <div className="flex items-center gap-2 mb-4">
            {hasDiscount ? (
              <>
                <span className="text-2xl font-semibold">{formatCurrency(product.salePrice!)}</span>
                <span className="text-gray-500 text-lg line-through">{formatCurrency(product.price)}</span>
                <span className="text-red-500 font-medium">
                  {Math.round((1 - product.salePrice! / product.price) * 100)}% OFF
                </span>
              </>
            ) : (
              <span className="text-2xl font-semibold">{formatCurrency(product.price)}</span>
            )}
          </div>
          
          <Badge 
            variant={isOutOfStock ? "destructive" : "outline"} 
            className="w-fit mb-4 py-1 text-sm font-normal"
          >
            {isOutOfStock ? 'Out of stock' : `${product.inventory} in stock`}
          </Badge>
          
          <div className="prose prose-sm mb-6">
            <p>{product.description}</p>
          </div>
          
          <Separator className="my-6" />
          
          <div className="flex flex-col gap-4">
            <AddToCartButton 
              product={{
                id: product.id,
                name: product.name,
                price: hasDiscount ? product.salePrice! : product.price,
                image: primaryImage,
              }}
              inventory={product.inventory}
            />
            
            <WishlistButtonWrapper 
              product={{
                id: product.id,
                name: product.name,
                price: hasDiscount ? product.salePrice! : product.price,
                image: primaryImage,
                inStock: !isOutOfStock
              }}
            />
          </div>
          
          <Separator className="my-6" />
          
          <div className="space-y-2">
            <div className="flex">
              <span className="w-32 font-medium">Category:</span>
              <Link href={`/category/${product.category.id}`} className="text-blue-600 hover:underline">
                {product.category.name}
              </Link>
            </div>
            
            <div className="flex">
              <span className="w-32 font-medium">SKU:</span>
              <span>{product.id}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product details and reviews section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Product Details</h2>
        <div className="prose max-w-none">
          <p>{product.description}</p>
          
          {/* Add more detailed information here */}
          <ul className="mt-4">
            <li>High-quality material</li>
            <li>Comfortable fit</li>
            <li>Durable construction</li>
            <li>Easy to care for</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 