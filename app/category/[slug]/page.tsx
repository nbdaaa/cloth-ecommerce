import { notFound } from "next/navigation"
import { PrismaClient } from "@prisma/client"
import FeaturedProducts from "@/components/home/featured-products"
import Link from "next/link"
import { Home } from "lucide-react"
import { Button } from "@/components/ui/button"

// Define page props according to Next.js App Router expectations
type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

const prisma = new PrismaClient()

async function getCategoryBySlug(slug: string) {
  console.log(`Looking for category with slug: ${slug}`);
  
  // First approach: Try to find using exact ID match
  const exactIdMatch = await prisma.category.findUnique({
    where: { id: slug }
  });
  
  if (exactIdMatch) {
    console.log(`Found category by exact ID match: ${exactIdMatch.name}`);
    return exactIdMatch;
  }
  
  // Second approach: Try "slug-category" format
  const categoryIdMatch = await prisma.category.findUnique({
    where: { id: `${slug}-category` }
  });
  
  if (categoryIdMatch) {
    console.log(`Found category by "{slug}-category" format: ${categoryIdMatch.name}`);
    return categoryIdMatch;
  }
  
  // Third approach: Try by category name
  // Convert slug to category name format (e.g., "t-shirts" -> "T-shirts")
  const categoryName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  
  console.log(`Converted slug to name: "${categoryName}"`);
  
  const nameMatch = await prisma.category.findFirst({
    where: {
      name: {
        equals: categoryName,
        mode: "insensitive",
      },
    },
  });
  
  if (nameMatch) {
    console.log(`Found category by name match: ${nameMatch.name}`);
    return nameMatch;
  }
  
  // Fourth approach: Try a full text search
  const containsMatch = await prisma.category.findFirst({
    where: {
      OR: [
        { name: { contains: slug, mode: "insensitive" } },
        { id: { contains: slug } }
      ]
    }
  });
  
  if (containsMatch) {
    console.log(`Found category by contains match: ${containsMatch.name}`);
    return containsMatch;
  }
  
  // Last resort: Get all categories and find closest match
  console.log("No direct matches found. Getting all categories for inspection.");
  const allCategories = await prisma.category.findMany();
  console.log("All categories:", allCategories);
  
  return null;
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

export default async function CategoryPage({ params }: Props) {
  const slug = params.slug;
  
  console.log(`Processing category page for slug: ${slug}`);
  
  // Direct hardcoded category IDs as a fallback
  let category;
  
  if (slug === 't-shirts') {
    console.log("Using hardcoded ID for t-shirts");
    category = await prisma.category.findUnique({
      where: { id: 'tshirts-category' }
    });
  } else if (slug === 'jeans') {
    console.log("Using hardcoded ID for jeans");
    category = await prisma.category.findUnique({
      where: { id: 'jeans-category' }
    });
  } else if (slug === 'shoes') {
    console.log("Using hardcoded ID for shoes");
    category = await prisma.category.findUnique({
      where: { id: 'shoes-category' }
    });
  } else {
    category = await getCategoryBySlug(slug);
  }

  if (!category) {
    console.log(`Category not found for slug: ${slug}`);
    notFound();
  }

  console.log(`Found category: ${category.name} (${category.id})`);
  const products = await getProductsByCategory(category.id);
  console.log(`Found ${products.length} products for this category`);

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