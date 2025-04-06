"use client"

import { useState } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Button } from "@/components/ui/button"

// Sample data - would be replaced with real data from your database
const generateData = () => {
  // This is mock data, replace with actual data from your database
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const weeks = Array.from({ length: 12 }, (_, i) => `Week ${i + 1}`)
  const days = Array.from({ length: 30 }, (_, i) => `${i + 1}`)
  
  const generateDataForRange = (labels: string[]) => {
    return labels.map((label) => ({
      name: label,
      revenue: Math.floor(Math.random() * 10000) + 5000,
    }))
  }
  
  return {
    yearly: [
      { name: "2020", revenue: 45000 },
      { name: "2021", revenue: 52000 },
      { name: "2022", revenue: 61000 },
      { name: "2023", revenue: 78000 },
      { name: "2024", revenue: 87000 },
    ],
    monthly: generateDataForRange(months),
    weekly: generateDataForRange(weeks),
    daily: generateDataForRange(days),
  }
}

const data = generateData()

type TimeRange = "daily" | "weekly" | "monthly" | "yearly"

export default function RevenueChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>("monthly")
  
  const chartData = data[timeRange]
  
  const timeRangeOptions = [
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Yearly", value: "yearly" },
  ]
  
  const formatYAxis = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}k`
    }
    return `$${value}`
  }
  
  const formatTooltipValue = (value: number) => {
    return `$${value.toLocaleString()}`
  }
  
  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        {timeRangeOptions.map((option) => (
          <Button
            key={option.value}
            size="sm"
            variant={timeRange === option.value ? "default" : "outline"}
            onClick={() => setTimeRange(option.value as TimeRange)}
          >
            {option.label}
          </Button>
        ))}
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis 
              dataKey="name" 
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />
            <YAxis 
              tickFormatter={formatYAxis} 
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />
            <Tooltip 
              formatter={formatTooltipValue}
              contentStyle={{ 
                backgroundColor: "white", 
                border: "1px solid #e5e7eb",
                borderRadius: "0.375rem",
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
              }}
              labelStyle={{ fontWeight: "bold", marginBottom: "0.25rem" }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              fill="url(#colorRevenue)"
              strokeWidth={2}
            />
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
} 