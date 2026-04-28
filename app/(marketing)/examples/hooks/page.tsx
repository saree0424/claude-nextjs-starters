"use client"

import { useRef, useCallback, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { useDebounce } from "@/hooks/use-debounce"
import { useToggle } from "@/hooks/use-toggle"
import { useWindowSize } from "@/hooks/use-window-size"
import { useAsync } from "@/hooks/use-async"
import { useClickOutside } from "@/hooks/use-click-outside"
import { useInterval } from "@/hooks/use-interval"
import { useIsMobile } from "@/hooks/use-mobile"

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs font-mono">
      <code>{code}</code>
    </pre>
  )
}

function DemoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border bg-background p-4">{children}</div>
  )
}

function UseLocalStorageDemo() {
  const [value, setValue, removeValue] = useLocalStorage("example-text", "")
  return (
    <div className="space-y-3">
      <DemoBox>
        <div className="flex gap-2">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="입력하면 localStorage에 저장됩니다"
          />
          <Button variant="outline" size="sm" onClick={removeValue}>삭제</Button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          저장된 값: <code className="rounded bg-muted px-1">{value || "(없음)"}</code>
          <br />페이지를 새로고침해도 값이 유지됩니다.
        </p>
      </DemoBox>
      <CodeBlock code={`const [value, setValue, removeValue] = useLocalStorage("key", "")`} />
    </div>
  )
}

function UseDebounceDemo() {
  const [input, setInput] = useState("")
  const debounced = useDebounce(input, 500)
  return (
    <div className="space-y-3">
      <DemoBox>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="타이핑하세요 (500ms 디바운스)"
        />
        <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-xs font-medium text-muted-foreground">즉시 값</p>
            <p className="font-mono">{input || "—"}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">디바운스 값 (500ms)</p>
            <p className="font-mono">{debounced || "—"}</p>
          </div>
        </div>
      </DemoBox>
      <CodeBlock code={`const debouncedValue = useDebounce(inputValue, 500)`} />
    </div>
  )
}

function UseToggleDemo() {
  const [isOn, { toggle, setTrue, setFalse }] = useToggle(false)
  return (
    <div className="space-y-3">
      <DemoBox>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`size-3 rounded-full transition-colors ${isOn ? "bg-emerald-500" : "bg-muted-foreground/40"}`} />
            <span className="text-sm font-medium">{isOn ? "ON" : "OFF"}</span>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={toggle}>토글</Button>
            <Button size="sm" variant="outline" onClick={setTrue}>ON</Button>
            <Button size="sm" variant="outline" onClick={setFalse}>OFF</Button>
          </div>
        </div>
      </DemoBox>
      <CodeBlock code={`const [isOn, { toggle, setTrue, setFalse }] = useToggle(false)`} />
    </div>
  )
}

function UseWindowSizeDemo() {
  const { width, height } = useWindowSize()
  return (
    <div className="space-y-3">
      <DemoBox>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">너비</p>
            <p className="text-2xl font-bold">{width ?? "—"}</p>
            <p className="text-xs text-muted-foreground">px</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">높이</p>
            <p className="text-2xl font-bold">{height ?? "—"}</p>
            <p className="text-xs text-muted-foreground">px</p>
          </div>
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground">창 크기를 조절해보세요</p>
      </DemoBox>
      <CodeBlock code={`const { width, height } = useWindowSize()`} />
    </div>
  )
}

function UseAsyncDemo() {
  const fetchData = useCallback(
    () =>
      new Promise<string>((resolve, reject) =>
        setTimeout(() => {
          if (Math.random() > 0.3) resolve("데이터를 성공적으로 불러왔습니다! ✓")
          else reject(new Error("요청 실패 (30% 확률로 발생)"))
        }, 1200)
      ),
    []
  )
  const { status, value, error, execute } = useAsync(fetchData)

  return (
    <div className="space-y-3">
      <DemoBox>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Button onClick={execute} disabled={status === "pending"} size="sm">
              {status === "pending" ? "요청 중..." : "비동기 요청"}
            </Button>
            <Badge variant={
              status === "success" ? "outline" :
              status === "error" ? "destructive" :
              status === "pending" ? "secondary" : "secondary"
            }>
              {status}
            </Badge>
          </div>
          {status === "success" && (
            <p className="text-sm text-emerald-600 dark:text-emerald-400">{value}</p>
          )}
          {status === "error" && (
            <p className="text-sm text-destructive">{error?.message}</p>
          )}
          {status === "idle" && (
            <p className="text-xs text-muted-foreground">버튼을 클릭하면 비동기 요청을 실행합니다.</p>
          )}
        </div>
      </DemoBox>
      <CodeBlock code={`const { status, value, error, execute } = useAsync(asyncFn)\n// status: 'idle' | 'pending' | 'success' | 'error'`} />
    </div>
  )
}

