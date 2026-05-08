"use client"

// 문의하기 페이지 - 연락처 정보와 문의 폼을 담은 클라이언트 컴포넌트
// 참조: Select, Textarea, Input을 활용한 폼 구성, 2열 레이아웃 예시
// "use client" 선언 이유: react-hook-form 상태 관리, Select Controller 필요

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { contactSchema, type ContactFormValues } from "@/lib/validations"

// 연락처 정보 타입 정의
interface ContactInfo {
  icon: React.ReactNode  // 아이콘
  label: string          // 라벨
  value: string          // 값
}

// 연락처 정보 데이터
const contactInfoItems: ContactInfo[] = [
  {
    icon: <Mail className="size-5 text-primary" />,
    label: "이메일",
    value: "hello@starterkit.dev",
  },
  {
    icon: <Phone className="size-5 text-primary" />,
    label: "전화",
    value: "+82 (02) 1234-5678",
  },
  {
    icon: <MapPin className="size-5 text-primary" />,
    label: "주소",
    value: "서울시 강남구 테헤란로 123, 스타터빌딩 10층",
  },
  {
    icon: <Clock className="size-5 text-primary" />,
    label: "영업시간",
    value: "평일 오전 9시 ~ 오후 6시 (KST)",
  },
]

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormValues) => {
    // TODO: 실제 API 연동으로 교체 (예: await sendContactEmail(data))
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("문의 접수:", data)
    toast.success("문의가 접수되었습니다. 빠른 시간 내에 답변 드리겠습니다.")
    setIsSubmitted(true)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      {/* 페이지 헤더 */}
      <div className="mb-12 text-center">
        <Badge variant="secondary" className="mb-4">문의하기</Badge>
        <h1 className="mb-4 text-4xl font-bold tracking-tight">무엇이든 물어보세요</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          서비스 이용 중 궁금한 점이 있으시면 언제든지 문의해 주세요.
          빠른 시간 내에 답변 드리겠습니다.
        </p>
      </div>

      {/* 2열 레이아웃: 연락처 정보 + 문의 폼 */}
      <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
        {/* 좌측: 연락처 정보 */}
        <div className="space-y-6">
          <div>
            <h2 className="mb-4 text-xl font-semibold">연락처 정보</h2>
            <div className="space-y-4">
              {contactInfoItems.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-md bg-muted p-1.5">{item.icon}</div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">{item.label}</p>
                    <p className="text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* 추가 안내 */}
          <Card className="bg-muted/50">
            <CardContent className="pt-5">
              <h3 className="mb-2 font-semibold">빠른 응답을 원하신다면</h3>
              <p className="text-sm text-muted-foreground">
                기술 지원의 경우 문의 유형을 <strong>&quot;기술 지원&quot;</strong>으로 선택해 주시면
                우선적으로 처리됩니다. 평균 응답 시간은 2~4시간입니다.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 우측: 문의 폼 */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">문의 보내기</h2>
          </CardHeader>
          <CardContent>
            {/* 제출 완료 메시지 */}
            {isSubmitted ? (
              <div className="py-8 text-center">
                <div className="mb-3 flex justify-center">
                  <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
                    <Send className="size-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <h3 className="mb-2 font-semibold">문의가 접수되었습니다!</h3>
                <p className="text-sm text-muted-foreground">
                  빠른 시간 내에 이메일로 답변 드리겠습니다.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setIsSubmitted(false)}
                >
                  새 문의하기
                </Button>
              </div>
            ) : (
              // 문의 폼 — react-hook-form + zod 검증
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                {/* 이름과 이메일 - 2열 배치 */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">이름 *</Label>
                    <Input id="name" placeholder="홍길동" {...register("name")} />
                    {errors.name && (
                      <p className="text-xs text-destructive">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">이메일 *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="hong@example.com"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* 문의 유형 Select — shadcn Select는 Controller로 연동 */}
                <div className="space-y-2">
                  <Label htmlFor="inquiry-type">문의 유형 *</Label>
                  <Controller
                    name="inquiryType"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger id="inquiry-type">
                          <SelectValue placeholder="문의 유형을 선택해 주세요" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">일반 문의</SelectItem>
                          <SelectItem value="technical">기술 지원</SelectItem>
                          <SelectItem value="billing">결제 문의</SelectItem>
                          <SelectItem value="partnership">파트너십</SelectItem>
                          <SelectItem value="other">기타</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.inquiryType && (
                    <p className="text-xs text-destructive">{errors.inquiryType.message}</p>
                  )}
                </div>

                {/* 제목 */}
                <div className="space-y-2">
                  <Label htmlFor="subject">제목 *</Label>
                  <Input
                    id="subject"
                    placeholder="문의 제목을 입력해 주세요"
                    {...register("subject")}
                  />
                  {errors.subject && (
                    <p className="text-xs text-destructive">{errors.subject.message}</p>
                  )}
                </div>

                {/* 메시지 Textarea */}
                <div className="space-y-2">
                  <Label htmlFor="message">메시지 *</Label>
                  <Textarea
                    id="message"
                    placeholder="문의 내용을 자세히 작성해 주세요..."
                    className="min-h-32 resize-none"
                    {...register("message")}
                  />
                  {errors.message && (
                    <p className="text-xs text-destructive">{errors.message.message}</p>
                  )}
                </div>

                {/* 제출 버튼 */}
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "전송 중..."
                  ) : (
                    <>
                      <Send className="mr-2 size-4" />
                      문의 보내기
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
