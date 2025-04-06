import { PrismaClient } from "@prisma/client"
import BannerCarousel from "@/components/home/banner-carousel"
import FeaturedProducts from "@/components/home/featured-products"
import CategoryShowcase from "@/components/home/category-showcase"

const prisma = new PrismaClient()

export default async function HomePage() {
  // Fetch featured products
  const featuredProducts = await prisma.product.findMany({
    where: {
      isFeatured: true,
    },
    include: {
      images: {
        where: {
          isPrimary: true,
        },
      },
      category: true,
    },
    take: 8,
  })

  // Fetch all categories
  const categories = await prisma.category.findMany({
    where: {
      parentId: null,
    },
    take: 3,
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <BannerCarousel />
      
      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
        <FeaturedProducts products={featuredProducts} />
      </section>
      
      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
        <CategoryShowcase categories={categories} />
      </section>
    </div>
  )
} 