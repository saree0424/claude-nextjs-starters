import {
  Zap,
  Shield,
  Palette,
  LayoutDashboard,
  FormInput,
  BarChart3,
} from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const features = [
  {
    icon: Zap,
    title: "빠른 개발 속도",
    description:
      "Next.js 16 App Router와 shadcn/ui로 구성된 완성된 프로젝트 구조로 즉시 개발을 시작하세요.",
  },
  {
    icon: Palette,
    title: "다크 모드 지원",
    description:
      "next-themes 기반의 라이트/다크 모드. CSS 변수로 완벽하게 통합된 테마 시스템을 제공합니다.",
  },
  {
    icon: Shield,
    title: "타입 안전성",
    description:
      "TypeScript + Zod 스키마 검증으로 컴파일 타임과 런타임 모두에서 안전한 코드를 작성하세요.",
  },
  {
    icon: FormInput,
    title: "폼 관리",
    description:
      "React Hook Form과 Zod를 결합한 고성능 폼 시스템. 복잡한 검증 로직도 간결하게 처리됩니다.",
  },
  {
    icon: LayoutDashboard,
    title: "대시보드 레이아웃",
    description:
      "shadcn Sidebar 컴포넌트 기반의 완성된 대시보드 레이아웃. 접고 펼치기, 모바일 대응까지 제공합니다.",
  },
  {
    icon: BarChart3,
    title: "데이터 시각화",
    description:
      "Recharts 기반의 shadcn chart 컴포넌트로 아름다운 그래프와 통계를 손쉽게 구현하세요.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            모든 것이 준비되어 있습니다
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            반복적인 초기 설정 없이 핵심 비즈니스 로직에 집중할 수 있도록
            필요한 모든 기반을 제공합니다.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="group transition-shadow hover:shadow-md">
                <CardHeader className="pb-3">
                  <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="font-semibold">{feature.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
