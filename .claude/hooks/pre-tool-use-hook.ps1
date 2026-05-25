# Claude Code PreToolUse 훅 - 위험 명령어 사전 감지 및 차단

# 입출력 인코딩을 UTF-8로 설정
[Console]::InputEncoding  = [System.Text.Encoding]::UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding           = [System.Text.Encoding]::UTF8

# stdin에서 JSON 읽기
$inputData = $input | Out-String
$toolName = ""
$toolInput = ""
$checkTarget = ""
try {
    $json = $inputData | ConvertFrom-Json
    $toolName = $json.tool_name
    $toolInput = $json.tool_input | ConvertTo-Json -Compress -Depth 10
    # Bash 도구는 command 필드만 검사
    if ($toolName -eq "Bash" -and $json.tool_input.command) {
        $checkTarget = $json.tool_input.command
        # git commit 명령어는 메시지 본문 제거 후 검사 (heredoc/커밋 메시지 오탐지 방지)
        if ($checkTarget -match 'git\s+commit') {
            $checkTarget = ($checkTarget -split '(-m\s+[''"]|<<\s*[''"]?EOF)')[0]
        }
    } else {
        $checkTarget = $toolInput
    }
} catch {}

# 즉시 차단할 패턴 (exit 2 → Claude에게 오류로 반환)
$blockPatterns = @(
    'rm\s+-rf\s+/',
    'format\s+c:',
    'rd\s+/s\s+/q\s+c:\\',
    'DROP\s+DATABASE',
    'mkfs\.',
    'dd\s+if=.*of=/dev/'
)

# 경고만 보낼 패턴 (exit 0 → 실행은 허용하되 Slack 알림)
$warnPatterns = @(
    'git\s+reset\s+--hard',
    'git\s+push\s+(.*--force|-f)',
    'Remove-Item.*-Recurse.*-Force',
    'DROP\s+TABLE',
    'git\s+clean\s+-fd',
    'del\s+/f\s+/s',
    'Remove-Item.*-Force'
)

$isBlocked = $false
$isWarning = $false
$matchedPattern = ""

foreach ($pattern in $blockPatterns) {
    if ($checkTarget -match $pattern) {
        $isBlocked = $true
        $matchedPattern = $pattern
        break
    }
}

if (-not $isBlocked) {
    foreach ($pattern in $warnPatterns) {
        if ($checkTarget -match $pattern) {
            $isWarning = $true
            $matchedPattern = $pattern
            break
        }
    }
}

# 위험 감지 시 Slack 알림
if ($isBlocked -or $isWarning) {
    $envFile = Join-Path $env:CLAUDE_PROJECT_DIR ".env"
    if (Test-Path $envFile) {
        Get-Content $envFile | ForEach-Object {
            if ($_ -match '^\s*([^#][^=]+)=(.*)$') {
                [System.Environment]::SetEnvironmentVariable($Matches[1].Trim(), $Matches[2].Trim())
            }
        }
    }

    $webhookUrl = [System.Environment]::GetEnvironmentVariable("SLACK_WEBHOOK_URL")
    $projectName = Split-Path $env:CLAUDE_PROJECT_DIR -Leaf
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

    if ($isBlocked) {
        $emoji = ":no_entry:"
        $title = "*🚫 위험 명령어 차단*"
        $status = "차단됨 (실행 중지)"
    } else {
        $emoji = ":warning:"
        $title = "*⚠️ 위험 명령어 경고*"
        $status = "경고 (실행 허용)"
    }

    # 표시용: JSON 전체 대신 실제 명령어($checkTarget)를 사용해 한글 깨짐 방지
    $displayRaw   = if ($checkTarget) { $checkTarget } else { $toolInput }
    $displayInput = if ($displayRaw.Length -gt 300) { $displayRaw.Substring(0, 300) + "..." } else { $displayRaw }

    if ($webhookUrl) {
        $body = @{
            username   = "Claude Code"
            icon_emoji = $emoji
            text       = "$title`n`n*프로젝트:* $projectName`n*도구:* $toolName`n*패턴:* ``$matchedPattern```n*상태:* $status`n*명령:* ``$displayInput```n*시간:* $timestamp"
        } | ConvertTo-Json -Compress

        try {
            $bodyBytes = [System.Text.Encoding]::UTF8.GetBytes($body)
            Invoke-RestMethod -Uri $webhookUrl -Method Post -Body $bodyBytes -ContentType "application/json; charset=utf-8" | Out-Null
        } catch {
            Write-Error "Slack 알림 전송 실패: $_"
        }
    }

    if ($isBlocked) {
        # exit 2 → Claude Code가 도구 실행을 중단하고 오류로 처리
        Write-Error "위험 명령어가 감지되어 실행이 차단되었습니다: $matchedPattern"
        exit 2
    }
}

exit 0
