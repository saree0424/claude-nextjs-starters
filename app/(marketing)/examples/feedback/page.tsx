"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Info, CheckCircle, AlertTriangle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

function ExampleSection({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="mb-1 text-lg font-semibold">{title}</h2>
      {description && <p className="mb-4 text-sm text-muted-foreground">{description}</p>}
      <div className="rounded-xl border bg-muted/30 p-6">{children}</div>
    </section>
  )
}

function ProgressDemo() {
  const [value, setValue] = useState(40)

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>업로드 진행률</span>
          <span className="text-muted-foreground">{value}%</span>
        </div>
        <Progress value={value} />
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => setValue((v) => Math.max(0, v - 10))}>
          -10%
        </Button>
        <Button size="sm" variant="outline" onClick={() => setValue((v) => Math.min(100, v + 10))}>
          +10%
        </Button>
        <Button size="sm" variant="outline" onClick={() => setValue(0)}>
          리셋
        </Button>
        <Button size="sm" onClick={() => setValue(100)}>
          완료
        </Button>
      </div>
    </div>
  )
}

export default function FeedbackPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">피드백</h1>
        <p className="mt-1 text-muted-foreground">
          Toast, Alert, Badge, Progress, Skeleton, Tooltip 컴포넌트입니다.
        </p>
      </div>

      <ExampleSection title="Toast 알림" description="sonner 라이브러리를 사용한 토스트 알림입니다.">
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={() => toast("기본 알림 메시지입니다.")}>
            기본
          </Button>
          <Button
            variant="outline"
            className="border-emerald-500/50 text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/30"
            onClick={() => toast.success("저장되었습니다!", { description: "변경 사항이 성공적으로 저장됐습니다." })}
          >
            성공
          </Button>
          <Button
            variant="outline"
            className="border-destructive/50 text-destructive hover:bg-destructive/5"
            onClick={() => toast.error("오류가 발생했습니다.", { description: "잠시 후 다시 시도해주세요." })}
          >
            오류
          </Button>
          <Button
            variant="outline"
            className="border-amber-500/50 text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-950/30"
            onClick={() => toast.warning("주의가 필요합니다.", { description: "저장되지 않은 변경 사항이 있습니다." })}
          >
            경고
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              const id = toast.loading("처리 중...")
              setTimeout(() => toast.success("완료!", { id }), 2000)
            }}
          >
            로딩 → 완료
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast("파일이 삭제되었습니다.", {
                action: { label: "실행 취소", onClick: () => toast.success("복원되었습니다.") },
              })
            }
          >
            액션 포함
          </Button>
        </div>
      </ExampleSection>

      <ExampleSection title="Alert 컴포넌트" description="인라인 알림 메시지를 표시합니다.">
        <div className="space-y-3">
          <Alert>
            <Info className="size-4" />
            <AlertTitle>정보</AlertTitle>
            <AlertDescription>
              새로운 기능이 추가되었습니다. 자세한 내용은 문서를 확인하세요.
            </AlertDescription>
          </Alert>

          <Alert className="border-emerald-500/50 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 *:[svg]:text-emerald-600">
            <CheckCircle className="size-4" />
            <AlertTitle>성공</AlertTitle>
            <AlertDescription className="text-emerald-600 dark:text-emerald-500">
              모든 변경 사항이 성공적으로 저장되었습니다.
            </AlertDescription>
          </Alert>

          <Alert className="border-amber-500/50 bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400 *:[svg]:text-amber-600">
            <AlertTriangle className="size-4" />
            <AlertTitle>경고</AlertTitle>
            <AlertDescription className="text-amber-600 dark:text-amber-500">
              이 작업은 되돌릴 수 없습니다. 신중하게 진행하세요.
            </AlertDescription>
          </Alert>

          <Alert variant="destructive">
            <XCircle className="size-4" />
            <AlertTitle>오류</AlertTitle>
            <AlertDescription>
              서버와 연결할 수 없습니다. 네트워크 상태를 확인하세요.
            </AlertDescription>
          </Alert>
        </div>
      </ExampleSection>

      <ExampleSection title="Badge 변형" description="상태, 카테고리, 레이블을 표시합니다.">
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">기본 변형</p>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">상태 표시</p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400">
                <span className="mr-1 inline-block size-1.5 rounded-full bg-emerald-500" />
                활성
              </Badge>
              <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400">
                <span className="mr-1 inline-block size-1.5 rounded-full bg-amber-500" />
                대기
              </Badge>
              <Badge className="bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400">
                <span className="mr-1 inline-block size-1.5 rounded-full bg-red-500" />
                오류
              </Badge>
              <Badge variant="secondary">
                <span className="mr-1 inline-block size-1.5 rounded-full bg-muted-foreground" />
                비활성
              </Badge>
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">카테고리 태그</p>
            <div className="flex flex-wrap gap-2">
              {["React", "TypeScript", "Next.js", "Tailwind CSS", "shadcn/ui"].map((tag) => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection title="Progress Bar" description="작업 진행 상태를 시각화합니다.">
        <ProgressDemo />
      </ExampleSection>

      <ExampleSection title="Skeleton 로딩" description="데이터 로딩 중 자리 표시자를 표시합니다.">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-medium text-muted-foreground">카드 스켈레톤</p>
            <div className="rounded-xl border p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Skeleton className="size-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-4/5" />
              <Skeleton className="h-3 w-3/5" />
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-medium text-muted-foreground">목록 스켈레톤</p>
            <div className="space-y-3">
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="size-8 rounded-lg shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-3.5 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                  <Skeleton className="h-6 w-12 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection title="Tooltip" description="요소 위에 마우스를 올리면 추가 정보를 표시합니다.">
        <div className="flex flex-wrap items-center gap-6">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">기본 툴팁</Button>
            </TooltipTrigger>
            <TooltipContent>이것은 기본 툴팁입니다</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">위쪽 툴팁</Button>
            </TooltipTrigger>
            <TooltipContent side="top">위에 표시되는 툴팁</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">아래쪽 툴팁</Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">아래에 표시되는 툴팁</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarFallback>홍</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>홍길동 — 관리자</TooltipContent>
          </Tooltip>
        </div>
      </ExampleSection>
    </div>
  )
}
