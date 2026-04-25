"use client"

// 설정 페이지 - Tabs 기반 4개 섹션(프로필/보안/알림/연동)으로 구성된 클라이언트 컴포넌트
// 참조: Tabs 멀티 섹션 레이아웃, Switch 토글 그리드, 외부 서비스 연동 카드 패턴 예시
// "use client" 선언 이유: Tabs 상태, Switch 토글, 폼 입력 상태 관리 필요

import { useState } from "react"
import {
  Bell,
  Code2,
  Globe,
  Key,
  Lock,
  Monitor,
  Shield,
  Smartphone,
  User,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { DashboardHeader } from "@/components/layout/dashboard-header"

// 활성 세션 타입 정의
interface ActiveSession {
  id: string      // 세션 ID
  device: string  // 기기명
  location: string // 접속 위치
  ip: string      // IP 주소
  lastActive: string // 마지막 활동 시간
  current: boolean   // 현재 세션 여부
}

// 외부 서비스 연동 타입 정의
interface Integration {
  id: string            // 서비스 ID
  name: string          // 서비스 이름
  description: string   // 서비스 설명
  icon: React.ReactNode // 서비스 아이콘
  connected: boolean    // 연동 여부
}

// 알림 설정 항목 타입 정의
interface NotificationRow {
  label: string   // 알림 이름
  email: boolean  // 이메일 수신 여부
  app: boolean    // 앱 알림 여부
}

// 활성 세션 데이터
const activeSessions: ActiveSession[] = [
  {
    id: "1",
    device: "Chrome on MacBook Pro",
    location: "서울, 대한민국",
    ip: "125.143.x.x",
    lastActive: "현재 접속 중",
    current: true,
  },
  {
    id: "2",
    device: "Safari on iPhone 15",
    location: "서울, 대한민국",
    ip: "125.143.x.x",
    lastActive: "1시간 전",
    current: false,
  },
  {
    id: "3",
    device: "Chrome on Windows PC",
    location: "부산, 대한민국",
    ip: "211.234.x.x",
    lastActive: "3일 전",
    current: false,
  },
]

// 외부 서비스 연동 데이터
const integrations: Integration[] = [
  {
    id: "github",
    name: "GitHub",
    description: "코드 저장소와 연동하여 배포를 자동화합니다.",
    icon: <Code2 className="size-5" />,
    connected: true,
  },
  {
    id: "google",
    name: "Google",
    description: "Google 계정으로 간편하게 로그인합니다.",
    icon: <Globe className="size-5" />,
    connected: false,
  },
  {
    id: "slack",
    name: "Slack",
    description: "팀 채널로 알림을 받고 협업을 강화합니다.",
    icon: <Monitor className="size-5" />,
    connected: true,
  },
]

// 알림 설정 초기 데이터
const initialNotificationRows: NotificationRow[] = [
  { label: "새 댓글", email: true, app: true },
  { label: "팀원 멘션", email: true, app: true },
  { label: "보고서 완료", email: true, app: false },
  { label: "결제 알림", email: true, app: true },
  { label: "시스템 점검", email: false, app: true },
  { label: "마케팅 소식", email: false, app: false },
]

export default function SettingsPage() {
  // 2단계 인증 활성화 상태
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  // 알림 설정 상태
  const [notificationRows, setNotificationRows] = useState(initialNotificationRows)
  // 외부 서비스 연동 상태
  const [integrationStates, setIntegrationStates] = useState<Record<string, boolean>>(
    Object.fromEntries(integrations.map((i) => [i.id, i.connected]))
  )

  // 알림 설정 토글 핸들러
  const toggleNotification = (index: number, field: "email" | "app") => {
    setNotificationRows((prev) =>
      prev.map((row, i) =>
        i === index ? { ...row, [field]: !row[field] } : row
      )
    )
  }

  // 서비스 연동 토글 핸들러
  const toggleIntegration = (id: string) => {
    setIntegrationStates((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <>
      {/* 브레드크럼: 대시보드 > 설정 */}
      <DashboardHeader breadcrumbs={[{ title: "설정" }]} />

      <div className="flex flex-1 flex-col gap-6 p-6">
        {/* 페이지 제목 */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">설정</h1>
          <p className="text-muted-foreground">계정 정보, 보안, 알림을 관리합니다.</p>
        </div>

        {/* Tabs: 프로필 / 보안 / 알림 / 연동 */}
        <Tabs defaultValue="profile">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-none lg:inline-flex">
            <TabsTrigger value="profile" className="flex items-center gap-1.5">
              <User className="size-4" />
              <span className="hidden sm:inline">프로필</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-1.5">
              <Lock className="size-4" />
              <span className="hidden sm:inline">보안</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-1.5">
              <Bell className="size-4" />
              <span className="hidden sm:inline">알림</span>
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center gap-1.5">
              <Globe className="size-4" />
              <span className="hidden sm:inline">연동</span>
            </TabsTrigger>
          </TabsList>

          {/* ---- 프로필 탭 ---- */}
          <TabsContent value="profile" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>프로필 정보</CardTitle>
                <CardDescription>다른 팀원에게 표시되는 내 정보를 수정합니다.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 프로필 이미지 섹션 */}
                <div className="flex items-center gap-4">
                  <Avatar className="size-16">
                    <AvatarFallback className="text-lg font-semibold">김민</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <Button variant="outline" size="sm">사진 변경</Button>
                    <p className="text-xs text-muted-foreground">JPG, PNG, GIF · 최대 5MB</p>
                  </div>
                </div>

                <Separator />

                {/* 기본 정보 폼 */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">이름</Label>
                    <Input id="firstName" defaultValue="민준" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">성</Label>
                    <Input id="lastName" defaultValue="김" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <Input id="email" type="email" defaultValue="minjun@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">직책</Label>
                  <Input id="jobTitle" defaultValue="CEO & 공동창업자" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">소개</Label>
                  <Textarea
                    id="bio"
                    defaultValue="10년간의 스타트업 경험을 바탕으로 혁신적인 솔루션을 만들어갑니다."
                    className="resize-none"
                    rows={3}
                  />
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button>변경사항 저장</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* ---- 보안 탭 ---- */}
          <TabsContent value="security" className="mt-6 space-y-6">
            {/* 비밀번호 변경 카드 */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Key className="size-5 text-muted-foreground" />
                  <div>
                    <CardTitle>비밀번호 변경</CardTitle>
                    <CardDescription>보안을 위해 주기적으로 비밀번호를 변경하세요.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">현재 비밀번호</Label>
                  <Input id="currentPassword" type="password" placeholder="현재 비밀번호 입력" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">새 비밀번호</Label>
                  <Input id="newPassword" type="password" placeholder="새 비밀번호 입력 (8자 이상)" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">새 비밀번호 확인</Label>
                  <Input id="confirmPassword" type="password" placeholder="새 비밀번호 재입력" />
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button>비밀번호 변경</Button>
              </CardFooter>
            </Card>

            {/* 2단계 인증 카드 */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="size-5 text-muted-foreground" />
                  <div>
                    <CardTitle>2단계 인증 (2FA)</CardTitle>
                    <CardDescription>계정 보안을 강화하기 위해 2단계 인증을 사용하세요.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="size-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">인증 앱 사용</p>
                      <p className="text-xs text-muted-foreground">
                        Google Authenticator 또는 Authy 앱을 사용합니다.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {twoFactorEnabled && (
                      <Badge variant="default" className="text-xs">활성화됨</Badge>
                    )}
                    <Switch
                      checked={twoFactorEnabled}
                      onCheckedChange={setTwoFactorEnabled}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 활성 세션 카드 */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Monitor className="size-5 text-muted-foreground" />
                  <div>
                    <CardTitle>활성 세션</CardTitle>
                    <CardDescription>현재 로그인된 기기를 확인하고 관리합니다.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {activeSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{session.device}</p>
                        {/* 현재 세션 표시 */}
                        {session.current && (
                          <Badge variant="secondary" className="text-xs">현재</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {session.location} · {session.ip}
                      </p>
                      <p className="text-xs text-muted-foreground">{session.lastActive}</p>
                    </div>
                    {/* 현재 세션이 아닌 경우 로그아웃 버튼 표시 */}
                    {!session.current && (
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        로그아웃
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="outline" className="text-destructive hover:text-destructive">
                  다른 모든 기기에서 로그아웃
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* ---- 알림 탭 ---- */}
          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>알림 설정</CardTitle>
                <CardDescription>유형별로 이메일 및 앱 알림 수신 여부를 설정합니다.</CardDescription>
              </CardHeader>
              <CardContent>
                {/* 알림 설정 헤더 */}
                <div className="mb-3 grid grid-cols-[1fr_80px_80px] items-center gap-4 text-sm font-medium text-muted-foreground">
                  <span>알림 유형</span>
                  <span className="text-center">이메일</span>
                  <span className="text-center">앱</span>
                </div>
                <Separator className="mb-3" />
                {/* 알림 설정 행 목록 */}
                <div className="space-y-3">
                  {notificationRows.map((row, index) => (
                    <div
                      key={row.label}
                      className="grid grid-cols-[1fr_80px_80px] items-center gap-4"
                    >
                      <span className="text-sm">{row.label}</span>
                      {/* 이메일 알림 토글 */}
                      <div className="flex justify-center">
                        <Switch
                          checked={row.email}
                          onCheckedChange={() => toggleNotification(index, "email")}
                        />
                      </div>
                      {/* 앱 알림 토글 */}
                      <div className="flex justify-center">
                        <Switch
                          checked={row.app}
                          onCheckedChange={() => toggleNotification(index, "app")}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button>설정 저장</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* ---- 연동 탭 ---- */}
          <TabsContent value="integrations" className="mt-6 space-y-4">
            <div className="mb-2">
              <p className="text-sm text-muted-foreground">
                외부 서비스를 연동하여 워크플로우를 자동화하세요.
              </p>
            </div>
            {/* 서비스 연동 카드 목록 */}
            {integrations.map((integration) => (
              <Card key={integration.id}>
                <CardContent className="pt-5">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {/* 서비스 아이콘 */}
                      <div className="rounded-lg bg-muted p-2">{integration.icon}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{integration.name}</p>
                          {/* 연동 상태 Badge */}
                          {integrationStates[integration.id] ? (
                            <Badge variant="default" className="text-xs">연동됨</Badge>
                          ) : (
                            <Badge variant="outline" className="text-xs">미연동</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{integration.description}</p>
                      </div>
                    </div>
                    {/* 연동/해제 버튼 */}
                    <Button
                      variant={integrationStates[integration.id] ? "outline" : "default"}
                      size="sm"
                      onClick={() => toggleIntegration(integration.id)}
                    >
                      {integrationStates[integration.id] ? "연동 해제" : "연동하기"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
