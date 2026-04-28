"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { loginSchema, registerSchema, LoginFormValues, RegisterFormValues } from "@/lib/validations"

function ExampleSection({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="mb-1 text-lg font-semibold">{title}</h2>
      {description && <p className="mb-4 text-sm text-muted-foreground">{description}</p>}
      {children}
    </section>
  )
}

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) })

  const onSubmit = async (data: LoginFormValues) => {
    await new Promise((r) => setTimeout(r, 800))
    console.log(data)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
          <Check className="size-6 text-primary" />
        </div>
        <p className="font-medium">로그인 성공!</p>
        <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
          다시 시도
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="login-email">이메일</Label>
        <Input
          id="login-email"
          type="email"
          placeholder="name@example.com"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="login-password">비밀번호</Label>
        <div className="relative">
          <Input
            id="login-password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            aria-invalid={!!errors.password}
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
        {errors.password && (
          <p className="text-xs text-destructive">{errors.password.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "로그인 중..." : "로그인"}
      </Button>
    </form>
  )
}

function RegisterForm() {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema) })

  const onSubmit = async (data: RegisterFormValues) => {
    await new Promise((r) => setTimeout(r, 800))
    console.log(data)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
          <Check className="size-6 text-primary" />
        </div>
        <p className="font-medium">회원가입 완료!</p>
        <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
          다시 시도
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="reg-name">이름</Label>
        <Input
          id="reg-name"
          placeholder="홍길동"
          aria-invalid={!!errors.name}
          {...register("name")}
        />
        {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="reg-email">이메일</Label>
        <Input
          id="reg-email"
          type="email"
          placeholder="name@example.com"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="reg-password">비밀번호</Label>
          <Input
            id="reg-password"
            type="password"
            placeholder="••••••••"
            aria-invalid={!!errors.password}
            {...register("password")}
          />
          {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="reg-confirm">비밀번호 확인</Label>
          <Input
            id="reg-confirm"
            type="password"
            placeholder="••••••••"
            aria-invalid={!!errors.confirmPassword}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
          )}
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "처리 중..." : "회원가입"}
      </Button>
    </form>
  )
}

const STEPS = ["개인정보", "계정설정", "확인"]

function MultiStepForm() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({ name: "", email: "", role: "", newsletter: false })
  const [done, setDone] = useState(false)

  const progress = ((step + 1) / STEPS.length) * 100

  if (done) {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
          <Check className="size-6 text-primary" />
        </div>
        <p className="font-medium">제출 완료!</p>
        <pre className="rounded-lg bg-muted p-3 text-left text-xs">{JSON.stringify(formData, null, 2)}</pre>
        <Button variant="outline" size="sm" onClick={() => { setStep(0); setDone(false); setFormData({ name: "", email: "", role: "", newsletter: false }) }}>
          처음부터
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          {STEPS.map((s, i) => (
            <span key={s} className={i <= step ? "font-medium text-foreground" : "text-muted-foreground"}>
              {i + 1}. {s}
            </span>
          ))}
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {step === 0 && (
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label>이름</Label>
            <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="홍길동" />
          </div>
          <div className="space-y-1.5">
            <Label>이메일</Label>
            <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="name@example.com" />
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label>역할</Label>
            <Select value={formData.role} onValueChange={(v) => setFormData({ ...formData, role: v })}>
              <SelectTrigger>
                <SelectValue placeholder="역할 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="developer">개발자</SelectItem>
                <SelectItem value="designer">디자이너</SelectItem>
                <SelectItem value="manager">매니저</SelectItem>
                <SelectItem value="other">기타</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-3">
            <Switch
              id="newsletter"
              checked={formData.newsletter}
              onCheckedChange={(v) => setFormData({ ...formData, newsletter: v })}
            />
            <Label htmlFor="newsletter">뉴스레터 구독</Label>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="mb-3 text-sm font-medium">입력 정보 확인</p>
          <dl className="space-y-2 text-sm">
            <div className="flex gap-2"><dt className="w-20 text-muted-foreground">이름</dt><dd>{formData.name || "—"}</dd></div>
            <div className="flex gap-2"><dt className="w-20 text-muted-foreground">이메일</dt><dd>{formData.email || "—"}</dd></div>
            <div className="flex gap-2"><dt className="w-20 text-muted-foreground">역할</dt><dd>{formData.role || "—"}</dd></div>
            <div className="flex gap-2"><dt className="w-20 text-muted-foreground">뉴스레터</dt><dd>{formData.newsletter ? "구독" : "미구독"}</dd></div>
          </dl>
        </div>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep((s) => s - 1)} disabled={step === 0}>
          이전
        </Button>
        {step < STEPS.length - 1 ? (
          <Button onClick={() => setStep((s) => s + 1)}>다음</Button>
        ) : (
          <Button onClick={() => setDone(true)}>제출</Button>
        )}
      </div>
    </div>
  )
}

export default function FormsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">폼</h1>
        <p className="mt-1 text-muted-foreground">
          react-hook-form + zod를 활용한 폼 유효성 검사 패턴입니다.
        </p>
      </div>

      <ExampleSection title="로그인 폼" description="loginSchema(zod)로 이메일/비밀번호를 검증합니다.">
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle className="text-base">로그인</CardTitle>
            <CardDescription>계정에 로그인하세요</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </ExampleSection>

      <ExampleSection title="회원가입 폼" description="registerSchema로 비밀번호 일치 여부까지 검증합니다.">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-base">회원가입</CardTitle>
            <CardDescription>새 계정을 만드세요</CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
        </Card>
      </ExampleSection>

      <ExampleSection title="다양한 입력 컴포넌트" description="shadcn/ui 폼 관련 컴포넌트 모음입니다.">
        <Card className="max-w-md">
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-1.5">
              <Label>기본 Input</Label>
              <Input placeholder="텍스트를 입력하세요" />
            </div>
            <div className="space-y-1.5">
              <Label>Textarea</Label>
              <Textarea placeholder="여러 줄 텍스트를 입력하세요" rows={3} />
            </div>
            <div className="space-y-1.5">
              <Label>Select</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">옵션 1</SelectItem>
                  <SelectItem value="option2">옵션 2</SelectItem>
                  <SelectItem value="option3">옵션 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Checkbox</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox id="check1" />
                  <Label htmlFor="check1" className="font-normal">이용약관에 동의합니다</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="check2" defaultChecked />
                  <Label htmlFor="check2" className="font-normal">마케팅 수신에 동의합니다</Label>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Switch</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Switch id="switch1" />
                  <Label htmlFor="switch1" className="font-normal">알림 활성화</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Switch id="switch2" defaultChecked />
                  <Label htmlFor="switch2" className="font-normal">다크 모드</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </ExampleSection>

      <ExampleSection title="멀티스텝 폼" description="단계별 입력을 Progress로 시각화합니다.">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-base">회원 정보 등록</CardTitle>
            <CardDescription>3단계로 정보를 입력합니다</CardDescription>
          </CardHeader>
          <CardContent>
            <MultiStepForm />
          </CardContent>
        </Card>
      </ExampleSection>
    </div>
  )
}
