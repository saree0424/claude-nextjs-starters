import Link from "next/link"
import { Zap } from "lucide-react"
import { siteConfig } from "@/lib/constants"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  iconOnly?: boolean
}

export function Logo({ className, iconOnly = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2 font-bold", className)}
    >
      <Zap className="size-5 text-primary" />
      {!iconOnly && (
        <span className="text-foreground">{siteConfig.name}</span>
      )}
    </Link>
  )
}
