"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "1월", revenue: 18600000, orders: 840 },
  { month: "2월", revenue: 23400000, orders: 1050 },
  { month: "3월", revenue: 31200000, orders: 1290 },
  { month: "4월", revenue: 28700000, orders: 1180 },
  { month: "5월", revenue: 39500000, orders: 1620 },
  { month: "6월", revenue: 48200000, orders: 1940 },
]

const chartConfig: ChartConfig = {
  revenue: {
    label: "매출",
    color: "var(--color-chart-1)",
  },
  orders: {
    label: "주문",
    color: "var(--color-chart-2)",
  },
}

export function OverviewChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>매출 현황</CardTitle>
        <CardDescription>최근 6개월 매출 및 주문 현황</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              className="text-xs text-muted-foreground"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              className="text-xs text-muted-foreground"
              tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="revenue"
              fill="var(--color-chart-1)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
