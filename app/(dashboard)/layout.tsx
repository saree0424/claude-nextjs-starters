// ============================================================
// ⚠️  인증 보호 필수 — 실서비스 전환 전 반드시 구현하세요
// ============================================================
//
// 현재 이 레이아웃은 인증 없이 /dashboard 전체를 공개합니다.
// 아래 두 가지 방법 중 하나를 선택해 적용하세요.
//
// ──────────────────────────────────────────────────────────
// [방법 A] middleware.ts 사용 (권장) — 프로젝트 루트의 middleware.ts 참고
//   가장 효율적입니다. 이 파일은 수정 없이 그대로 두고,
//   middleware.ts에서 /dashboard/** 경로를 보호하면 됩니다.
//
// [방법 B] 이 레이아웃에서 서버사이드 세션 체크
//   아래 주석을 해제하고 사용 중인 auth 라이브러리에 맞게 수정하세요.
// ──────────────────────────────────────────────────────────
//
// ▼ Next-Auth v5 (Auth.js) 예시
// import { auth } from "@/lib/auth"
// import { redirect } from "next/navigation"
//
// export default async function DashboardLayout({ children }) {
//   const session = await auth()
//   if (!session) redirect("/login")
//   ...
// }
//
// ▼ Clerk 예시
// import { auth } from "@clerk/nextjs/server"
// import { redirect } from "next/navigation"
//
// export default async function DashboardLayout({ children }) {
//   const { userId } = await auth()
//   if (!userId) redirect("/sign-in")
//   ...
// }
//
// ▼ Supabase 예시
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
// import { cookies } from "next/headers"
// import { redirect } from "next/navigation"
//
// export default async function DashboardLayout({ children }) {
//   const supabase = createServerComponentClient({ cookies })
//   const { data: { session } } = await supabase.auth.getSession()
//   if (!session) redirect("/login")
//   ...
// }
// ============================================================

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // TODO: 방법 A(middleware.ts) 또는 방법 B(위 주석)로 인증 게이트를 추가하세요
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