function UseClickOutsideDemo() {
  const [active, setActive] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref, () => setActive(false))

  return (
    <div className="space-y-3">
      <DemoBox>
        <div
          ref={ref}
          className={`relative rounded-lg border-2 p-6 text-center transition-colors cursor-pointer ${
            active ? "border-primary bg-primary/5" : "border-border"
          }`}
          onClick={() => setActive(true)}
        >
          <p className="text-sm font-medium">
            {active ? "활성화됨 — 박스 외부를 클릭하면 비활성화됩니다" : "이 박스를 클릭하세요"}
          </p>
        </div>
      </DemoBox>
      <CodeBlock code={`useClickOutside(ref, () => setActive(false))`} />
    </div>
  )
}

function UseIntervalDemo() {
  const [count, setCount] = useState(0)
  const [running, setRunning] = useState(false)

  useInterval(() => setCount((c) => c + 1), running ? 1000 : null)

  return (
    <div className="space-y-3">
      <DemoBox>
        <div className="text-center space-y-4">
          <p className="text-4xl font-bold font-mono">{count}</p>
          <div className="flex justify-center gap-2">
            <Button size="sm" onClick={() => setRunning(true)} disabled={running}>시작</Button>
            <Button size="sm" variant="outline" onClick={() => setRunning(false)} disabled={!running}>정지</Button>
            <Button size="sm" variant="outline" onClick={() => { setRunning(false); setCount(0) }}>리셋</Button>
          </div>
          <p className="text-xs text-muted-foreground">
            {running ? "1초마다 증가 중..." : "정지됨"}
          </p>
        </div>
      </DemoBox>
      <CodeBlock code={`useInterval(callback, running ? 1000 : null)\n// delay가 null이면 인터벌 정지`} />
    </div>
  )
}

function UseIsMobileDemo() {
  const isMobile = useIsMobile()
  return (
    <div className="space-y-3">
      <DemoBox>
        <div className="text-center space-y-3">
          <div className={`mx-auto flex size-16 items-center justify-center rounded-xl ${isMobile ? "bg-blue-500/10" : "bg-primary/10"}`}>
            <span className="text-2xl">{isMobile ? "📱" : "🖥️"}</span>
          </div>
          <div>
            <p className="font-semibold">{isMobile ? "모바일" : "데스크탑"}</p>
            <p className="text-xs text-muted-foreground mt-1">
              기준: 768px (창 너비를 조절해보세요)
            </p>
          </div>
          <Badge variant={isMobile ? "secondary" : "outline"}>
            isMobile = {String(isMobile)}
          </Badge>
        </div>
      </DemoBox>
      <CodeBlock code={`const isMobile = useIsMobile() // 768px 미만이면 true`} />
    </div>
  )
}

const HOOKS = [
  { id: "local-storage", label: "useLocalStorage", component: <UseLocalStorageDemo /> },
  { id: "debounce", label: "useDebounce", component: <UseDebounceDemo /> },
  { id: "toggle", label: "useToggle", component: <UseToggleDemo /> },
  { id: "window-size", label: "useWindowSize", component: <UseWindowSizeDemo /> },
  { id: "async", label: "useAsync", component: <UseAsyncDemo /> },
  { id: "click-outside", label: "useClickOutside", component: <UseClickOutsideDemo /> },
  { id: "interval", label: "useInterval", component: <UseIntervalDemo /> },
  { id: "is-mobile", label: "useIsMobile", component: <UseIsMobileDemo /> },
]

export default function HooksPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">커스텀 훅</h1>
        <p className="mt-1 text-muted-foreground">
          재사용 가능한 커스텀 훅의 인터랙티브 데모입니다.
        </p>
      </div>

      <Tabs defaultValue="local-storage">
        <TabsList className="mb-6 flex h-auto flex-wrap gap-1 bg-muted/50 p-1">
          {HOOKS.map((h) => (
            <TabsTrigger key={h.id} value={h.id} className="text-xs">
              {h.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {HOOKS.map((h) => (
          <TabsContent key={h.id} value={h.id}>
            <div className="mb-4">
              <h2 className="text-lg font-semibold">{h.label}</h2>
            </div>
            {h.component}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
