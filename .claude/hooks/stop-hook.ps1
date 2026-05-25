# Claude Code Stop 훅 - 작업 완료 알림 (작업 요약 포함)

# 외부 명령어(git 등) 출력을 UTF-8로 읽기 위한 인코딩 설정
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

# stdin에서 JSON 읽기
$inputData = $input | Out-String
$summary = ""
try {
    $json = $inputData | ConvertFrom-Json
    # Claude Code가 전달하는 result 또는 message 필드 파싱
    if ($json.result) { $summary = $json.result }
    elseif ($json.message) { $summary = $json.message }
} catch {}

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

# 최근 git 커밋 메시지 가져오기 (작업 맥락 파악용)
$lastCommit = ""
try {
    $lastCommit = & git -C $env:CLAUDE_PROJECT_DIR log -1 --pretty=format:"%s" 2>$null
} catch {}

# 요약 텍스트 구성
$summaryLine = if ($summary) { "`n*요약:* $summary" } else { "" }
$commitLine  = if ($lastCommit) { "`n*최근 커밋:* $lastCommit" } else { "" }

$body = @{
    username   = "Claude Code"
    icon_emoji = ":white_check_mark:"
    text       = "✅ *작업 완료 알림*`n`n*프로젝트:* $projectName$summaryLine$commitLine`n*시간:* $timestamp`n`nClaude Code 작업이 완료되었습니다."
} | ConvertTo-Json -Compress

try {
    $bodyBytes = [System.Text.Encoding]::UTF8.GetBytes($body)
    Invoke-RestMethod -Uri $webhookUrl -Method Post -Body $bodyBytes -ContentType "application/json; charset=utf-8" | Out-Null
    Write-Host "Slack 알림 전송 성공"
} catch {
    Write-Error "Slack 알림 전송 실패: $_"
    exit 1
}
