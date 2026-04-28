"use client"

import { useState } from "react"
import { Trash2, Settings, UserPlus, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

function ExampleSection({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="mb-1 text-lg font-semibold">{title}</h2>
      {description && <p className="mb-4 text-sm text-muted-foreground">{description}</p>}
      <div className="rounded-xl border bg-muted/30 p-6">{children}</div>
    </section>
  )
}

function FormDialog() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const handleSave = () => {
    alert(`저장됨: ${name} / ${email}`)
    setOpen(false)
    setName("")
    setEmail("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <UserPlus />
          사용자 추가
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 사용자 추가</DialogTitle>
          <DialogDescription>
            새 사용자의 정보를 입력하세요.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="form-dialog-name">이름</Label>
            <Input
              id="form-dialog-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="홍길동"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="form-dialog-email">이메일</Label>
            <Input
              id="form-dialog-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>취소</Button>
          <Button onClick={handleSave}>저장</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function ModalsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">모달 / 다이얼로그</h1>
        <p className="mt-1 text-muted-foreground">
          Dialog, AlertDialog, Sheet 컴포넌트의 다양한 활용 패턴입니다.
        </p>
      </div>

      <ExampleSection title="기본 Dialog" description="일반적인 정보 표시 다이얼로그입니다.">
        <div className="flex flex-wrap gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button>기본 다이얼로그 열기</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>다이얼로그 제목</DialogTitle>
                <DialogDescription>
                  여기에 다이얼로그의 내용이 들어갑니다. 사용자에게 필요한 정보를 표시합니다.
                </DialogDescription>
              </DialogHeader>
              <p className="text-sm text-muted-foreground">
                추가적인 내용을 이곳에 배치할 수 있습니다. 이미지, 텍스트, 폼 등 다양한 콘텐츠를 넣을 수 있습니다.
              </p>
              <DialogFooter showCloseButton>
                <Button>확인</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Settings />
                설정 다이얼로그
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>환경 설정</DialogTitle>
                <DialogDescription>애플리케이션 설정을 관리합니다.</DialogDescription>
              </DialogHeader>
              <div className="space-y-3 py-2">
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="text-sm font-medium">알림 설정</p>
                    <p className="text-xs text-muted-foreground">이메일 알림 수신</p>
                  </div>
                  <Button size="sm" variant="outline">변경</Button>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="text-sm font-medium">언어</p>
                    <p className="text-xs text-muted-foreground">한국어</p>
                  </div>
                  <Button size="sm" variant="outline">변경</Button>
                </div>
              </div>
              <DialogFooter showCloseButton>
                <Button>저장</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </ExampleSection>

      <ExampleSection title="확인 AlertDialog" description="중요한 작업 전 사용자 확인을 요청합니다.">
        <div className="flex flex-wrap gap-3">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 />
                항목 삭제
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>정말 삭제하시겠습니까?</AlertDialogTitle>
                <AlertDialogDescription>
                  이 작업은 되돌릴 수 없습니다. 항목이 영구적으로 삭제되며 복구할 수 없습니다.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>취소</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  삭제
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">로그아웃</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>로그아웃</AlertDialogTitle>
                <AlertDialogDescription>
                  로그아웃하시겠습니까? 저장되지 않은 작업이 있을 수 있습니다.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>취소</AlertDialogCancel>
                <AlertDialogAction>로그아웃</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </ExampleSection>

      <ExampleSection title="Sheet (슬라이드 패널)" description="화면 가장자리에서 슬라이드되어 나타납니다.">
        <div className="flex flex-wrap gap-3">
          {(["right", "left", "top", "bottom"] as const).map((side) => (
            <Sheet key={side}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  {side === "right" && "우측에서 열기"}
                  {side === "left" && "좌측에서 열기"}
                  {side === "top" && "위에서 열기"}
                  {side === "bottom" && "아래에서 열기"}
                </Button>
              </SheetTrigger>
              <SheetContent side={side}>
                <SheetHeader>
                  <SheetTitle>Sheet — {side}</SheetTitle>
                  <SheetDescription>
                    {side} 방향에서 슬라이드되어 나타나는 패널입니다.
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-4 text-sm text-muted-foreground">
                  여기에 필터, 설정, 네비게이션 등 추가 콘텐츠를 배치할 수 있습니다.
                </div>
              </SheetContent>
            </Sheet>
          ))}
        </div>
      </ExampleSection>

      <ExampleSection title="폼이 포함된 Dialog" description="Dialog 내부에 입력 폼을 포함한 패턴입니다.">
        <div className="flex flex-wrap gap-3">
          <FormDialog />

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Bell />
                알림 설정
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>알림 설정</DialogTitle>
                <DialogDescription>어떤 알림을 받을지 선택하세요.</DialogDescription>
              </DialogHeader>
              <div className="space-y-3 py-2">
                {["새 댓글", "새 팔로워", "언급", "보안 경고"].map((item) => (
                  <label key={item} className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 hover:bg-muted/50">
                    <input type="checkbox" defaultChecked className="size-4 rounded" />
                    <span className="text-sm font-medium">{item}</span>
                  </label>
                ))}
              </div>
              <DialogFooter showCloseButton>
                <Button>저장</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </ExampleSection>
    </div>
  )
}
