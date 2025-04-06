"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Package,
  Settings,
  ChevronLeft,
  ChevronRight,
  BarChart,
  Tag,
  FileText,
  Home,
} from "lucide-react"

interface SidebarItem {
  title: string
  href: string
  icon: React.ReactNode
}

export default function AdminSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  
  const sidebarItems: SidebarItem[] = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Products",
      href: "/admin/products",
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      title: "Categories",
      href: "/admin/categories",
      icon: <Tag className="h-5 w-5" />,
    },
    {
      title: "Orders",
      href: "/admin/orders",
      icon: <Package className="h-5 w-5" />,
    },
    {
      title: "Customers",
      href: "/admin/customers",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Analytics",
      href: "/admin/analytics",
      icon: <BarChart className="h-5 w-5" />,
    },
    {
      title: "Reports",
      href: "/admin/reports",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <aside
      className={cn(
        "bg-white border-r h-screen transition-all duration-300 ease-in-out sticky top-0 left-0 z-30 flex flex-col",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="p-6 border-b flex items-center justify-between">
        {!collapsed && (
          <Link href="/admin" className="font-bold text-xl">
            Admin Panel
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-md hover:bg-gray-100"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {sidebarItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-gray-100 text-black"
                    : "text-gray-500 hover:text-black hover:bg-gray-50",
                  collapsed ? "justify-center" : "justify-start"
                )}
              >
                {item.icon}
                {!collapsed && <span className="ml-3">{item.title}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Return to site */}
      <div className="px-3 py-4 border-t">
        <Link
          href="/"
          className={cn(
            "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors text-blue-600 hover:text-blue-800 hover:bg-blue-50",
            collapsed ? "justify-center" : "justify-start"
          )}
        >
          <Home className="h-5 w-5" />
          {!collapsed && <span className="ml-3">Return to Site</span>}
        </Link>
      </div>

      {/* User info */}
      <div className="p-4 border-t flex items-center">
        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
          <Users className="h-4 w-4 text-gray-500" />
        </div>
        {!collapsed && (
          <div className="ml-3">
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-gray-500">admin@example.com</p>
          </div>
        )}
      </div>
    </aside>
  )
} 