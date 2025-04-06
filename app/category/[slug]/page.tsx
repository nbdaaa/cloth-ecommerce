import { notFound } from "next/navigation"
import { PrismaClient } from "@prisma/client"
import FeaturedProducts from "@/components/home/featured-products"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

const prisma = new PrismaClient()

async function getCategoryBySlug(slug: string) {
  // Convert slug to category name format (e.g., "t-shirts" -> "T-shirts")
  const categoryName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return prisma.category.findFirst({
    where: {
      name: {
        equals: categoryName,
        mode: "insensitive",
      },
    },
  })
}

async function getProductsByCategory(categoryId: string) {
  return prisma.product.findMany({
    where: {
      categoryId,
      isArchived: false,
    },
    include: {
      images: {
        where: {
          isPrimary: true,
        },
      },
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await getCategoryBySlug(params.slug)

  if (!category) {
    notFound()
  }

  const products = await getProductsByCategory(category.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
        {category.description && (
          <p className="text-gray-600">{category.description}</p>
        )}
      </div>

      <div className="mb-8">
        <FeaturedProducts products={products} />
      </div>
    </div>
  )
} 