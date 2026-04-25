"use client"

// 가격 페이지 - 연간/월간 전환 Switch가 있어 클라이언트 컴포넌트로 선언
// 참조: Switch 상태 관리, 가격 플랜 카드 레이아웃, FAQ 섹션 구성 예시

import { useState } from "react"
import { Check, Crown, Shield, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

// 가격 플랜 타입 정의
interface PricingPlan {
  name: string                          // 플랜 이름
  icon: React.ReactNode                 // 플랜 아이콘
  monthlyPrice: number | null           // 월간 가격 (null이면 문의)
  yearlyPrice: number | null            // 연간 가격 (null이면 문의)
  badge: string | null                  // 추천 배지 텍스트
  description: string                   // 플랜 설명
  features: string[]                    // 포함 기능 목록
  ctaText: string                       // CTA 버튼 텍스트
  highlighted: boolean                  // 강조 카드 여부
}

// 가격 플랜 데이터
const plans: PricingPlan[] = [
  {
    name: "Free",
    icon: <Zap className="size-5" />,
    monthlyPrice: 0,
    yearlyPrice: 0,
    badge: null,
    description: "개인 프로젝트와 소규모 팀을 위한 무료 플랜",
    features: [
      "최대 3개 프로젝트",
      "기본 분석 대시보드",
      "1GB 저장공간",
      "이메일 지원",
      "커뮤니티 접근",
    ],
    ctaText: "무료로 시작하기",
    highlighted: false,
  },
  {
    name: "Pro",
    icon: <Shield className="size-5" />,
    monthlyPrice: 29000,
    yearlyPrice: 290000,
    badge: "추천",
    description: "성장하는 팀과 비즈니스를 위한 프로 플랜",
    features: [
      "무제한 프로젝트",
      "고급 분석 및 보고서",
      "10GB 저장공간",
      "우선 이메일 지원",
      "API 접근",
      "팀 협업 도구",
      "커스텀 도메인",
    ],
    ctaText: "Pro 시작하기",
    highlighted: true,
  },
  {
    name: "Enterprise",
    icon: <Crown className="size-5" />,
    monthlyPrice: null,
    yearlyPrice: null,
    badge: null,
    description: "대규모 조직을 위한 맞춤형 엔터프라이즈 플랜",
    features: [
      "무제한 프로젝트 및 사용자",
      "전담 계정 매니저",
      "무제한 저장공간",
      "24/7 전화 + 이메일 지원",
      "SSO(싱글 사인온)",
      "고급 보안 및 감사 로그",
      "SLA 보장",
      "온프레미스 배포 옵션",
    ],
    ctaText: "영업팀 문의",
    highlighted: false,
  },
]

// FAQ 데이터
const faqs = [
  {
    question: "무료 플랜에서 Pro로 언제든지 업그레이드할 수 있나요?",
    answer:
      "네, 언제든지 업그레이드할 수 있습니다. 업그레이드 시 남은 기간에 대한 비용 차액이 자동으로 계산됩니다.",
  },
  {
    question: "연간 결제 시 어떤 혜택이 있나요?",
    answer:
      "연간 결제를 선택하면 월간 결제 대비 약 17% 할인된 가격으로 이용할 수 있습니다.",
  },
  {
    question: "환불 정책은 어떻게 되나요?",
    answer:
      "결제 후 14일 이내에는 전액 환불이 가능합니다. 이후에는 남은 기간에 대한 부분 환불을 검토해 드립니다.",
  },
  {
    question: "엔터프라이즈 플랜의 가격은 어떻게 책정되나요?",
    answer:
      "팀 규모, 사용량, 필요한 기능에 따라 맞춤형 가격이 책정됩니다. 영업팀에 문의하시면 상세 견적을 받으실 수 있습니다.",
  },
]

export default function PricingPage() {
  // 연간/월간 결제 전환 상태
  const [isYearly, setIsYearly] = useState(false)

  // 가격을 한국 원화 형식으로 포맷
  const formatPrice = (price: number | null): string => {
    if (price === null) return "문의"
    if (price === 0) return "무료"
    return `₩${price.toLocaleString("ko-KR")}`
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      {/* 페이지 헤더 섹션 */}
      <div className="mb-12 text-center">
        <Badge variant="secondary" className="mb-4">가격 플랜</Badge>
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
          합리적인 가격으로 시작하세요
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          비즈니스 규모에 맞는 플랜을 선택하세요. 언제든지 업그레이드하거나 다운그레이드할 수 있습니다.
        </p>

        {/* 연간/월간 전환 Switch */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <Label htmlFor="billing-toggle" className="text-sm font-medium">
            월간 결제
          </Label>
          <Switch
            id="billing-toggle"
            checked={isYearly}
            onCheckedChange={setIsYearly}
          />
          <Label htmlFor="billing-toggle" className="text-sm font-medium">
            연간 결제
            <Badge variant="secondary" className="ml-2 text-xs">17% 할인</Badge>
          </Label>
        </div>
      </div>

      {/* 가격 플랜 카드 그리드 */}
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={plan.highlighted ? "border-primary shadow-lg" : ""}
          >
            <CardHeader className="pb-4">
              {/* 플랜 아이콘 및 이름 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`rounded-md p-1.5 ${plan.highlighted ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                    {plan.icon}
                  </div>
                  <span className="text-lg font-semibold">{plan.name}</span>
                </div>
                {plan.badge && (
                  <Badge>{plan.badge}</Badge>
                )}
              </div>

              {/* 가격 표시 */}
              <div className="mt-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">
                    {formatPrice(isYearly ? plan.yearlyPrice : plan.monthlyPrice)}
                  </span>
                  {(plan.monthlyPrice !== null && plan.monthlyPrice > 0) && (
                    <span className="text-sm text-muted-foreground">
                      /{isYearly ? "년" : "월"}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
              </div>
            </CardHeader>

            <Separator />

            {/* 기능 목록 */}
            <CardContent className="pt-4">
              <ul className="space-y-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="size-4 shrink-0 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Button
                className="w-full"
                variant={plan.highlighted ? "default" : "outline"}
              >
                {plan.ctaText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* FAQ 섹션 */}
      <div className="mt-20">
        <h2 className="mb-8 text-center text-2xl font-bold">자주 묻는 질문</h2>
        <div className="mx-auto max-w-2xl space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <h3 className="mb-2 font-semibold">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
