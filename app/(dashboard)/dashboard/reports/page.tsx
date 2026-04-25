// 보고서 페이지 - 요약 스탯 카드와 보고서 테이블로 구성된 서버 컴포넌트
// 참조: 요약 스탯 인라인 카드 패턴 + ReportsTable 컴포넌트 조합 예시

import { Download, FileText, Share2 } from "lucide-react"
import { ReportsTable } from "@/components/dashboard/reports-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DashboardHeader } from "@/components/layout/dashboard-header"

// 보고서 요약 스탯 데이터
const reportStats = [
  {
    label: "이번 달 생성",
    value: "24",
    icon: <FileText className="size-5 text-muted-foreground" />,
    change: "+8 지난달 대비",
  },
  {
    label: "총 다운로드",
    value: "142",
    icon: <Download className="size-5 text-muted-foreground" />,
    change: "+23% 지난달 대비",
  },
  {
    label: "공유됨",
    value: "38",
    icon: <Share2 className="size-5 text-muted-foreground" />,
    change: "5개 팀과 공유",
  },
]

export default function ReportsPage() {
  return (
    <>
      {/* 브레드크럼: 대시보드 > 보고서 */}
      <DashboardHeader breadcrumbs={[{ title: "보고서" }]} />

      <div className="flex flex-1 flex-col gap-6 p-6">
        {/* 페이지 제목 + 보고서 생성 버튼 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">보고서</h1>
            <p className="text-muted-foreground">
              데이터를 기반으로 다양한 형식의 보고서를 생성하고 관리합니다.
            </p>
          </div>
          <Button>
            <FileText className="mr-2 size-4" />
            새 보고서 생성
          </Button>
        </div>

        {/* 요약 스탯 카드 3개 */}
        <div className="grid gap-4 md:grid-cols-3">
          {reportStats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.change}</p>
                  </div>
                  <div className="rounded-full bg-muted p-2">{stat.icon}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 보고서 목록 테이블 */}
        <ReportsTable />
      </div>
    </>
  )
}
