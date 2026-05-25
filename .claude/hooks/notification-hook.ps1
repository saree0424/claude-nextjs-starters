# Claude Code Notification 훅 - 권한 요청 알림

# stdin에서 JSON 읽기
$inputData = $input | Out-String
$message = ""
try {
    $json = $inputData | ConvertFrom-Json
    $message = $json.message
} catch {}
if (-not $message) { $message = "(메시지 없음)" }

# .env 파일에서 SLACK_WEBHOOK_URL 로드
$envFile = Join-Path $env:CLAUDE_PROJECT_DIR ".env"
if (Test-Path $envFile) {
    Get-Content $envFile | ForEach-Object {
        if ($_ -match '^\s*([^#][^=]+)=(.*)$') {
            [System.Environment]::SetEnvironmentVariable($Matches[1].Trim(), $Matches[2].Trim())
        }
    }
} else {
    Write-Error "오류: .env 파일을 찾을 수 없습니다: $envFile"
    exit 1
}

$webhookUrl = [System.Environment]::GetEnvironmentVariable("SLACK_WEBHOOK_URL")
if (-not $webhookUrl) {
    Write-Error "오류: SLACK_WEBHOOK_URL이 설정되지 않았습니다."
    exit 1
}

$projectName = Split-Path $env:CLAUDE_PROJECT_DIR -Leaf
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

$body = @{
    username   = "Claude Code"
    icon_emoji = ":bell:"
    text       = "🔔 *권한 요청 알림*`n`n*프로젝트:* $projectName`n*MSG:* $message`n*시간:* $timestamp`n`nClaude Code에서 승인이 필요합니다."
} | ConvertTo-Json -Compress

try {
    $bodyBytes = [System.Text.Encoding]::UTF8.GetBytes($body)
    Invoke-RestMethod -Uri $webhookUrl -Method Post -Body $bodyBytes -ContentType "application/json; charset=utf-8" | Out-Null
    Write-Host "Slack 알림 전송 성공"
} catch {
    Write-Error "Slack 알림 전송 실패: $_"
    exit 1
}
