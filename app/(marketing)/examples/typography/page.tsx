import { Separator } from "@/components/ui/separator"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      <div className="rounded-xl border bg-muted/30 p-6 space-y-3">{children}</div>
    </section>
  )
}

export default function TypographyPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">타이포그래피</h1>
        <p className="mt-1 text-muted-foreground">
          Tailwind CSS 유틸리티 클래스로 구현하는 텍스트 스타일입니다.
        </p>
      </div>

      <Section title="제목 크기">
        <p className="text-4xl font-bold">Heading 1 — text-4xl font-bold</p>
        <p className="text-3xl font-bold">Heading 2 — text-3xl font-bold</p>
        <p className="text-2xl font-semibold">Heading 3 — text-2xl font-semibold</p>
        <p className="text-xl font-semibold">Heading 4 — text-xl font-semibold</p>
        <p className="text-lg font-medium">Heading 5 — text-lg font-medium</p>
        <p className="text-base font-medium">Heading 6 — text-base font-medium</p>
      </Section>

      <Section title="본문 텍스트">
        <p className="text-lg">Large — text-lg: 인터랙티브 요소의 강조 텍스트</p>
        <p className="text-base">Base — text-base: 기본 본문 텍스트, 읽기 편한 크기</p>
        <p className="text-sm">Small — text-sm: 보조 텍스트, 설명, 캡션</p>
        <p className="text-xs">Extra Small — text-xs: 라벨, 배지, 힌트</p>
      </Section>

      <Section title="폰트 굵기">
        <p className="font-thin">font-thin (100)</p>
        <p className="font-light">font-light (300)</p>
        <p className="font-normal">font-normal (400) — 기본값</p>
        <p className="font-medium">font-medium (500)</p>
        <p className="font-semibold">font-semibold (600)</p>
        <p className="font-bold">font-bold (700)</p>
        <p className="font-extrabold">font-extrabold (800)</p>
      </Section>

      <Section title="텍스트 색상">
        <p className="text-foreground">text-foreground — 기본 텍스트</p>
        <p className="text-muted-foreground">text-muted-foreground — 보조 텍스트</p>
        <p className="text-primary">text-primary — 강조 텍스트</p>
        <p className="text-destructive">text-destructive — 오류/위험 텍스트</p>
      </Section>

      <Section title="특수 스타일">
        <p className="italic">italic — 이탤릭체 텍스트</p>
        <p className="underline">underline — 밑줄 텍스트</p>
        <p className="line-through">line-through — 취소선 텍스트</p>
        <p className="uppercase tracking-wider">uppercase tracking-wider</p>
        <p className="lowercase">LOWERCASE 텍스트</p>
        <p className="capitalize">capitalize first letter</p>
        <p className="truncate max-w-xs">
          truncate — 길이를 초과하면 말줄임표로 잘립니다. 이 텍스트는 매우 길어서 잘립니다.
        </p>
      </Section>

      <Section title="목록">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-medium">순서 없는 목록</p>
            <ul className="ml-4 list-disc space-y-1 text-sm">
              <li>첫 번째 항목</li>
              <li>두 번째 항목</li>
              <li>
                중첩 목록
                <ul className="ml-4 mt-1 list-circle space-y-1">
                  <li>하위 항목 1</li>
                  <li>하위 항목 2</li>
                </ul>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium">순서 있는 목록</p>
            <ol className="ml-4 list-decimal space-y-1 text-sm">
              <li>첫 번째 단계</li>
              <li>두 번째 단계</li>
              <li>세 번째 단계</li>
            </ol>
          </div>
        </div>
      </Section>

      <Section title="인용문">
        <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
          &ldquo;좋은 디자인은 가능한 한 적게 디자인하는 것이다. 더 적게, 하지만 더 좋게.&rdquo;
          <footer className="mt-2 text-sm font-medium not-italic text-foreground">
            — Dieter Rams
          </footer>
        </blockquote>
      </Section>

      <Section title="코드">
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-sm text-muted-foreground">인라인 코드</p>
            <p className="text-sm">
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                npm install
              </code>{" "}
              명령어로 의존성을 설치합니다.{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                useState
              </code>{" "}
              훅을 사용해보세요.
            </p>
          </div>
          <Separator />
          <div>
            <p className="mb-2 text-sm text-muted-foreground">코드 블록</p>
            <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm font-mono">
              <code>{`import { useState } from "react"

function Counter() {
  const [count, setCount] = useState(0)
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}`}</code>
            </pre>
          </div>
        </div>
      </Section>

      <Section title="링크 스타일">
        <p className="text-sm">
          일반{" "}
          <a href="#" className="text-primary underline underline-offset-4 hover:opacity-80">
            텍스트 링크
          </a>
          와 함께 사용합니다. 또는{" "}
          <a href="#" className="font-medium text-foreground underline underline-offset-4">
            강조 링크
          </a>
          스타일도 있습니다.
        </p>
      </Section>
    </div>
  )
}
