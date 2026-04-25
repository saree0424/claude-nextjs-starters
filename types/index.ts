import { LucideIcon } from "lucide-react"

export interface SiteConfig {
  name: string
  description: string
  url: string
}

export interface NavItem {
  title: string
  href: string
  disabled?: boolean
  external?: boolean
  icon?: LucideIcon
  label?: string
}

export interface NavGroup {
  title: string
  items: NavItem[]
}

export interface DashboardCard {
  title: string
  value: string
  change: string
  changeType: "increase" | "decrease"
  icon: LucideIcon
}
