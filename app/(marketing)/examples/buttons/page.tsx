"use client"

import { useState } from "react"
import { Loader2, Mail, ArrowRight, Plus, Settings, Trash2, Download, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

function ExampleSection({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-10">
      <h2 className="mb-1 text-lg font-semibold">{title}</h2>
      {description && (
        <p className="mb-4 text-sm text-muted-foreground">{description}</p>
      )}
      <div className="rounded-xl border bg-muted/30 p-6">{children}</div>
    </section>
  )
}

export default function ButtonsPage() {
  const [loading, setLoading] = useState(false)

  const handleLoadingClick = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 2000))
    setLoading(false)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">버튼</h1>
        <p className="mt-1 text-muted-foreground">
          다양한 버튼 변형, 크기, 상태를 확인할 수 있습니다.
        </p>
      </div>

      <ExampleSection
        title="버튼 변형"
        description="variant prop으로 버튼의 시각적 스타일을 지정합니다."
      >
        <div className="flex flex-wrap gap-3">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
      </ExampleSection>

      <ExampleSection
        title="버튼 크기"
        description="size prop으로 버튼의 크기를 조정합니다."
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </ExampleSection>

      <ExampleSection
        title="아이콘 버튼"
        description="size='icon' 으로 정사각형 아이콘 버튼을 만듭니다."
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button size="icon-xs" variant="outline">
            <Plus />
          </Button>
          <Button size="icon-sm" variant="outline">
            <Settings />
          </Button>
          <Button size="icon" variant="outline">
            <Download />
          </Button>
          <Button size="icon-lg" variant="outline">
            <Trash2 />
          </Button>
        </div>
      </ExampleSection>

      <ExampleSection
        title="아이콘이 포함된 버튼"
        description="텍스트와 아이콘을 함께 사용하는 패턴입니다."
      >
        <div className="flex flex-wrap gap-3">
          <Button>
            <Mail />
            이메일 보내기
          </Button>
          <Button variant="outline">
            다운로드
            <Download />
          </Button>
          <Button variant="secondary">
            다음 단계
            <ArrowRight />
          </Button>
          <Button variant="destructive">
            <Trash2 />
            삭제
          </Button>
        </div>
      </ExampleSection>

      <ExampleSection
        title="버튼 상태"
        description="로딩 및 비활성화 상태를 표현하는 방법입니다."
      >
        <div className="flex flex-wrap gap-3">
          <Button onClick={handleLoadingClick} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                처리 중...
              </>
            ) : (
              "클릭하여 로딩 테스트"
            )}
          </Button>
          <Button disabled>비활성화</Button>
          <Button variant="outline" disabled>
            <Mail />
            비활성화 (outline)
          </Button>
        </div>
      </ExampleSection>

      <ExampleSection
        title="버튼 그룹"
        description="연관된 버튼들을 그룹으로 배치합니다."
      >
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              이전
            </Button>
            <Button variant="outline" size="sm">
              1
            </Button>
            <Button size="sm">2</Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              다음
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              취소
            </Button>
            <Button variant="destructive">
              <Trash2 />
              삭제 확인
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              임시저장
            </Button>
            <Button size="sm">
              저장
              <ChevronRight />
            </Button>
          </div>
        </div>
      </ExampleSection>
    </div>
  )
}
