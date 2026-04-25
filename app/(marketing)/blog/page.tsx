// 블로그 페이지 - Featured Post와 포스트 그리드로 구성된 서버 컴포넌트
// 참조: 블로그 목록 레이아웃, Featured 카드 가로 배치, Badge 카테고리 표시 예시

import { ArrowRight, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// 블로그 포스트 타입 정의
interface BlogPost {
  id: string          // 포스트 고유 ID
  title: string       // 포스트 제목
  excerpt: string     // 요약 내용
  category: string    // 카테고리
  date: string        // 작성 날짜
  readTime: string    // 예상 읽기 시간
  featured: boolean   // Featured 포스트 여부
  author: string      // 작성자 이름
}

// 블로그 포스트 샘플 데이터
const posts: BlogPost[] = [
  {
    id: "1",
    title: "Next.js 15와 React 19로 더 빠른 웹 앱 만들기",
    excerpt:
      "Next.js 15의 새로운 기능과 React 19의 Concurrent Features를 활용하여 성능을 극대화하는 방법을 소개합니다. Server Components와 Streaming을 효과적으로 사용하는 패턴을 살펴봅니다.",
    category: "기술",
    date: "2024년 12월 15일",
    readTime: "8분",
    featured: true,
    author: "김민준",
  },
  {
    id: "2",
    title: "Tailwind CSS v4 마이그레이션 가이드",
    excerpt: "Tailwind CSS v3에서 v4로 마이그레이션하는 단계별 가이드입니다.",
    category: "튜토리얼",
    date: "2024년 12월 10일",
    readTime: "5분",
    featured: false,
    author: "이서연",
  },
  {
    id: "3",
    title: "shadcn/ui로 디자인 시스템 구축하기",
    excerpt: "재사용 가능한 UI 컴포넌트 라이브러리를 shadcn/ui로 구축하는 방법을 알아봅니다.",
    category: "디자인",
    date: "2024년 12월 5일",
    readTime: "6분",
    featured: false,
    author: "박도윤",
  },
  {
    id: "4",
    title: "TypeScript 5.x 고급 타입 패턴",
    excerpt: "실무에서 바로 활용할 수 있는 TypeScript 고급 타입 기법들을 정리했습니다.",
    category: "기술",
    date: "2024년 11월 28일",
    readTime: "10분",
    featured: false,
    author: "김민준",
  },
  {
    id: "5",
    title: "웹 성능 최적화: Core Web Vitals 개선 전략",
    excerpt: "LCP, FID, CLS를 개선하여 Google 검색 순위와 사용자 경험을 향상시키는 방법입니다.",
    category: "성능",
    date: "2024년 11월 20일",
    readTime: "7분",
    featured: false,
    author: "최지아",
  },
  {
    id: "6",
    title: "스타터킷 v2.0 출시 안내",
    excerpt: "더욱 강화된 기능과 개선된 개발자 경험을 담은 StarterKit v2.0을 소개합니다.",
    category: "공지",
    date: "2024년 11월 15일",
    readTime: "3분",
    featured: false,
    author: "이서연",
  },
]

// 카테고리별 Badge 색상 매핑
const categoryVariant: Record<string, "default" | "secondary" | "outline"> = {
  기술: "default",
  튜토리얼: "secondary",
  디자인: "secondary",
  성능: "outline",
  공지: "outline",
}

export default function BlogPage() {
  // Featured 포스트와 일반 포스트 분리
  const featuredPost = posts.find((post) => post.featured)
  const regularPosts = posts.filter((post) => !post.featured)

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      {/* 페이지 헤더 */}
      <div className="mb-12">
        <Badge variant="secondary" className="mb-4">블로그</Badge>
        <h1 className="mb-4 text-4xl font-bold tracking-tight">최신 인사이트</h1>
        <p className="text-lg text-muted-foreground">
          개발 트렌드, 튜토리얼, 그리고 팀 소식을 공유합니다.
        </p>
      </div>

      {/* Featured 포스트 - 가로 레이아웃으로 크게 표시 */}
      {featuredPost && (
        <div className="mb-12">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            주요 포스트
          </h2>
          <Card className="overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Featured 포스트 배경 이미지 영역 */}
              <div className="flex min-h-48 items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5 p-8 md:min-h-64">
                <Badge className="text-sm">{featuredPost.category}</Badge>
              </div>
              {/* Featured 포스트 내용 */}
              <div className="flex flex-col justify-between p-6">
                <div>
                  <Badge variant={categoryVariant[featuredPost.category] ?? "secondary"} className="mb-3">
                    {featuredPost.category}
                  </Badge>
                  <h3 className="mb-3 text-xl font-bold leading-snug">{featuredPost.title}</h3>
                  <p className="text-sm text-muted-foreground">{featuredPost.excerpt}</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  {/* 메타 정보 */}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" />
                      {featuredPost.readTime} 읽기
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/blog/${featuredPost.id}`}>
                      읽기 <ArrowRight className="ml-1 size-3" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      <Separator className="mb-12" />

      {/* 일반 포스트 그리드 */}
      <div>
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          모든 포스트
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {regularPosts.map((post) => (
            <Card key={post.id} className="flex flex-col hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <Badge
                  variant={categoryVariant[post.category] ?? "secondary"}
                  className="w-fit text-xs"
                >
                  {post.category}
                </Badge>
                <h3 className="text-base font-semibold leading-snug">{post.title}</h3>
              </CardHeader>
              <CardContent className="flex-1 pb-3">
                <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="flex items-center justify-between pt-0">
                {/* 포스트 메타 정보 */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3" />
                    {post.readTime}
                  </span>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/blog/${post.id}`}>
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
