import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="rounded-2xl bg-primary px-8 py-16 text-center text-primary-foreground md:px-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            지금 바로 시작하세요
          </h2>
          <p className="mx-auto mb-8 max-w-xl opacity-90">
            이 스타터킷을 기반으로 여러분의 아이디어를 빠르게 구현해 보세요.
            모든 기반은 이미 준비되어 있습니다.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              variant="secondary"
            >
              <Link href="/dashboard">
                대시보드 체험하기
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                소스 코드 보기
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
