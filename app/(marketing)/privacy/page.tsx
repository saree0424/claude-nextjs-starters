// 개인정보처리방침 페이지 - 법적 문서 형태의 서버 컴포넌트
// 참조: 목차 앵커 링크, 법적 문서 레이아웃, 섹션 ID를 활용한 내부 링크 구성 예시

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// 개인정보처리방침 섹션 타입 정의
interface PrivacySection {
  id: string        // 앵커 링크용 ID
  title: string     // 섹션 제목
  content: string   // 섹션 본문
  items?: string[]  // 항목 목록 (선택)
}

// 개인정보처리방침 섹션 데이터
const sections: PrivacySection[] = [
  {
    id: "collected-info",
    title: "1. 수집하는 개인정보",
    content:
      "StarterKit(이하 '회사')은 서비스 제공을 위해 최소한의 개인정보를 수집합니다. 수집하는 개인정보의 항목은 다음과 같습니다.",
    items: [
      "필수 항목: 이름, 이메일 주소, 비밀번호(암호화 저장)",
      "선택 항목: 프로필 사진, 전화번호, 회사명",
      "자동 수집 항목: IP 주소, 접속 일시, 서비스 이용 기록, 기기 정보",
    ],
  },
  {
    id: "purpose",
    title: "2. 개인정보의 이용 목적",
    content: "수집한 개인정보는 다음의 목적으로만 이용합니다.",
    items: [
      "회원 가입 및 서비스 이용 계약 이행",
      "서비스 제공 및 개선, 신규 서비스 개발",
      "고객 지원 및 민원 처리",
      "서비스 이용 분석 및 통계",
      "법령 준수 및 규제 요건 충족",
    ],
  },
  {
    id: "retention",
    title: "3. 개인정보의 보유 및 이용기간",
    content:
      "회사는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 즉시 파기합니다. 단, 관련 법령에 따라 보존이 필요한 경우에는 아래와 같이 보관합니다.",
    items: [
      "계약 또는 청약철회 등에 관한 기록: 5년 (전자상거래 등에서의 소비자 보호에 관한 법률)",
      "소비자 불만 또는 분쟁처리에 관한 기록: 3년",
      "접속에 관한 기록: 3개월 (통신비밀보호법)",
    ],
  },
  {
    id: "third-party",
    title: "4. 개인정보의 제3자 제공",
    content:
      "회사는 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다. 단, 아래의 경우에는 예외적으로 제공할 수 있습니다.",
    items: [
      "이용자가 사전에 동의한 경우",
      "법령의 규정에 의거하거나 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우",
      "서비스 제공을 위해 불가피하게 필요한 경우로서 최소한의 정보만 제공하는 경우",
    ],
  },
  {
    id: "rights",
    title: "5. 이용자의 권리",
    content: "이용자는 언제든지 다음의 권리를 행사할 수 있습니다.",
    items: [
      "개인정보 열람 및 조회 요청",
      "개인정보 정정 및 수정 요청",
      "개인정보 삭제 요청 (단, 법령에서 보관을 요구하는 경우 제외)",
      "개인정보 처리 정지 요청",
      "개인정보 이동 요청",
    ],
  },
  {
    id: "contact",
    title: "6. 개인정보 보호 책임자 및 문의처",
    content:
      "개인정보 처리와 관련한 문의, 불만, 피해구제 등의 사항은 아래의 담당부서에 연락해 주시기 바랍니다.",
    items: [
      "개인정보 보호 책임자: 김민준 (CEO)",
      "이메일: privacy@starterkit.dev",
      "전화: +82 (02) 1234-5678",
      "처리 기간: 접수 후 10일 이내",
    ],
  },
]

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:px-6">
      {/* 페이지 헤더 */}
      <div className="mb-10">
        <Badge variant="secondary" className="mb-4">법적 고지</Badge>
        <h1 className="mb-4 text-4xl font-bold tracking-tight">개인정보처리방침</h1>
        {/* 최종 업데이트 날짜 */}
        <p className="text-sm text-muted-foreground">
          최종 업데이트: 2024년 12월 1일 | 시행일: 2024년 12월 1일
        </p>
      </div>

      {/* 개요 설명 */}
      <Card className="mb-8 bg-muted/50">
        <CardContent className="pt-5">
          <p className="text-sm text-muted-foreground leading-relaxed">
            StarterKit(이하 &quot;회사&quot;)은 개인정보 보호법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등
            관련 법령에 따라 이용자의 개인정보를 보호하고 있습니다. 본 개인정보처리방침은 회사가
            제공하는 서비스 이용 과정에서 수집되는 개인정보의 처리 방침을 안내합니다.
          </p>
        </CardContent>
      </Card>

      {/* 목차 카드 - 앵커 링크 내비게이션 */}
      <Card className="mb-10">
        <CardContent className="pt-5">
          <h2 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">목차</h2>
          <ul className="space-y-1">
            {sections.map((section) => (
              <li key={section.id}>
                {/* 앵커 링크로 해당 섹션으로 이동 */}
                <a
                  href={`#${section.id}`}
                  className="text-sm text-primary hover:underline"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Separator className="mb-10" />

      {/* 개인정보처리방침 본문 섹션들 */}
      <div className="space-y-10">
        {sections.map((section, index) => (
          <section key={section.id} id={section.id}>
            {/* 섹션 제목 - id 속성으로 앵커 링크 타겟 */}
            <h2 className="mb-3 text-xl font-bold">{section.title}</h2>
            <p className="mb-3 text-muted-foreground leading-relaxed">{section.content}</p>
            {/* 항목 목록 */}
            {section.items && (
              <ul className="space-y-1.5">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {/* 마지막 섹션 제외하고 구분선 추가 */}
            {index < sections.length - 1 && <Separator className="mt-8" />}
          </section>
        ))}
      </div>

      {/* 하단 고지 */}
      <div className="mt-12 rounded-lg bg-muted p-6 text-center">
        <p className="text-sm text-muted-foreground">
          본 개인정보처리방침은 법령 또는 회사 정책의 변경에 따라 수정될 수 있습니다.
          변경 사항은 시행 7일 전에 서비스 내 공지사항을 통해 안내합니다.
        </p>
      </div>
    </div>
  )
}
