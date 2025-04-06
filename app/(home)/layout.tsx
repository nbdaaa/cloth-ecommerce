import { ReactNode } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

export default function HomeLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
} 