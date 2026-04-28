import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Activity, Star, GitBranch, MessageCircle, MapPin } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

function ExampleSection({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="mb-1 text-lg font-semibold">{title}</h2>
      {description && <p className="mb-4 text-sm text-muted-foreground">{description}</p>}
      {children}
    </section>
  )
}

export default function CardsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">카드</h1>
        <p className="mt-1 text-muted-foreground">
          다양한 용도로 사용하는 카드 컴포넌트 패턴입니다.
        </p>
      </div>

      <ExampleSection title="기본 카드 변형" description="Card 컴포넌트의 기본 구성입니다.">
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">기본 카드</CardTitle>
              <CardDescription>헤더와 설명만 있는 단순 카드</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">카드 본문 영역입니다.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">헤더 + 푸터</CardTitle>
              <CardDescription>푸터에 액션 버튼 배치</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">본문 내용이 들어갑니다.</p>
            </CardContent>
            <CardFooter>
              <Button size="sm" className="w-full">자세히 보기</Button>
            </CardFooter>
          </Card>

          <Card className="border-primary/50 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-base text-primary">강조 카드</CardTitle>
              <CardDescription>테두리/배경색으로 강조</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">중요한 정보를 강조할 때 사용합니다.</p>
            </CardContent>
          </Card>
        </div>
      </ExampleSection>

      <ExampleSection title="통계 카드" description="숫자 지표와 변화율을 표시합니다.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "총 사용자", value: "24,521", change: "+12%", up: true, icon: Users },
            { title: "월 매출", value: "₩8,450,000", change: "+8.2%", up: true, icon: DollarSign },
            { title: "주문 수", value: "1,893", change: "-2.4%", up: false, icon: ShoppingCart },
            { title: "전환율", value: "3.24%", change: "+0.5%", up: true, icon: Activity },
          ].map((stat) => (
            <Card key={stat.title}>
              <CardContent className="pt-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">{stat.title}</p>
                    <p className="mt-1 text-xl font-bold">{stat.value}</p>
                    <div className={`mt-1 flex items-center gap-1 text-xs font-medium ${stat.up ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"}`}>
                      {stat.up ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                      {stat.change}
                    </div>
                  </div>
                  <div className="rounded-lg bg-primary/10 p-2">
                    <stat.icon className="size-4 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ExampleSection>

      <ExampleSection title="프로필 카드" description="사용자 정보를 표시합니다.">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { name: "김민준", role: "프론트엔드 개발자", location: "서울", initials: "김민", stars: 128 },
            { name: "이서연", role: "UX 디자이너", location: "부산", initials: "이서", stars: 94 },
            { name: "박준혁", role: "백엔드 개발자", location: "대구", initials: "박준", stars: 215 },
          ].map((user) => (
            <Card key={user.name} className="text-center">
              <CardContent className="pt-6">
                <Avatar className="mx-auto mb-3 size-16">
                  <AvatarFallback className="text-lg">{user.initials}</AvatarFallback>
                </Avatar>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.role}</p>
                <div className="mt-2 flex items-center justify-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="size-3" />
                  {user.location}
                </div>
                <div className="mt-3 flex items-center justify-center gap-1 text-xs">
                  <Star className="size-3 fill-amber-400 text-amber-400" />
                  <span className="font-medium">{user.stars}</span>
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <GitBranch className="size-3.5" />
                  팔로우
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <MessageCircle className="size-3.5" />
                  DM
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </ExampleSection>

      <ExampleSection title="가격 카드" description="요금제를 비교해서 보여줍니다.">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              name: "무료",
              price: "₩0",
              period: "/월",
              desc: "개인 프로젝트에 적합",
              features: ["프로젝트 3개", "스토리지 1GB", "이메일 지원"],
              variant: "outline" as const,
              badge: null,
            },
            {
              name: "프로",
              price: "₩29,000",
              period: "/월",
              desc: "성장하는 팀을 위한 플랜",
              features: ["프로젝트 무제한", "스토리지 100GB", "우선 지원", "분석 기능"],
              variant: "default" as const,
              badge: "인기",
            },
            {
              name: "엔터프라이즈",
              price: "문의",
              period: "",
              desc: "대규모 조직을 위한 맞춤 플랜",
              features: ["모든 기능 포함", "무제한 스토리지", "전담 지원", "SLA 보장", "커스텀 통합"],
              variant: "outline" as const,
              badge: null,
            },
          ].map((plan) => (
            <Card key={plan.name} className={plan.badge ? "border-primary shadow-sm" : ""}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{plan.name}</CardTitle>
                  {plan.badge && <Badge className="text-xs">{plan.badge}</Badge>}
                </div>
                <CardDescription>{plan.desc}</CardDescription>
                <div className="pt-1">
                  <span className="text-2xl font-bold">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <Separator className="mb-4" />
                <ul className="space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <span className="flex size-4 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant={plan.variant} className="w-full">
                  {plan.price === "문의" ? "영업팀 문의" : "시작하기"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </ExampleSection>

      <ExampleSection title="가로형 카드" description="이미지 또는 아이콘과 텍스트를 나란히 배치합니다.">
        <div className="space-y-3">
          {[
            { title: "React Hook Form", desc: "성능 최적화된 폼 라이브러리", badge: "폼", initials: "RHF" },
            { title: "Zod", desc: "TypeScript 친화적인 스키마 유효성 검사", badge: "유효성", initials: "Zod" },
            { title: "TanStack Table", desc: "강력한 테이블 상태 관리 솔루션", badge: "테이블", initials: "TST" },
          ].map((item) => (
            <Card key={item.title}>
              <CardContent className="flex items-center gap-4 py-4">
                <Avatar className="size-10 shrink-0">
                  <AvatarFallback className="text-xs font-medium">{item.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm">{item.title}</p>
                    <Badge variant="secondary" className="text-xs">{item.badge}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
                <Button variant="ghost" size="sm">보기</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </ExampleSection>
    </div>
  )
}
