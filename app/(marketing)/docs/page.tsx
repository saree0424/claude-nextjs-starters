// 문서 페이지 - 사이드 내비게이션 + 콘텐츠 2열 레이아웃의 서버 컴포넌트
// 참조: 2열 문서 레이아웃, 코드 블록 스타일, 단계별 가이드 카드 구성 예시

import { BookOpen, ChevronRight, Code2, FileText, Layers, Settings, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// 문서 내비게이션 섹션 타입 정의
interface DocSection {
  title: string         // 섹션 제목
  icon: React.ReactNode // 섹션 아이콘
  items: string[]       // 하위 문서 항목 목록
}

// 빠른 시작 단계 타입 정의
interface QuickStartStep {
  step: number        // 단계 번호
  title: string       // 단계 제목
  description: string // 단계 설명
  code?: string       // 코드 예시 (선택)
}

// Quick Links 타입 정의
interface QuickLink {
  icon: React.ReactNode // 링크 아이콘
  title: string         // 링크 제목
  description: string   // 링크 설명
  badge?: string        // 선택적 배지 (예: "New")
}

// 문서 사이드바 내비게이션 데이터
const docSections: DocSection[] = [
  {
    title: "시작하기",
    icon: <Zap className="size-4" />,
    items: ["소개", "설치", "빠른 시작", "프로젝트 구조"],
  },
  {
    title: "가이드",
    icon: <BookOpen className="size-4" />,
    items: ["라우팅", "스타일링", "상태 관리", "인증", "데이터 패칭"],
  },
  {
    title: "컴포넌트",
    icon: <Layers className="size-4" />,
    items: ["UI 컴포넌트", "레이아웃", "폼", "차트", "테이블"],
  },
  {
    title: "API 레퍼런스",
    icon: <Code2 className="size-4" />,
    items: ["설정 옵션", "훅", "유틸리티 함수"],
  },
  {
    title: "배포",
    icon: <Settings className="size-4" />,
    items: ["Vercel", "AWS", "Docker", "환경 변수"],
  },
]

// 빠른 시작 단계 데이터
const quickStartSteps: QuickStartStep[] = [
  {
    step: 1,
    title: "저장소 복제",
    description: "GitHub에서 스타터킷을 복제하거나 템플릿으로 새 저장소를 생성합니다.",
    code: "git clone https://github.com/your-org/starter-kit.git my-project",
  },
  {
    step: 2,
    title: "의존성 설치",
    description: "프로젝트 디렉토리로 이동하여 패키지 의존성을 설치합니다.",
    code: "cd my-project && npm install",
  },
  {
    step: 3,
    title: "환경 변수 설정",
    description: ".env.example 파일을 복사하여 필요한 환경 변수를 설정합니다.",
    code: "cp .env.example .env.local",
  },
  {
    step: 4,
    title: "개발 서버 시작",
    description: "개발 서버를 시작하고 브라우저에서 확인합니다.",
    code: "npm run dev",
  },
]

// 자주 찾는 Quick Links 데이터
const quickLinks: QuickLink[] = [
  {
    icon: <Zap className="size-5 text-yellow-500" />,
    title: "빠른 시작",
    description: "5분 안에 프로젝트를 시작하는 방법",
  },
  {
    icon: <Layers className="size-5 text-blue-500" />,
    title: "컴포넌트 목록",
    description: "25+ 사전 구성된 UI 컴포넌트",
    badge: "25+",
  },
  {
    icon: <Code2 className="size-5 text-green-500" />,
    title: "API 레퍼런스",
    description: "훅, 유틸리티 함수 전체 문서",
  },
  {
    icon: <FileText className="size-5 text-purple-500" />,
    title: "예제 프로젝트",
    description: "실제 사용 사례와 예제 코드",
    badge: "New",
  },
]

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      {/* 페이지 헤더 */}
      <div className="mb-10">
        <Badge variant="secondary" className="mb-4">문서</Badge>
        <h1 className="mb-4 text-4xl font-bold tracking-tight">개발 문서</h1>
        <p className="text-lg text-muted-foreground">
          StarterKit을 시작하고 활용하는 데 필요한 모든 정보를 담았습니다.
        </p>
      </div>

      {/* Quick Links 카드 그리드 */}
      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickLinks.map((link) => (
          <Card key={link.title} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="pt-5">
              <div className="mb-2 flex items-center justify-between">
                <div className="rounded-lg bg-muted p-1.5">{link.icon}</div>
                {link.badge && <Badge variant="secondary" className="text-xs">{link.badge}</Badge>}
              </div>
              <h3 className="font-semibold">{link.title}</h3>
              <p className="text-xs text-muted-foreground">{link.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="mb-10" />

      {/* 2열 레이아웃: 사이드 내비게이션 + 콘텐츠 */}
      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        {/* 좌측 사이드 내비게이션 */}
        <aside>
          <Card className="sticky top-6">
            <CardHeader className="pb-3">
              <h2 className="text-sm font-semibold">목차</h2>
            </CardHeader>
            <CardContent className="px-2 pb-4">
              <nav className="space-y-1">
                {docSections.map((section) => (
                  <div key={section.title}>
                    {/* 섹션 제목 */}
                    <div className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground">
                      {section.icon}
                      {section.title}
                    </div>
                    {/* 섹션 하위 항목 */}
                    <ul className="ml-4 space-y-0.5">
                      {section.items.map((item) => (
                        <li key={item}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-full justify-start px-3 text-xs font-normal"
                          >
                            <ChevronRight className="mr-1 size-3 text-muted-foreground" />
                            {item}
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </CardContent>
          </Card>
        </aside>

        {/* 우측 메인 콘텐츠 */}
        <main>
          {/* 소개 섹션 */}
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">시작하기</h2>
            <p className="text-muted-foreground">
              StarterKit은 Next.js, TypeScript, Tailwind CSS, shadcn/ui를 기반으로 한
              프로덕션 레디 스타터 템플릿입니다. 빠른 개발 시작을 위해 필요한 모든 설정이
              사전 구성되어 있습니다.
            </p>
          </div>

          {/* 요구사항 카드 */}
          <Card className="mb-8">
            <CardHeader>
              <h3 className="font-semibold">시스템 요구사항</h3>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Node.js 18.17 이상</li>
                <li>• npm 9.x 또는 pnpm 8.x 이상</li>
                <li>• Git 2.x 이상</li>
              </ul>
            </CardContent>
          </Card>

          {/* 빠른 시작 단계별 가이드 */}
          <div className="mb-8">
            <h3 className="mb-4 text-xl font-semibold">빠른 시작 (4단계)</h3>
            <div className="space-y-4">
              {quickStartSteps.map((step) => (
                <div key={step.step} className="flex gap-4">
                  {/* 단계 번호 원형 */}
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h4 className="mb-1 font-semibold">{step.title}</h4>
                    <p className="mb-2 text-sm text-muted-foreground">{step.description}</p>
                    {/* 코드 블록 */}
                    {step.code && (
                      <div className="rounded-lg bg-muted p-3 font-mono text-xs">
                        <span className="text-muted-foreground">$ </span>
                        {step.code}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 프로젝트 구조 안내 */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold">프로젝트 구조</h3>
            </CardHeader>
            <CardContent>
              {/* 파일 트리 코드 블록 */}
              <div className="rounded-lg bg-muted p-4 font-mono text-xs leading-relaxed">
                <div className="text-blue-500">my-project/</div>
                <div className="ml-4">
                  <div className="text-blue-400">├── app/</div>
                  <div className="ml-4 text-muted-foreground">├── (marketing)/  <span className="text-green-600"># 마케팅 페이지 그룹</span></div>
                  <div className="ml-4 text-muted-foreground">└── (dashboard)/  <span className="text-green-600"># 대시보드 페이지 그룹</span></div>
                  <div className="text-blue-400">├── components/</div>
                  <div className="ml-4 text-muted-foreground">├── ui/           <span className="text-green-600"># shadcn/ui 컴포넌트</span></div>
                  <div className="ml-4 text-muted-foreground">├── layout/       <span className="text-green-600"># 레이아웃 컴포넌트</span></div>
                  <div className="ml-4 text-muted-foreground">└── dashboard/    <span className="text-green-600"># 대시보드 컴포넌트</span></div>
                  <div className="text-blue-400">├── lib/</div>
                  <div className="ml-4 text-muted-foreground">└── constants.ts  <span className="text-green-600"># 사이트 설정 및 내비게이션</span></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
