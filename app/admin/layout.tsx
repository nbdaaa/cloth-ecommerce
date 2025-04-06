import { redirect } from "next/navigation"
import { auth } from "@/auth"

import AdminSidebar from "@/components/admin/sidebar"

export const metadata = {
  title: "Admin Dashboard | NBDAStore",
  description: "Admin dashboard for NBDAStore e-commerce platform",
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get the session
  const session = await auth()

  // Check if user is authenticated and has admin role
  if (!session || session.user.role !== "ADMIN") {
    redirect("/unauthorized")
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  )
} 