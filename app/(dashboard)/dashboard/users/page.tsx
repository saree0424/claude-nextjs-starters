// 사용자 관리 페이지 - 요약 스탯 카드와 사용자 테이블로 구성된 서버 컴포넌트
// 참조: 사용자 현황 스탯 카드 + UsersTable 검색 필터 테이블 조합 패턴 예시

import { UserCheck, UserMinus, UserPlus, Users } from "lucide-react"
import { UsersTable } from "@/components/dashboard/users-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DashboardHeader } from "@/components/layout/dashboard-header"

// 사용자 요약 스탯 데이터
const userStats = [
  {
    label: "전체 사용자",
    value: "1,284",
    icon: <Users className="size-5 text-muted-foreground" />,
    change: "+12% 이번 달",
  },
  {
    label: "활성 사용자",
    value: "1,028",
    icon: <UserCheck className="size-5 text-muted-foreground" />,
    change: "전체의 80.1%",
  },
  {
    label: "신규 가입",
    value: "64",
    icon: <UserPlus className="size-5 text-muted-foreground" />,
    change: "이번 달 기준",
  },
  {
    label: "비활성",
    value: "256",
    icon: <UserMinus className="size-5 text-muted-foreground" />,
    change: "전체의 19.9%",
  },
]

export default function UsersPage() {
  return (
    <>
      {/* 브레드크럼: 대시보드 > 사용자 */}
      <DashboardHeader breadcrumbs={[{ title: "사용자" }]} />

      <div className="flex flex-1 flex-col gap-6 p-6">
        {/* 페이지 제목 + 사용자 초대 버튼 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">사용자 관리</h1>
            <p className="text-muted-foreground">
              서비스를 이용 중인 사용자를 검색하고 역할을 관리합니다.
            </p>
          </div>
          <Button>
            <UserPlus className="mr-2 size-4" />
            사용자 초대
          </Button>
        </div>

        {/* 사용자 요약 스탯 카드 4개 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {userStats.map((stat) => (
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

        {/* 사용자 검색/관리 테이블 */}
        <UsersTable />
      </div>
    </>
  )
}
