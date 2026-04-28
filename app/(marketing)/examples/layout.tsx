"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const exampleNavGroups = [
  {
    title: "기본 UI",
    items: [
      { title: "버튼", href: "/examples/buttons" },
      { title: "카드", href: "/examples/cards" },
      { title: "타이포그래피", href: "/examples/typography" },
    ],
  },
  {
    title: "폼",
    items: [{ title: "폼 컴포넌트", href: "/examples/forms" }],
  },
  {
    title: "레이아웃",
    items: [{ title: "레이아웃 패턴", href: "/examples/layouts" }],
  },
  {
    title: "인터랙션",
    items: [
      { title: "모달/다이얼로그", href: "/examples/modals" },
      { title: "피드백", href: "/examples/feedback" },
    ],
  },
  {
    title: "데이터",
    items: [{ title: "테이블", href: "/examples/tables" }],
  },
  {
    title: "훅",
    items: [{ title: "커스텀 훅", href: "/examples/hooks" }],
  },
]

export default function ExamplesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-6xl gap-0 px-4 py-8 md:px-6">
      {/* 사이드바 */}
      <aside className="hidden w-52 shrink-0 md:block">
        <nav className="sticky top-24 flex flex-col gap-6">
          {exampleNavGroups.map((group) => (
            <div key={group.title}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {group.title}
              </p>
              <ul className="flex flex-col gap-1">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-muted hover:text-foreground",
                        pathname === item.href
                          ? "bg-muted font-medium text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* 모바일 상단 네비게이션 */}
      <div className="mb-6 block w-full md:hidden">
        <div className="flex flex-wrap gap-2">
          {exampleNavGroups.flatMap((g) => g.items).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full border px-3 py-1 text-xs transition-colors",
                pathname === item.href
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              )}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>

      {/* 콘텐츠 영역 */}
      <main className="min-w-0 flex-1 md:pl-10">{children}</main>
    </div>
  )
}
