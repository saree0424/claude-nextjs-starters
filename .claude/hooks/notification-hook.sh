#!/bin/bash
# Claude Code Notification 훅 - 권한 요청 및 사용자 입력 대기 알림

# stdin 소비 (Claude Code가 데이터를 전달할 수 있음)
cat > /dev/null

# .env 파일에서 Slack 웹훅 URL 로드
if [ -f "$CLAUDE_PROJECT_DIR/.env" ]; then
    source "$CLAUDE_PROJECT_DIR/.env"
else
    echo "오류: .env 파일을 찾을 수 없습니다" >&2
    exit 1
fi

if [ -z "$SLACK_WEBHOOK_URL" ]; then
    echo "오류: SLACK_WEBHOOK_URL이 설정되지 않았습니다." >&2
    exit 1
fi

PROJECT_NAME=$(basename "$CLAUDE_PROJECT_DIR")
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
WEBHOOK_URL="$SLACK_WEBHOOK_URL"

# PowerShell로 UTF-8 안전하게 Slack 전송
powershell.exe -NoProfile -Command "
\$body = @{
    username   = 'Claude Code'
    icon_emoji = ':bell:'
    text       = \"`u{1F514} *권한 요청 알림*\`n\`n*프로젝트:* $PROJECT_NAME\`n*시간:* $TIMESTAMP\`n\`nClaude Code에서 승인이 필요합니다.\"
} | ConvertTo-Json -Compress
Invoke-RestMethod -Uri '$WEBHOOK_URL' -Method Post -Body \$body -ContentType 'application/json; charset=utf-8'
" >&2

if [ $? -eq 0 ]; then
    echo "Slack 알림 전송 성공" >&2
else
    echo "Slack 알림 전송 실패" >&2
    exit 1
fi
