"use client"

// 알림 페이지 - Tabs 기반 알림 목록과 알림 설정으로 구성된 클라이언트 컴포넌트
// 참조: Tabs 컴포넌트 활용, Switch를 이용한 토글 설정, 알림 아이템 카드 레이아웃 예시
// "use client" 선언 이유: Tabs 상태, Switch 토글 상태 관리 필요

import { useState } from "react"
import {
  AlertCircle,
  Bell,
  CheckCircle2,
  Info,
  Settings,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/layout/dashboard-header"

// 알림 타입 정의
type NotificationType = "info" | "warning" | "success" | "error"

// 알림 데이터 인터페이스
interface Notification {
  id: string              // 알림 고유 ID
  type: NotificationType  // 알림 유형
  title: string           // 알림 제목
  message: string         // 알림 내용
  time: string            // 발생 시간
  read: boolean           // 읽음 여부
  important: boolean      // 중요 여부
}

// 알림 설정 항목 인터페이스
interface NotificationSetting {
  id: string    // 설정 ID
  label: string // 설정 이름
  description: string // 설정 설명
}

// 샘플 알림 데이터
const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "success",
    title: "배포 완료",
    message: "프로덕션 서버에 v2.1.0이 성공적으로 배포되었습니다.",
    time: "5분 전",
    read: false,
    important: true,
  },
  {
    id: "2",
    type: "warning",
    title: "디스크 사용량 경고",
    message: "서버 디스크 사용량이 85%를 초과했습니다. 용량 확보가 필요합니다.",
    time: "1시간 전",
    read: false,
    important: true,
  },
  {
    id: "3",
    type: "info",
    title: "새로운 팀원 초대",
    message: "박도윤님이 팀에 합류했습니다.",
    time: "3시간 전",
    read: false,
    important: false,
  },
  {
    id: "4",
    type: "error",
    title: "결제 처리 실패",
    message: "주문 #4892의 결제가 실패했습니다. 고객에게 안내가 필요합니다.",
    time: "어제",
    read: true,
    important: true,
  },
  {
    id: "5",
    type: "success",
    title: "보고서 생성 완료",
    message: "11월 월간 보고서가 생성되었습니다. 다운로드할 수 있습니다.",
    time: "어제",
    read: true,
    important: false,
  },
  {
    id: "6",
    type: "info",
    title: "시스템 점검 예정",
    message: "12월 20일 새벽 2시~4시에 정기 시스템 점검이 예정되어 있습니다.",
    time: "2일 전",
    read: true,
    important: false,
  },
]

// 알림 설정 항목 데이터
const notificationSettings: NotificationSetting[] = [
  { id: "deploy", label: "배포 알림", description: "서버 배포 완료/실패 시 알림" },
  { id: "security", label: "보안 알림", description: "비정상적인 로그인 감지 시 알림" },
  { id: "billing", label: "결제 알림", description: "결제 처리 성공/실패 시 알림" },
  { id: "team", label: "팀 알림", description: "새 팀원 초대 및 역할 변경 시 알림" },
  { id: "report", label: "보고서 알림", description: "보고서 생성 완료 시 알림" },
  { id: "system", label: "시스템 알림", description: "점검, 업데이트 등 공지 알림" },
]

// 알림 유형별 아이콘 및 색상 매핑
const notificationStyle: Record<NotificationType, { icon: React.ReactNode; color: string }> = {
  info: { icon: <Info className="size-5" />, color: "text-blue-500" },
  warning: { icon: <AlertCircle className="size-5" />, color: "text-yellow-500" },
  success: { icon: <CheckCircle2 className="size-5" />, color: "text-green-500" },
  error: { icon: <AlertCircle className="size-5" />, color: "text-red-500" },
}

