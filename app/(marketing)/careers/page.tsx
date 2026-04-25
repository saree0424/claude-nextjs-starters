// 채용 페이지 - 복리후생과 채용 공고 목록으로 구성된 서버 컴포넌트
// 참조: 채용 공고 카드 레이아웃, 복리후생 그리드, Badge를 활용한 직책/위치 표시 예시

import { Coffee, Globe, Heart, Laptop, MapPin, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// 채용 공고 타입 정의
interface JobPosting {
  id: string                              // 공고 고유 ID
  title: string                           // 직책명
  team: string                            // 소속 팀
  type: "정규직" | "계약직" | "인턴"      // 고용 형태
  location: "원격" | "서울" | "하이브리드" // 근무 위치
  description: string                     // 직책 간단 설명
}

// 복리후생 타입 정의
interface Benefit {
  icon: React.ReactNode   // 아이콘
  title: string           // 혜택 이름
  description: string     // 혜택 설명
}

// 채용 공고 데이터
const jobPostings: JobPosting[] = [
  {
    id: "1",
    title: "시니어 프론트엔드 엔지니어",
    team: "제품 개발팀",
    type: "정규직",
    location: "하이브리드",
    description: "React/Next.js 기반의 사용자 경험을 설계하고 구현할 프론트엔드 전문가를 찾습니다.",
  },
  {
    id: "2",
    title: "백엔드 엔지니어",
    team: "인프라팀",
    type: "정규직",
    location: "원격",
    description: "확장 가능한 API와 마이크로서비스 아키텍처를 설계하고 운영할 엔지니어를 찾습니다.",
  },
  {
    id: "3",
    title: "프로덕트 디자이너",
    team: "디자인팀",
    type: "정규직",
    location: "서울",
    description: "사용자 중심의 UI/UX를 설계하고 디자인 시스템을 구축할 디자이너를 찾습니다.",
  },
  {
    id: "4",
    title: "DevOps 엔지니어",
    team: "인프라팀",
    type: "정규직",
    location: "원격",
    description: "CI/CD 파이프라인 구축과 클라우드 인프라 운영을 담당할 DevOps 전문가를 찾습니다.",
  },
  {
    id: "5",
    title: "마케팅 매니저",
    team: "마케팅팀",
    type: "정규직",
    location: "서울",
    description: "데이터 기반 마케팅 전략을 수립하고 실행할 마케팅 전문가를 찾습니다.",
  },
  {
    id: "6",
    title: "프론트엔드 개발 인턴",
    team: "제품 개발팀",
    type: "인턴",
    location: "서울",
    description: "웹 개발에 관심 있는 대학생 또는 졸업예정자를 모집합니다. (3~6개월)",
  },
]

// 복리후생 데이터
const benefits: Benefit[] = [
  {
    icon: <Laptop className="size-6 text-blue-500" />,
    title: "최신 장비 지원",
    description: "MacBook Pro 또는 원하는 사양의 개발 장비를 지원합니다.",
  },
  {
    icon: <Globe className="size-6 text-green-500" />,
    title: "완전 원격 근무",
    description: "장소에 구애받지 않고 전 세계 어디서든 근무할 수 있습니다.",
  },
  {
    icon: <Heart className="size-6 text-red-500" />,
    title: "건강 관리 지원",
    description: "의료비, 치과, 안과를 포함한 종합 건강보험을 지원합니다.",
  },
  {
    icon: <Coffee className="size-6 text-amber-600" />,
    title: "유연한 근무 시간",
    description: "코어 타임을 지키면서 자유롭게 근무 시간을 조정할 수 있습니다.",
  },
  {
    icon: <Users className="size-6 text-purple-500" />,
    title: "성장 지원",
    description: "컨퍼런스 참가비, 도서 구매, 온라인 강의 비용을 지원합니다.",
  },
  {
    icon: <MapPin className="size-6 text-orange-500" />,
    title: "워케이션 지원",
    description: "연 1회 팀 전체가 함께하는 워케이션 프로그램을 운영합니다.",
  },
]

// 고용 형태 Badge 스타일 매핑
const typeVariant: Record<JobPosting["type"], "default" | "secondary" | "outline"> = {
  정규직: "default",
  계약직: "secondary",
  인턴: "outline",
}

// 근무 위치 Badge 스타일 매핑
const locationVariant: Record<JobPosting["location"], "default" | "secondary" | "outline"> = {
  원격: "default",
  서울: "secondary",
  하이브리드: "outline",
}

export default function CareersPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      {/* 히어로 섹션 */}
      <div className="mb-16 text-center">
        <Badge variant="secondary" className="mb-4">채용</Badge>
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
          함께 성장할 동료를 찾습니다
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          우리는 열정적이고 재능 있는 사람들과 함께 더 나은 개발 경험을 만들어갑니다.
          다양한 배경과 관점을 가진 분들의 지원을 환영합니다.
        </p>
      </div>

      {/* 복리후생 그리드 */}
      <div className="mb-16">
        <h2 className="mb-6 text-center text-2xl font-bold">왜 StarterKit인가요?</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <Card key={benefit.title}>
              <CardContent className="pt-6">
                <div className="mb-3 flex items-center gap-3">
                  <div className="rounded-lg bg-muted p-2">{benefit.icon}</div>
                  <h3 className="font-semibold">{benefit.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator className="mb-16" />

      {/* 채용 공고 목록 */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">현재 채용 중인 포지션</h2>
          <Badge variant="secondary">{jobPostings.length}개 포지션</Badge>
        </div>

        <div className="space-y-4">
          {jobPostings.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{job.team}</p>
                  </div>
                  {/* 지원하기 버튼 */}
                  <Button size="sm">지원하기</Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-3 text-sm text-muted-foreground">{job.description}</p>
                {/* 고용 형태 및 위치 Badge */}
                <div className="flex items-center gap-2">
                  <Badge variant={typeVariant[job.type]} className="text-xs">
                    {job.type}
                  </Badge>
                  <Badge variant={locationVariant[job.location]} className="text-xs">
                    <MapPin className="mr-1 size-3" />
                    {job.location}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 원하는 포지션이 없을 때 안내 */}
        <Card className="mt-6 border-dashed">
          <CardContent className="py-8 text-center">
            <h3 className="mb-2 font-semibold">원하는 포지션이 없으신가요?</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              관심 있는 분야와 경력을 담아 이력서를 보내주시면 적합한 기회가 생겼을 때 연락드리겠습니다.
            </p>
            <Button variant="outline">열린 지원하기</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
