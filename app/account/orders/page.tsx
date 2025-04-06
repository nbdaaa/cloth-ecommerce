import { auth } from "@/auth"
import { PrismaClient } from "@prisma/client"
import Link from "next/link"
import Image from "next/image"
import { formatCurrency } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const prisma = new PrismaClient()

export default async function OrdersPage() {
  const session = await auth()
  
  if (!session || !session.user) {
    return null // Handle by layout protection
  }
  
  const userId = session.user.id
  
  const orders = await prisma.order.findMany({
    where: {
      userId: userId,
    },
    include: {
      orderItems: {
        include: {
          product: {
            include: {
              images: {
                where: {
                  isPrimary: true,
                },
              },
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Badge variant="outline">Pending</Badge>
      case "PROCESSING":
        return <Badge variant="secondary">Processing</Badge>
      case "SHIPPED":
        return <Badge variant="secondary">Shipped</Badge>
      case "DELIVERED":
        return <Badge className="bg-green-500">Delivered</Badge>
      case "CANCELLED":
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Orders</h1>
      </div>
      
      {orders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center text-center p-10">
            <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
            <p className="text-gray-500 mb-4">
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
            <Button asChild>
              <Link href="/">Shop Now</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="bg-gray-50 px-6 py-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg">Order #{order.id.substring(0, 8)}</CardTitle>
                    <p className="text-sm text-gray-500">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                    {getOrderStatusBadge(order.status)}
                    <span className="text-lg font-semibold ml-0 sm:ml-4">
                      {formatCurrency(order.total)}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {order.orderItems.map((item) => {
                    const product = item.product
                    const imageUrl = product.images[0]?.url || "/images/placeholder.jpg"
                    
                    return (
                      <div key={item.id} className="flex gap-4">
                        <div className="relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden border">
                          <Image
                            src={imageUrl}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <Link
                            href={`/product/${product.id}`}
                            className="font-medium hover:underline"
                          >
                            {product.name}
                          </Link>
                          <div className="flex justify-between mt-1">
                            <span className="text-sm text-gray-500">
                              Qty: {item.quantity}
                            </span>
                            <span className="font-medium">
                              {formatCurrency(item.price)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/account/orders/${order.id}`}>
                      View Order Details
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  )
} 