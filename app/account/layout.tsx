import { ReactNode } from "react"
import { redirect } from "next/navigation"
import Link from "next/link"
import { auth } from "@/auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AccountLayoutProps {
  children: ReactNode
}

export default async function AccountLayout({ children }: AccountLayoutProps) {
  const session = await auth()
  
  if (!session || !session.user) {
    redirect("/login?callbackUrl=/account")
  }

  const user = session.user
  const initials = user.name 
    ? user.name.split(" ").map(n => n[0]).join("").toUpperCase()
    : user.email?.charAt(0).toUpperCase() || "U"

  const navItems = [
    { label: "Profile", href: "/account" },
    { label: "Orders", href: "/account/orders" },
    { label: "Addresses", href: "/account/addresses" },
    { label: "Wishlist", href: "/account/wishlist" },
  ]
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 space-y-6">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={user.image || ""} alt={user.name || "User"} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">{user.name || "User"}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
          
          <div className="hidden md:block">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-2 px-3 rounded-md hover:bg-gray-100 text-gray-700 hover:text-black"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          
          <Tabs className="w-full md:hidden" defaultValue="/account">
            <TabsList className="w-full justify-start overflow-x-auto">
              {navItems.map((item) => (
                <TabsTrigger 
                  key={item.href}
                  value={item.href}
                  asChild
                  className="flex-1"
                >
                  <Link href={item.href}>{item.label}</Link>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  )
} 