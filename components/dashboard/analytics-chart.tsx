"use client"

// 분석 차트 컴포넌트 - Recharts 기반의 다양한 차트를 렌더링하는 클라이언트 컴포넌트
// 참조: overview-chart.tsx 패턴을 확장하여 LineChart, AreaChart, PieChart 지원
// "use client" 선언 이유: Recharts는 DOM API가 필요한 클라이언트 전용 라이브러리

import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts"
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

// 차트 종류 타입
type ChartVariant = "line" | "area" | "pie"

// 컴포넌트 Props 타입 정의
interface AnalyticsChartProps {
  variant: ChartVariant   // 차트 종류 (line, area, pie)
  title: string           // 차트 제목
  description?: string    // 차트 부제목 (선택)
  className?: string      // 추가 CSS 클래스 (선택)
}

// ---- 차트 데이터 ----

// 일별 방문자 수 데이터 (LineChart용)
const visitorData = [
  { date: "월", visitors: 1240, pageviews: 3200 },
  { date: "화", visitors: 1580, pageviews: 4100 },
  { date: "수", visitors: 1320, pageviews: 3600 },
  { date: "목", visitors: 1890, pageviews: 5200 },
  { date: "금", visitors: 2100, pageviews: 5800 },
  { date: "토", visitors: 980, pageviews: 2400 },
  { date: "일", visitors: 860, pageviews: 2100 },
]

// 주간 페이지뷰 추이 데이터 (AreaChart용)
const pageviewData = [
  { week: "1주", desktop: 18500, mobile: 12300 },
  { week: "2주", desktop: 21200, mobile: 14800 },
  { week: "3주", desktop: 19800, mobile: 16200 },
  { week: "4주", desktop: 24500, mobile: 18900 },
  { week: "5주", desktop: 28100, mobile: 21400 },
  { week: "6주", desktop: 31200, mobile: 24600 },
]

// 트래픽 소스 데이터 (PieChart용)
const trafficSourceData = [
  { name: "직접 접속", value: 35, color: "var(--color-chart-1)" },
  { name: "검색엔진", value: 28, color: "var(--color-chart-2)" },
  { name: "소셜미디어", value: 20, color: "var(--color-chart-3)" },
  { name: "레퍼럴", value: 12, color: "var(--color-chart-4)" },
  { name: "이메일", value: 5, color: "var(--color-chart-5)" },
]

// ---- 차트 설정 ----

// LineChart 설정 (방문자/페이지뷰)
const visitorChartConfig: ChartConfig = {
  visitors: { label: "방문자", color: "var(--color-chart-1)" },
  pageviews: { label: "페이지뷰", color: "var(--color-chart-2)" },
}

// AreaChart 설정 (데스크탑/모바일)
const pageviewChartConfig: ChartConfig = {
  desktop: { label: "데스크탑", color: "var(--color-chart-1)" },
  mobile: { label: "모바일", color: "var(--color-chart-2)" },
}

// ---- 차트 서브 컴포넌트 ----

// 일별 방문자 추이 LineChart
function VisitorLineChart() {
  return (
    <ChartContainer config={visitorChartConfig} className="h-[280px] w-full">
      <LineChart data={visitorData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          className="text-xs text-muted-foreground"
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          className="text-xs text-muted-foreground"
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          type="monotone"
          dataKey="visitors"
          stroke="var(--color-chart-1)"
          strokeWidth={2}
          dot={{ fill: "var(--color-chart-1)", strokeWidth: 2, r: 3 }}
        />
        <Line
          type="monotone"
          dataKey="pageviews"
          stroke="var(--color-chart-2)"
          strokeWidth={2}
          dot={{ fill: "var(--color-chart-2)", strokeWidth: 2, r: 3 }}
        />
      </LineChart>
    </ChartContainer>
  )
}

// 주간 페이지뷰 AreaChart
function PageviewAreaChart() {
  return (
    <ChartContainer config={pageviewChartConfig} className="h-[280px] w-full">
      <AreaChart data={pageviewData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
        <defs>
          {/* 그라디언트 정의 */}
          <linearGradient id="desktopGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-chart-1)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="var(--color-chart-1)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="mobileGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-chart-2)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="var(--color-chart-2)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis
          dataKey="week"
          tickLine={false}
          axisLine={false}
          className="text-xs text-muted-foreground"
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          className="text-xs text-muted-foreground"
          tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          type="monotone"
          dataKey="desktop"
          stroke="var(--color-chart-1)"
          strokeWidth={2}
          fill="url(#desktopGradient)"
        />
        <Area
          type="monotone"
          dataKey="mobile"
          stroke="var(--color-chart-2)"
          strokeWidth={2}
          fill="url(#mobileGradient)"
        />
      </AreaChart>
    </ChartContainer>
  )
}

// 트래픽 소스 PieChart
function TrafficPieChart() {
  return (
    <ChartContainer config={{}} className="h-[280px] w-full">
      <PieChart>
        <Pie
          data={trafficSourceData}
          cx="50%"
          cy="45%"
          outerRadius={90}
          dataKey="value"
          label={({ name, value }) => `${name} ${value}%`}
          labelLine={true}
        >
          {trafficSourceData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Legend
          formatter={(value) => (
            <span className="text-xs text-muted-foreground">{value}</span>
          )}
        />
        <ChartTooltip
          formatter={(value, name) => [`${value}%`, name]}
        />
      </PieChart>
    </ChartContainer>
  )
}

// 메인 AnalyticsChart 컴포넌트
// variant prop으로 차트 종류를 선택하여 렌더링
export function AnalyticsChart({ variant, title, description, className }: AnalyticsChartProps) {
  // 차트 종류별 설명 기본값
  const defaultDescriptions: Record<ChartVariant, string> = {
    line: "최근 7일 일별 방문자 및 페이지뷰",
    area: "최근 6주 데스크탑/모바일 페이지뷰 추이",
    pie: "트래픽 유입 소스 비율",
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description ?? defaultDescriptions[variant]}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* variant에 따라 차트 컴포넌트 선택 */}
        {variant === "line" && <VisitorLineChart />}
        {variant === "area" && <PageviewAreaChart />}
        {variant === "pie" && <TrafficPieChart />}
      </CardContent>
    </Card>
  )
}
