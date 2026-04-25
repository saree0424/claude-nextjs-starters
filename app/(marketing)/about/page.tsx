// 소개 페이지 - 회사 미션, 팀 소개, 핵심 가치를 담은 서버 컴포넌트
// 참조: Avatar 컴포넌트 활용, 카드 그리드 레이아웃, 팀원 소개 섹션 구성 예시

import { Heart, Lightbulb, Target, Users } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// 팀원 타입 정의
interface TeamMember {
  name: string      // 이름
  role: string      // 직책
  bio: string       // 간단한 소개
  initials: string  // Avatar 이니셜
}

// 핵심 가치 타입 정의
interface CoreValue {
  icon: React.ReactNode   // 아이콘
  title: string           // 가치 제목
  description: string     // 가치 설명
}

// 팀원 데이터
const teamMembers: TeamMember[] = [
  {
    name: "김민준",
    role: "CEO & 공동창업자",
    bio: "10년간의 스타트업 경험을 바탕으로 혁신적인 솔루션을 만들어갑니다.",
    initials: "김민",
  },
  {
    name: "이서연",
    role: "CTO & 공동창업자",
    bio: "풀스택 개발 전문가로 확장 가능한 아키텍처 설계를 담당합니다.",
    initials: "이서",
  },
  {
    name: "박도윤",
    role: "디자인 리드",
    bio: "사용자 경험을 최우선으로 생각하는 프로덕트 디자이너입니다.",
    initials: "박도",
  },
  {
    name: "최지아",
    role: "마케팅 리드",
    bio: "데이터 기반 마케팅으로 브랜드 성장을 이끌어갑니다.",
    initials: "최지",
  },
]

// 핵심 가치 데이터
const coreValues: CoreValue[] = [
  {
    icon: <Target className="size-6 text-blue-500" />,
    title: "고객 중심",
    description: "모든 결정의 기준은 고객입니다. 고객의 문제를 해결하는 것이 우리의 최우선 과제입니다.",
  },
  {
    icon: <Lightbulb className="size-6 text-yellow-500" />,
    title: "지속적 혁신",
    description: "현재에 안주하지 않고 끊임없이 새로운 방법을 탐구하며 더 나은 미래를 만들어갑니다.",
  },
  {
    icon: <Heart className="size-6 text-red-500" />,
    title: "진정성",
    description: "투명하고 솔직한 소통을 통해 고객과 팀원 모두와 진정한 신뢰 관계를 구축합니다.",
  },
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      {/* 히어로 섹션 - 회사 미션 소개 */}
      <div className="mb-16 text-center">
        <Badge variant="secondary" className="mb-4">우리의 이야기</Badge>
        <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
          더 나은 개발 경험을 위해
        </h1>
        <div className="mx-auto max-w-3xl space-y-4 text-muted-foreground">
          <p className="text-lg leading-relaxed">
            StarterKit은 개발자들이 아이디어를 더 빠르게 현실로 만들 수 있도록 돕기 위해 탄생했습니다.
            반복적인 설정과 보일러플레이트 코드에 시간을 낭비하지 않고, 진짜 중요한 것에 집중할 수 있도록
            최적화된 개발 환경을 제공합니다.
          </p>
          <p className="text-lg leading-relaxed">
            2022년에 설립된 이후, 우리는 전 세계 수천 명의 개발자와 팀이 프로젝트를 더 빠르고
            효율적으로 시작할 수 있도록 지원해왔습니다. 최신 기술 스택과 모범 사례를 기반으로 한
            스타터 템플릿은 여러분의 다음 프로젝트를 위한 완벽한 출발점입니다.
          </p>
        </div>
      </div>

      {/* 미션/비전 카드 섹션 */}
      <div className="mb-16 grid gap-6 md:grid-cols-2">
        <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900">
                <Target className="size-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold">우리의 미션</h2>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              모든 개발자가 아이디어에서 프로덕션까지 가장 빠른 경로로 도달할 수 있도록
              최고의 개발 도구와 템플릿을 제공합니다.
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50/50 dark:border-purple-800 dark:bg-purple-950/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-100 p-2 dark:bg-purple-900">
                <Lightbulb className="size-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-xl font-semibold">우리의 비전</h2>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              개발자 경험을 혁신하여, 누구나 빠르고 안전하게 세계 수준의 웹 애플리케이션을
              만들 수 있는 세상을 만들어갑니다.
            </p>
          </CardContent>
        </Card>
      </div>

      <Separator className="mb-16" />

      {/* 팀 소개 섹션 */}
      <div className="mb-16">
        <div className="mb-8 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <Users className="size-5 text-muted-foreground" />
            <h2 className="text-2xl font-bold">우리 팀을 소개합니다</h2>
          </div>
          <p className="text-muted-foreground">열정과 전문성을 가진 팀원들이 최고의 제품을 만들어갑니다.</p>
        </div>

        {/* 팀원 카드 그리드 */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <Card key={member.name} className="text-center">
              <CardContent className="pt-6">
                {/* 팀원 Avatar */}
                <Avatar className="mx-auto mb-4 size-16">
                  <AvatarFallback className="text-lg font-semibold">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="mb-2 text-sm text-primary">{member.role}</p>
                <p className="text-xs text-muted-foreground">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator className="mb-16" />

      {/* 핵심 가치 섹션 */}
      <div>
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold">우리가 추구하는 가치</h2>
          <p className="mt-2 text-muted-foreground">이 가치들이 우리의 모든 결정과 행동의 기준입니다.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {coreValues.map((value) => (
            <Card key={value.title}>
              <CardContent className="pt-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-lg bg-muted p-2">{value.icon}</div>
                  <h3 className="font-semibold">{value.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
