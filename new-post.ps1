param([Parameter(Mandatory=$true)] [string]$Slug)

if ($Slug -notmatch '^[a-z0-9\-]+$') {
    Write-Error "소문자, 숫자, 하이픈만 사용하세요."
    exit 1
}

# 명시적으로 post archetype 사용
hugo new --kind post "posts/$Slug.md"