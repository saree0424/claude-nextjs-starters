// 분석 페이지 - 차트와 통계 카드로 구성된 서버 컴포넌트
// 참조: StatsCards 재사용 + AnalyticsChart 컴포넌트 조합 패턴 예시

import { AnalyticsChart } from "@/components/dashboard/analytics-chart"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { DashboardHeader } from "@/components/layout/dashboard-header"

export default function AnalyticsPage() {
  return (
    <>
      {/* 브레드크럼: 대시보드 > 분석 */}
      <DashboardHeader breadcrumbs={[{ title: "분석" }]} />

      <div className="flex flex-1 flex-col gap-6 p-6">
        {/* 페이지 제목 */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">분석</h1>
          <p className="text-muted-foreground">
            트래픽, 방문자 행동, 유입 소스를 분석합니다.
          </p>
        </div>

        {/* 기존 StatsCards 컴포넌트 재사용 */}
        <StatsCards />

        {/* 차트 2열 그리드: 일별 방문자 + 트래픽 소스 */}
        <div className="grid gap-6 lg:grid-cols-2">
          <AnalyticsChart
            variant="line"
            title="일별 방문자 추이"
            description="최근 7일간 방문자 수 및 페이지뷰"
          />
          <AnalyticsChart
            variant="pie"
            title="트래픽 소스"
            description="유입 채널별 방문자 비율"
          />
        </div>

        {/* 페이지뷰 추이 - 전체 너비 */}
        <AnalyticsChart
          variant="area"
          title="기기별 페이지뷰 추이"
          description="최근 6주 데스크탑/모바일 페이지뷰"
        />
      </div>
    </>
  )
}
