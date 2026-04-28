function ColorBox({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`flex items-center justify-center rounded-lg bg-primary/10 p-4 text-sm font-medium text-primary ${className}`}>
      {label}
    </div>
  )
}

function ExampleSection({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="mb-1 text-lg font-semibold">{title}</h2>
      {description && <p className="mb-4 text-sm text-muted-foreground">{description}</p>}
      <div className="rounded-xl border bg-muted/30 p-6">{children}</div>
    </section>
  )
}

export default function LayoutsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">레이아웃</h1>
        <p className="mt-1 text-muted-foreground">
          Tailwind CSS Grid & Flex를 활용한 다양한 레이아웃 패턴입니다.
        </p>
      </div>

      <ExampleSection title="1~4 컬럼 그리드" description="grid-cols-N 으로 균등 분할합니다.">
        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-3">
            <ColorBox label="1열 (grid-cols-1)" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <ColorBox label="1/2" />
            <ColorBox label="2/2" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <ColorBox label="1/3" />
            <ColorBox label="2/3" />
            <ColorBox label="3/3" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            <ColorBox label="1/4" />
            <ColorBox label="2/4" />
            <ColorBox label="3/4" />
            <ColorBox label="4/4" />
          </div>
        </div>
      </ExampleSection>

      <ExampleSection title="반응형 그리드" description="sm/md/lg 브레이크포인트에 따라 컬럼 수가 변합니다. 창 크기를 조절해보세요.">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, i) => (
            <ColorBox key={i} label={`항목 ${i + 1}`} />
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono">grid-cols-1 sm:grid-cols-2 lg:grid-cols-4</code>
        </p>
      </ExampleSection>

      <ExampleSection title="분할 레이아웃 (50/50)" description="flex 또는 grid로 2분할합니다.">
        <div className="grid gap-3 sm:grid-cols-2">
          <ColorBox label="좌측 (50%)" className="min-h-24" />
          <ColorBox label="우측 (50%)" className="min-h-24" />
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono">grid sm:grid-cols-2</code>
        </p>
      </ExampleSection>

      <ExampleSection title="비대칭 분할 (1/3 + 2/3)" description="col-span으로 열 너비를 비율로 지정합니다.">
        <div className="grid gap-3 sm:grid-cols-3">
          <ColorBox label="1/3" className="min-h-24" />
          <ColorBox label="2/3 (col-span-2)" className="min-h-24 sm:col-span-2" />
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono">grid sm:grid-cols-3</code> +{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono">sm:col-span-2</code>
        </p>
      </ExampleSection>

      <ExampleSection title="사이드바 레이아웃" description="고정 너비 사이드바 + flex-1 메인 영역입니다.">
        <div className="flex gap-3">
          <div className="flex w-32 shrink-0 items-center justify-center rounded-lg bg-secondary/30 p-4 text-center text-xs font-medium text-secondary-foreground">
            사이드바<br />(고정 너비)
          </div>
          <div className="flex min-h-24 flex-1 items-center justify-center rounded-lg bg-primary/10 text-sm font-medium text-primary">
            메인 콘텐츠 (flex-1)
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono">flex</code> +{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono">w-32 shrink-0</code> +{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono">flex-1</code>
        </p>
      </ExampleSection>

      <ExampleSection title="카드 그리드" description="실제 Card 컴포넌트를 사용한 반응형 카드 그리드입니다.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "총 방문자", value: "24,521", desc: "전월 대비 +12%" },
            { title: "신규 가입", value: "1,234", desc: "전월 대비 +5%" },
            { title: "전환율", value: "3.2%", desc: "전월 대비 -0.4%" },
          ].map((card) => (
            <div key={card.title} className="rounded-xl border bg-card p-5 shadow-sm">
              <p className="text-sm text-muted-foreground">{card.title}</p>
              <p className="mt-1 text-2xl font-bold">{card.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{card.desc}</p>
            </div>
          ))}
        </div>
      </ExampleSection>

      <ExampleSection title="성배 레이아웃 (Holy Grail)" description="헤더 + (좌측 사이드 + 메인 + 우측 사이드) + 푸터 구조입니다.">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-center rounded-lg bg-blue-500/20 p-3 text-xs font-medium text-blue-600 dark:text-blue-400">
            헤더
          </div>
          <div className="flex gap-2">
            <div className="flex w-20 shrink-0 items-center justify-center rounded-lg bg-green-500/20 p-3 text-center text-xs font-medium text-green-600 dark:text-green-400">
              좌측
            </div>
            <div className="flex min-h-16 flex-1 items-center justify-center rounded-lg bg-primary/10 text-xs font-medium text-primary">
              메인
            </div>
            <div className="flex w-20 shrink-0 items-center justify-center rounded-lg bg-orange-500/20 p-3 text-center text-xs font-medium text-orange-600 dark:text-orange-400">
              우측
            </div>
          </div>
          <div className="flex items-center justify-center rounded-lg bg-blue-500/20 p-3 text-xs font-medium text-blue-600 dark:text-blue-400">
            푸터
          </div>
        </div>
      </ExampleSection>

      <ExampleSection title="중앙 정렬 레이아웃" description="콘텐츠를 페이지 중앙에 배치하는 패턴입니다.">
        <div className="flex min-h-32 items-center justify-center rounded-xl border-2 border-dashed">
          <div className="text-center">
            <p className="text-sm font-medium">중앙 정렬 콘텐츠</p>
            <p className="mt-1 text-xs text-muted-foreground">
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono">flex items-center justify-center</code>
            </p>
          </div>
        </div>
      </ExampleSection>
    </div>
  )
}
