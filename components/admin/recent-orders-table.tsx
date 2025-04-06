"use client"

import { useState } from "react"
import Link from "next/link"
import { PrismaClient } from "@prisma/client"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, ExternalLink } from "lucide-react"

const prisma = new PrismaClient()

// Generate mock order data (this would be replaced with real data from your database)
const MOCK_ORDERS = [
  {
    id: "ord_01",
    customer: { id: "cus_01", name: "John Doe", email: "john@example.com" },
    total: 129.99,
    status: "DELIVERED",
    createdAt: new Date(2023, 3, 15),
  },
  {
    id: "ord_02",
    customer: { id: "cus_02", name: "Jane Smith", email: "jane@example.com" },
    total: 79.95,
    status: "PROCESSING",
    createdAt: new Date(2023, 3, 16),
  },
  {
    id: "ord_03",
    customer: { id: "cus_03", name: "Bob Johnson", email: "bob@example.com" },
    total: 249.50,
    status: "SHIPPED",
    createdAt: new Date(2023, 3, 17),
  },
  {
    id: "ord_04",
    customer: { id: "cus_04", name: "Sara Wilson", email: "sara@example.com" },
    total: 49.99,
    status: "PENDING",
    createdAt: new Date(2023, 3, 18),
  },
  {
    id: "ord_05",
    customer: { id: "cus_05", name: "Mike Brown", email: "mike@example.com" },
    total: 159.95,
    status: "PROCESSING",
    createdAt: new Date(2023, 3, 19),
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800"
    case "PROCESSING":
      return "bg-blue-100 text-blue-800"
    case "SHIPPED":
      return "bg-purple-100 text-purple-800"
    case "DELIVERED":
      return "bg-green-100 text-green-800"
    case "CANCELLED":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function RecentOrdersTable() {
  const [orders, setOrders] = useState(MOCK_ORDERS)
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }
  
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-[60px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">
                  <Link href={`/admin/orders/${order.id}`} className="hover:underline">
                    {order.id}
                  </Link>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{order.customer.name}</span>
                    <span className="text-xs text-gray-500">{order.customer.email}</span>
                  </div>
                </TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(order.status)} variant="outline">
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Link 
                          href={`/admin/orders/${order.id}`}
                          className="flex items-center"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Update Status</DropdownMenuItem>
                      <DropdownMenuItem>Email Customer</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex items-center justify-end">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/orders">View All Orders</Link>
        </Button>
      </div>
    </div>
  )
} 