// 개별 알림 아이템 컴포넌트
function NotificationItem({
  notification,
  onMarkRead,
}: {
  notification: Notification
  onMarkRead: (id: string) => void
}) {
  const style = notificationStyle[notification.type]

  return (
    <div
      className={`flex items-start gap-4 rounded-lg p-4 transition-colors ${
        !notification.read ? "bg-muted/50" : ""
      }`}
    >
      {/* 알림 유형 아이콘 */}
      <div className={`mt-0.5 shrink-0 ${style.color}`}>{style.icon}</div>

      {/* 알림 내용 */}
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">{notification.title}</p>
          {/* 읽지 않은 알림 표시 */}
          {!notification.read && (
            <span className="size-2 rounded-full bg-primary" />
          )}
          {notification.important && (
            <Badge variant="outline" className="text-xs">중요</Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{notification.message}</p>
        <p className="text-xs text-muted-foreground">{notification.time}</p>
      </div>

      {/* 읽음 처리 버튼 */}
      {!notification.read && (
        <Button
          variant="ghost"
          size="sm"
          className="shrink-0 text-xs"
          onClick={() => onMarkRead(notification.id)}
        >
          읽음
        </Button>
      )}
    </div>
  )
}

export default function NotificationsPage() {
  // 알림 목록 상태 관리
  const [notifications, setNotifications] = useState(initialNotifications)
  // 알림 설정 토글 상태 (모든 설정 기본 활성화)
  const [settings, setSettings] = useState<Record<string, boolean>>(
    Object.fromEntries(notificationSettings.map((s) => [s.id, true]))
  )

  // 특정 알림 읽음 처리
  const handleMarkRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  // 모든 알림 읽음 처리
  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  // 읽지 않은 알림 수 계산
  const unreadCount = notifications.filter((n) => !n.read).length
  // 중요 알림 필터링
  const importantNotifications = notifications.filter((n) => n.important)

  return (
    <>
      {/* 브레드크럼: 대시보드 > 알림 */}
      <DashboardHeader breadcrumbs={[{ title: "알림" }]} />

      <div className="flex flex-1 flex-col gap-6 p-6">
        {/* 페이지 제목 + 모두 읽음 버튼 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight">알림</h1>
            {unreadCount > 0 && (
              <Badge>{unreadCount}개 미읽음</Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={handleMarkAllRead}>
              모두 읽음으로 표시
            </Button>
          )}
        </div>

        {/* Tabs: 전체 / 읽지않음 / 중요 */}
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">
              전체 ({notifications.length})
            </TabsTrigger>
            <TabsTrigger value="unread">
              읽지 않음 ({unreadCount})
            </TabsTrigger>
            <TabsTrigger value="important">
              중요 ({importantNotifications.length})
            </TabsTrigger>
          </TabsList>

          {/* 전체 알림 탭 */}
          <TabsContent value="all" className="mt-4">
            <Card>
              <CardContent className="divide-y p-0">
                {notifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkRead={handleMarkRead}
                  />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* 읽지 않은 알림 탭 */}
          <TabsContent value="unread" className="mt-4">
            <Card>
              <CardContent className="divide-y p-0">
                {notifications.filter((n) => !n.read).length > 0 ? (
                  notifications
                    .filter((n) => !n.read)
                    .map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onMarkRead={handleMarkRead}
                      />
                    ))
                ) : (
                  <div className="py-8 text-center text-sm text-muted-foreground">
                    읽지 않은 알림이 없습니다.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* 중요 알림 탭 */}
          <TabsContent value="important" className="mt-4">
            <Card>
              <CardContent className="divide-y p-0">
                {importantNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkRead={handleMarkRead}
                  />
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Separator />

        {/* 알림 수신 설정 섹션 */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Settings className="size-5 text-muted-foreground" />
              <div>
                <CardTitle>알림 설정</CardTitle>
                <CardDescription>받고 싶은 알림 유형을 설정합니다.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* 이메일 수신 전체 토글 */}
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-2">
                  <Bell className="size-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">이메일 알림</p>
                    <p className="text-sm text-muted-foreground">모든 알림을 이메일로 수신</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              {/* 개별 알림 설정 토글 목록 */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">알림 유형별 설정</p>
                {notificationSettings.map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between">
                    <div>
                      <Label htmlFor={setting.id} className="font-medium">
                        {setting.label}
                      </Label>
                      <p className="text-xs text-muted-foreground">{setting.description}</p>
                    </div>
                    <Switch
                      id={setting.id}
                      checked={settings[setting.id]}
                      onCheckedChange={(checked) =>
                        setSettings((prev) => ({ ...prev, [setting.id]: checked }))
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
