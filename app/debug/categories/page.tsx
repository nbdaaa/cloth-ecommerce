import { PrismaClient } from "@prisma/client"
import Link from "next/link"

const prisma = new PrismaClient()

export default async function DebugCategoriesPage() {
  const categories = await prisma.category.findMany()
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Debug: All Categories</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{category.description || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500">
                  <Link href={`/category/${category.id}`} className="hover:underline">
                    View Category (by ID)
                  </Link>
                  <br />
                  <Link 
                    href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="hover:underline"
                  >
                    View Category (by Name)
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Troubleshooting</h2>
        <p className="mb-4">
          If you're having trouble accessing a category page:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Try using the ID directly in the URL (e.g., <code>/category/tshirts-category</code>)</li>
          <li>Check if there's a mismatch between the URL slug format and the database name</li>
          <li>Verify that the category exists in the database (listed above)</li>
        </ul>
      </div>
    </div>
  )
} 