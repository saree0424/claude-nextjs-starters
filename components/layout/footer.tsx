import Link from "next/link"
import { Code2, Globe } from "lucide-react"
import { Logo } from "@/components/shared/logo"
import { siteConfig } from "@/lib/constants"

const footerLinks = [
  {
    title: "서비스",
    items: [
      { title: "기능", href: "/#features" },
      { title: "가격", href: "/pricing" },
      { title: "대시보드", href: "/dashboard" },
    ],
  },
  {
    title: "회사",
    items: [
      { title: "소개", href: "/about" },
      { title: "블로그", href: "/blog" },
      { title: "채용", href: "/careers" },
    ],
  },
  {
    title: "지원",
    items: [
      { title: "문서", href: "/docs" },
      { title: "문의하기", href: "/contact" },
      { title: "개인정보처리방침", href: "/privacy" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* 브랜드 */}
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              {siteConfig.description}
            </p>
            <div className="flex gap-3">
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Code2 className="size-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Globe className="size-5" />
                <span className="sr-only">Website</span>
              </Link>
            </div>
          </div>

          {/* 링크 그룹 */}
          {footerLinks.map((group) => (
            <div key={group.title} className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold">{group.title}</h3>
              <ul className="flex flex-col gap-2">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
