"use client"

import { ReactNode } from "react"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string
  icon: ReactNode
  trend?: {
    value: string
    isPositive: boolean
    label: string
  }
}

export default function StatsCard({ title, value, icon, trend }: StatsCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">{value}</h3>
          
          {trend && (
            <div className="flex items-center text-sm">
              <div
                className={cn(
                  "flex items-center mr-2",
                  trend.isPositive ? "text-green-600" : "text-red-600"
                )}
              >
                {trend.isPositive ? (
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                )}
                <span>{trend.value}</span>
              </div>
              <span className="text-gray-500">{trend.label}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 