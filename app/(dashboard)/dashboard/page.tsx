import { DashboardHeader } from "@/components/layout/dashboard-header"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { OverviewChart } from "@/components/dashboard/overview-chart"
import { RecentActivity } from "@/components/dashboard/recent-activity"

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">대시보드</h1>
          <p className="text-muted-foreground">서비스 현황을 한눈에 확인하세요.</p>
        </div>
        <StatsCards />
        <div className="grid gap-6 lg:grid-cols-2">
          <OverviewChart />
          <RecentActivity />
        </div>
      </div>
    </>
  )
}
