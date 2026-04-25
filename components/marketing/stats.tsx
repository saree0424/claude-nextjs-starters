const stats = [
  { value: "25+", label: "사전 구성된 컴포넌트" },
  { value: "8개", label: "검증된 외부 라이브러리" },
  { value: "100%", label: "TypeScript 적용" },
  { value: "Zero", label: "보일러플레이트 작성 시간" },
]

export function Stats() {
  return (
    <section id="stats" className="border-y bg-muted/30 py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-2 text-center">
              <span className="text-3xl font-bold tracking-tight md:text-4xl">
                {stat.value}
              </span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
