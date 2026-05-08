현재 변경사항을 분석하고 커밋을 생성 해 주세요:
 - 여러개의 수정이 존재하는 경우 의미있는 단위로 분할하여 커밋 해 주세요
 - Conventional Commits 규칙을 따르되(feat, fix, chore, docs, refactor, test, perf, style 등), 설명은 자연스러운 한국어로 작성합니다.
 - 출력 형식: [타입]: <한글 요약> -> [1줄 공백] -> [3~5줄 불릿 목록] -> [(선택) Refs/BREAKING CHANGE]
 - 제목은 72자 이내의 명령형 문장으로 작성하고 마침표를 사용하지 않습니다. 고유명/기술명(API, Controller 등)은 영문 그대로 유지합니다.
 - 본문은 핵심만 간결하게 요약하며, 불필요하게 긴 설명이나 세부 구현 코드는 제외합니다.
 - Diff가 너무 작거나 불분명하면 간결한 한국어로 이유를 설명하고 적절한 커밋 단위를 제안하세요.
 - 결과에는 커밋 메시지 텍스트만 출력하세요 (설명, 서문, 코드블록 기호 사용 금지).

---
description: '이모지와 컨벤셔널 커밋 메시지로 잘 포맷된 커밋을 생성합니다'
allowed-tools:
  [
    'Bash(git add:*)',
    'Bash(git status:*)',
    'Bash(git commit:*)',
    'Bash(git diff:*)',
    'Bash(git log:*)',
  ]
---

# Claude 명령어: Commit

이모지와 컨벤셔널 커밋 메시지로 잘 포맷된 커밋을 생성합니다.

## 사용법

```
/commit
```

## 프로세스

1. 스테이지된 파일 확인, 스테이지된 파일이 있으면 해당 파일만 커밋
2. 여러 논리적 변경사항에 대한 diff 분석
3. 필요시 분할 제안
4. 이모지 컨벤셔널 포맷으로 커밋 생성

## 커밋 포맷

`<이모지> <타입>: <설명>`

**타입:**

- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서화
- `style`: 포맷팅
- `refactor`: 코드 리팩토링
- `perf`: 성능 개선
- `test`: 테스트
- `chore`: 빌드/도구

**규칙:**

- 명령형 어조 ("추가" not "추가됨")
- 첫 줄 72자 미만
- 원자적 커밋 (단일 목적)
- 관련 없는 변경사항 분할

## 이모지 맵

✨ feat | 🐛 fix | 📝 docs | 💄 style | ♻️ refactor | ⚡ perf | ✅ test | 🔧 chore | 🚀 ci | 🚨 warnings | 🔒️ security | 🚚 move | 🏗️ architecture | ➕ add-dep | ➖ remove-dep | 🌱 seed | 🧑‍💻 dx | 🏷️ types | 👔 business | 🚸 ux | 🩹 minor-fix | 🥅 errors | 🔥 remove | 🎨 structure | 🚑️ hotfix | 🎉 init | 🔖 release | 🚧 wip | 💚 ci-fix | 📌 pin-deps | 👷 ci-build | 📈 analytics | ✏️ typos | ⏪️ revert | 📄 license | 💥 breaking | 🍱 assets | ♿️ accessibility | 💡 comments | 🗃️ db | 🔊 logs | 🔇 remove-logs | 🙈 gitignore | 📸 snapshots | ⚗️ experiment | 🚩 flags | 💫 animations | ⚰️ dead-code | 🦺 validation | ✈️ offline

## 분할 기준

다른 관심사 | 혼합된 타입 | 파일 패턴 | 큰 변경사항

## 참고사항

- 스테이지된 파일이 있으면 해당 파일만 커밋
- 분할 제안을 위한 diff 분석
- **커밋에 Claude 서명 절대 추가하지 않음**