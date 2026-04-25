import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  FileText,
  Bell,
} from "lucide-react"
import { NavItem, NavGroup, SiteConfig } from "@/types"

export const siteConfig: SiteConfig = {
  name: "StarterKit",
  description: "Next.js 모던 웹 스타터킷 — 빠른 개발 시작을 위한 기반 템플릿",
  url: "https://example.com",
}

export const navLinks: NavItem[] = [
  { title: "홈", href: "/" },
  { title: "기능", href: "/#features" },
  { title: "통계", href: "/#stats" },
  { title: "대시보드", href: "/dashboard" },
]

export const dashboardNavGroups: NavGroup[] = [
  {
    title: "메인",
    items: [
      { title: "대시보드", href: "/dashboard", icon: LayoutDashboard },
      { title: "분석", href: "/dashboard/analytics", icon: BarChart3 },
      { title: "보고서", href: "/dashboard/reports", icon: FileText },
    ],
  },
  {
    title: "관리",
    items: [
      { title: "사용자", href: "/dashboard/users", icon: Users },
      { title: "알림", href: "/dashboard/notifications", icon: Bell },
      { title: "설정", href: "/dashboard/settings", icon: Settings },
    ],
  },
]
