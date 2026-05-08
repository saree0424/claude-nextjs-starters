<!--
  ============================================================
  /new-page 커스텀 커맨드
  ============================================================

  【사용법】
    /new-page

  【설명】
    이 Starter Kit의 라우트 그룹 구조에 맞게 새 페이지를 스캐폴딩합니다.
    사용자의 입력을 받아 page.tsx (+ 필요시 layout.tsx)를 자동 생성합니다.

  【라우트 그룹】
    이 프로젝트는 두 가지 라우트 그룹을 사용합니다:

    1. (marketing) — 퍼블릭 페이지 (로그인 불필요)
       경로 예시: app/(marketing)/about/page.tsx → URL: /about
       레이아웃:  마케팅 공통 헤더/푸터 포함
       패턴:      shadcn Card, Badge, Separator 중심의 콘텐츠 레이아웃

    2. (dashboard) — 인증된 사용자 전용 페이지
       경로 예시: app/(dashboard)/dashboard/analytics/page.tsx → URL: /dashboard/analytics
       레이아웃:  SidebarProvider + AppSidebar + SidebarInset 구조
       패턴:      DashboardHeader + 내부 콘텐츠 영역

  【생성 파일】
    - app/(선택한 그룹)/(페이지명)/page.tsx  — 항상 생성
    - app/(선택한 그룹)/(페이지명)/layout.tsx — 사용자가 원할 때만 생성

  【생성 규칙】
    1. 컴포넌트명은 PascalCase (예: AboutPage, AnalyticsPage)
    2. 파일 상단에 한국어 주석으로 페이지 목적 기재
    3. shadcn/ui 컴포넌트 우선 사용 (@/components/ui/*)
    4. Tailwind CSS로 스타일링 (인라인 style 속성 사용 금지)
    5. TypeScript 사용 (모든 props/data에 타입 정의)
    6. 서버 컴포넌트 기본 (클라이언트 상태 필요 시 "use client" 명시)
    7. import 경로는 절대경로 사용 (@/components/..., @/lib/...)

  【(marketing) 페이지 기본 구조】
    - 최대 너비: max-w-6xl mx-auto px-4 py-16 md:px-6
    - 히어로: Badge + h1 + 설명 텍스트 조합
    - 콘텐츠: Card 그리드 레이아웃 (md:grid-cols-2 또는 md:grid-cols-3)
    - lucide-react 아이콘 적극 활용

  【(dashboard) 페이지 기본 구조】
    - DashboardHeader 컴포넌트 최상단 배치
    - 내부 여백: flex flex-1 flex-col gap-6 p-6
    - 페이지 제목(h1) + 부제목(p.text-muted-foreground) 패턴
    - StatsCards, 차트, 테이블 등 대시보드 컴포넌트 활용 가능

  【예시 대화】
    사용자: /new-page
    Claude:  어떤 페이지를 만들까요?
             1. 페이지 이름 (라우트 경로): pricing
             2. 라우트 그룹: marketing / dashboard
             3. 페이지 제목 (한국어): 요금제
             4. 간단한 설명: 플랜별 가격 비교 및 구독 페이지
             5. layout.tsx 필요 여부: 아니오

  ============================================================
-->

새 페이지를 스캐폴딩합니다. 아래 질문에 답해주세요.

다음 정보를 알려주세요:

1. **페이지 이름** (라우트 경로로 사용됩니다. 예: `pricing`, `team`, `reports`)
2. **라우트 그룹** — `marketing` (퍼블릭) 또는 `dashboard` (인증 필요) 중 선택
3. **페이지 제목** (한국어, h1에 표시됩니다. 예: "요금제", "팀 소개")
4. **페이지 설명** (한 줄 부제목. 예: "플랜을 비교하고 구독하세요.")
5. **layout.tsx 필요 여부** — 이 페이지만의 별도 레이아웃이 필요한가요? (예/아니오)

---

입력을 받은 뒤 아래 규칙에 따라 파일을 생성하세요:

## 생성 규칙

### (marketing) 그룹 선택 시

`app/(marketing)/{페이지명}/page.tsx` 를 아래 구조로 생성:

```
// {페이지 제목} 페이지 — {페이지 설명}

import { ... } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function {PascalCase}Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      {/* 히어로 섹션 */}
      <div className="mb-16 text-center">
        <Badge variant="secondary" className="mb-4">...</Badge>
        <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
          {페이지 제목}
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          {페이지 설명}
        </p>
      </div>

      {/* 콘텐츠 영역 — 페이지 목적에 맞게 구성 */}
      ...
    </div>
  )
}
```

### (dashboard) 그룹 선택 시

`app/(dashboard)/dashboard/{페이지명}/page.tsx` 를 아래 구조로 생성:

```
// {페이지 제목} 페이지 — {페이지 설명}

import { DashboardHeader } from "@/components/layout/dashboard-header"

export default function {PascalCase}Page() {
  return (
    <>
      <DashboardHeader />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{페이지 제목}</h1>
          <p className="text-muted-foreground">{페이지 설명}</p>
        </div>

        {/* 콘텐츠 영역 — 페이지 목적에 맞게 구성 */}
        ...
      </div>
    </>
  )
}
```

### layout.tsx 요청 시

- (marketing): 별도 공통 섹션(예: 서브내비)이 있을 때 생성
- (dashboard): `SidebarProvider` + `AppSidebar` 패턴은 이미 상위에 존재하므로,
  이 페이지만의 추가 래퍼가 필요할 때만 생성

---

파일 생성 후 아래 내용을 출력하세요:

- 생성된 파일 경로
- 접근 URL
- 다음 작업 제안 (필요한 컴포넌트, 데이터 연결 등)
