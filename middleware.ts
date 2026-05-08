// ============================================================
// 라우트 보호 미들웨어 템플릿
// ============================================================
//
// 사용 중인 인증 라이브러리에 맞는 블록의 주석을 해제하세요.
// 한 번에 하나의 블록만 활성화해야 합니다.
//
// 보호 대상 경로: /dashboard/**
// 미인증 사용자 리다이렉트: /login
// ============================================================

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// ──────────────────────────────────────────────────────────
// [옵션 1] 직접 구현 — 쿠키/토큰 기반 세션 체크
//   특정 auth 라이브러리 없이 직접 세션 토큰을 검증할 때 사용합니다.
// ──────────────────────────────────────────────────────────
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 보호할 경로 패턴 — 필요에 따라 추가하세요
  const isProtectedRoute = pathname.startsWith("/dashboard")

  if (isProtectedRoute) {
    // 세션 쿠키 이름은 사용 중인 auth 라이브러리에 맞게 변경하세요
    const sessionToken =
      request.cookies.get("next-auth.session-token") ?? // Next-Auth v4
      request.cookies.get("authjs.session-token") ??    // Auth.js (Next-Auth v5)
      request.cookies.get("session")                    // 직접 구현

    if (!sessionToken) {
      const loginUrl = new URL("/login", request.url)
      // 로그인 후 원래 페이지로 돌아오도록 callbackUrl 전달
      loginUrl.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

// ──────────────────────────────────────────────────────────
// [옵션 2] Next-Auth v5 (Auth.js)
//   설치: pnpm add next-auth@beta
//   lib/auth.ts 에서 export { auth as middleware } 하거나 아래처럼 래핑하세요.
// ──────────────────────────────────────────────────────────
// import { auth } from "@/lib/auth"
//
// export default auth((req) => {
//   if (!req.auth && req.nextUrl.pathname.startsWith("/dashboard")) {
//     const loginUrl = new URL("/login", req.url)
//     loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname)
//     return NextResponse.redirect(loginUrl)
//   }
// })

// ──────────────────────────────────────────────────────────
// [옵션 3] Clerk
//   설치: pnpm add @clerk/nextjs
//   clerkMiddleware가 자동으로 세션을 처리합니다.
// ──────────────────────────────────────────────────────────
// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
//
// const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"])
//
// export default clerkMiddleware(async (auth, req) => {
//   if (isProtectedRoute(req)) await auth.protect()
// })

// ──────────────────────────────────────────────────────────
// [옵션 4] Supabase Auth Helpers
//   설치: pnpm add @supabase/auth-helpers-nextjs @supabase/supabase-js
// ──────────────────────────────────────────────────────────
// import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
//
// export async function middleware(req: NextRequest) {
//   const res = NextResponse.next()
//   const supabase = createMiddlewareClient({ req, res })
//   const { data: { session } } = await supabase.auth.getSession()
//
//   if (!session && req.nextUrl.pathname.startsWith("/dashboard")) {
//     return NextResponse.redirect(new URL("/login", req.url))
//   }
//   return res
// }

// ============================================================
// matcher: 미들웨어를 실행할 경로를 지정합니다.
// 정적 파일(_next/static, favicon 등)은 제외합니다.
// ============================================================
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
