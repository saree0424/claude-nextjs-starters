@AGENTS.md

---

## 이 프로젝트에서 다른 것들 (코드 작성 전 필독)

- **Next.js 16**: 훈련 데이터와 다른 breaking changes 존재. 코드 작성 전 `node_modules/next/dist/docs/` 관련 가이드 확인
- **Tailwind CSS v4**: `tailwind.config.js` 없음. `@tailwindcss/postcss` 플러그인 방식. 테마 변수는 `app/globals.css`에서 `@theme` 블록으로 정의
- **React 19**: `use()` 훅, 개선된 Server Actions 등 새 패턴 사용 가능

---

## 개발 명령어

```bash
npm run dev      # 개발 서버
npm run build    # 프로덕션 빌드
npm run lint     # ESLint 검사
npx shadcn add [컴포넌트명]   # UI 컴포넌트 추가 (components/ui/ 에 생성됨)
```

---

## 파일 배치 규칙

- 새 마케팅 페이지 → `app/(marketing)/`
- 새 대시보드 페이지 → `app/(dashboard)/dashboard/`
- 마케팅 전용 컴포넌트 → `components/marketing/`
- 대시보드 전용 컴포넌트 → `components/dashboard/`
- 공통 컴포넌트 → `components/shared/`
- shadcn/ui 기본 컴포넌트 → `components/ui/` (직접 수정 가능)
- 커스텀 훅 → `hooks/`
- 공통 타입 → `types/index.ts`
- 전역 상수/설정 → `lib/constants.ts`
- Zod 스키마 → `lib/validations.ts` (에러 메시지는 한글로)

---

## 코드 규칙

**명명:**
- 파일명: `kebab-case` (예: `stats-cards.tsx`)
- 컴포넌트명: `PascalCase`, named export만 (`export function StatsCards() {}`)
- default export 사용 금지

**Import:**
```typescript
import { Button } from "@/components/ui/button"   // @/ 절대경로만
import type { NavItem } from "@/types"             // 타입은 import type
// 상대경로(../) 사용 금지
```

**스타일링:**
```typescript
className={cn("base", condition && "variant", className)}  // cn() + Tailwind
// 컴포넌트 변형은 CVA(class-variance-authority) 사용
```

**클라이언트/서버 컴포넌트:**
- 기본값: Server Component (레이아웃, 정적 페이지)
- `"use client"` 추가 조건: 훅 사용, 이벤트 핸들러, 브라우저 API

---

## 재사용 가능한 기존 유틸

**`lib/utils.ts`**: `cn()` — Tailwind 클래스 병합 (`clsx` + `tailwind-merge`)

**`hooks/`** (8개):
- `useAsync<T>` — 비동기 상태 관리 (loading/error/value)
- `useDebounce<T>` — 입력 디바운싱
- `useLocalStorage<T>` — 로컬스토리지 읽기/쓰기
- `useMobile` — 모바일 반응형 감지
- `useToggle` — boolean 토글
- `useWindowSize` — 뷰포트 크기
- `useClickOutside` — 외부 클릭 감지
- `useInterval` — 인터벌 타이머

**`lib/validations.ts`** (Zod 스키마): `loginSchema`, `registerSchema`, `changePasswordSchema`, `contactSchema`, `emailSchema`, `passwordSchema`

---

## 주의사항

- `middleware.ts`: `/dashboard/*` 인증 보호 코드가 주석 처리됨. 실제 배포 전 인증 구현 필요
- `.env`: `SLACK_WEBHOOK_URL` 실제 값 포함. 커밋 시 노출 주의 (`.gitignore` 확인)
