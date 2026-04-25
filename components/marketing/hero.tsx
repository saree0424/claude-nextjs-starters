import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function Hero() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col items-center gap-6 text-center">
          <Badge variant="secondary" className="gap-1.5 px-3 py-1">
            <Sparkles className="size-3.5" />
            Next.js 16 + shadcn/ui 스타터킷
          </Badge>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            더 빠르게 만들고,
            <br />
            <span className="text-muted-foreground">더 멀리 나아가세요</span>
          </h1>

          <p className="max-w-xl text-lg text-muted-foreground md:text-xl">
            검증된 기술 스택으로 구성된 프로덕션 레디 스타터킷.
            아이디어를 빠르게 현실로 만들 수 있습니다.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/dashboard">
                대시보드 보기
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub에서 보기
              </Link>
            </Button>
          </div>

          {/* 기술 스택 배지 */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "shadcn/ui", "Zod", "Recharts"].map(
              (tech) => (
                <Badge key={tech} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
