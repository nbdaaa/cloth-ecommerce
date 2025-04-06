import {
  DollarSign,
  Users,
  ShoppingBag,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import RevenueChart from "@/components/admin/revenue-chart"
import RecentOrdersTable from "@/components/admin/recent-orders-table"
import StatsCard from "@/components/admin/stats-card"
import LowStockAlert from "@/components/admin/low-stock-alert"
import TopProducts from "@/components/admin/top-products"
import { prisma } from "@/lib/prisma"

async function getOverviewStats() {
  const totalCustomersCount = await prisma.user.count({
    where: { role: "USER" },
  })
  
  const ordersData = await prisma.order.aggregate({
    _count: {
      id: true,
    },
    _sum: {
      total: true,
    },
  })
  
  const totalOrders = ordersData._count.id
  const totalRevenue = ordersData._sum.total || 0
  
  const totalProducts = await prisma.product.count({
    where: { isArchived: false },
  })
  
  const averageOrderValue = totalOrders > 0 
    ? totalRevenue / totalOrders 
    : 0
  
  return {
    totalRevenue,
    totalOrders,
    totalCustomers: totalCustomersCount,
    totalProducts,
    averageOrderValue,
  }
}

export default async function AdminDashboardPage() {
  const {
    totalRevenue,
    totalOrders,
    totalCustomers,
    totalProducts,
    averageOrderValue,
  } = await getOverviewStats()
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value={`$${totalRevenue.toFixed(2)}`}
          icon={<DollarSign />}
          trend={{
            value: "+12.5%",
            isPositive: true,
            label: "from last month",
          }}
        />
        <StatsCard
          title="Total Orders"
          value={totalOrders.toString()}
          icon={<ShoppingBag />}
          trend={{
            value: "+8.2%",
            isPositive: true,
            label: "from last month",
          }}
        />
        <StatsCard
          title="Total Customers"
          value={totalCustomers.toString()}
          icon={<Users />}
          trend={{
            value: "+5.7%",
            isPositive: true,
            label: "from last month",
          }}
        />
        <StatsCard
          title="Average Order"
          value={`$${averageOrderValue.toFixed(2)}`}
          icon={<CreditCard />}
          trend={{
            value: "-2.3%",
            isPositive: false,
            label: "from last month",
          }}
        />
      </div>
      
      {/* Charts and tables */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Revenue chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
          <RevenueChart />
        </div>
        
        {/* Top products */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Top Products</h2>
          <TopProducts />
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent orders */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          <RecentOrdersTable />
        </div>
        
        {/* Low stock alerts */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Low Stock Alerts</h2>
          <LowStockAlert threshold={10} />
        </div>
      </div>
    </div>
  )
} 