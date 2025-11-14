## CueMeIn Hugo 웹사이트 프로젝트 - 종합 기술 문서 작성 요청

다음 프로젝트 폴더를 분석하여 Claude Project Knowledge에 업로드할 종합 기술 문서를 작성해 주세요:

**프로젝트 위치:** `C:\dev\asd\cuemein-hugo`

### 📋 요청 내용

**1단계: 프로젝트 전체 구조 분석**

- 모든 디렉토리와 주요 파일들의 역할
- Hugo 설정 파일들 (hugo.toml, netlify.toml, vercel.json 등)
- 템플릿 구조 (layouts/ 디렉토리 전체)
- 콘텐츠 구조 (content/ 디렉토리)
- 정적 리소스 (static/ 디렉토리)

**2단계: 기술 스택 및 설정 상세 분석**

- Hugo 버전 및 설정
- CSS 아키텍처 (모든 CSS 파일들)
- JavaScript 기능
- 배포 설정 (.github/workflows/deploy.yml)
- 의존성 및 패키지 (package.json)

**3단계: 블로그 기능 구현 상세**

- 블로그 포스트 템플릿 구조
- 메뉴 및 네비게이션 시스템
- SEO 설정 및 메타 태그
- 카테고리/태그 시스템

**4단계: 현재 이슈 및 해결된 문제들**

- CSS 헤더 겹침 문제와 해결책
- 반응형 디자인 구현 상태
- 폼 백엔드 연동 상태

**5단계: 개발 워크플로우 및 베스트 프랙티스**

- Git 브랜치 전략
- 배포 프로세스
- 로컬 개발 환경 설정
- 콘텐츠 작성 가이드라인

### 📝 출력 형식 요구사항

다음과 같은 구조로 **단일 마크다운 문서**를 생성해 주세요:

```
# CueMeIn Hugo 웹사이트 - 종합 기술 문서

## 프로젝트 개요
- 목적, 대상 사용자, 핵심 기능

## 기술 스택 & 아키텍처
- Hugo 설정, CSS/JS 구조, 배포 환경

## 파일 구조 상세
- 각 디렉토리/파일의 역할과 중요도

## 개발 가이드
- 로컬 환경 설정, 빌드/배포 방법

## 콘텐츠 관리
- 블로그 포스트 작성법, 메타데이터 설정

## 문제 해결 가이드
- 알려진 이슈와 해결책

## 향후 개발 방향
- 계획된 기능, 개선 사항
```

### 🔍 특별 요청사항

1. **실제 파일 내용을 읽고 분석하여** 추측이 아닌 정확한 정보만 포함
2. **코드 예시는 실제 프로젝트의 코드를 인용**
3. **설정 파일들의 핵심 설정값들을 명시**
4. **배포 파이프라인의 작동 방식을 단계별로 설명**
5. **문제 해결시 참조할 수 있는 구체적인 파일 경로와 라인 번호 포함**

이 문서는 Claude가 프로젝트 컨텍스트를 완전히 이해하고, 향후 개발/유지보수 질문에 정확하게 답할 수 있도록 하는 것이 목표입니다.

분석을 시작해 주세요!

````
GitHub Copilot: # CueMeIn Hugo 웹사이트 — 종합 기술 문서

> 위치: cuemein-hugo
> 생성일: 2025-11-14 (작성된 파일 내용 기준)

목표: 저장소의 실제 파일 내용을 바탕으로 프로젝트 구조, 설정, 템플릿/스타일 아키텍처, 빌드/배포 흐름, 블로그 기능 구현 세부사항 및 알려진 이슈(해결된 항목 포함)를 단일 문서로 정리합니다. 문서 내에 인용한 코드/설정은 실제 파일에서 가져왔고, 참조 경로와 편의상 보이는 위치(대략 라인 위치)를 함께 적었습니다.

---

## 프로젝트 개요

- 목적: CueMeIn은 신경다양성(ASD) 이용자를 위한 직장 내 커뮤니케이션 및 직무 역량 개발을 돕는 콘텐츠 기반 웹사이트/블로그 및 랜딩 페이지입니다.
- 핵심 사용자: 신경다양성 이용자(ASD), 교육자, 고용 관련 이해관계자
- 핵심 기능:
  - 블로그 게시(기사, 가이드)
  - 랜딩페이지(3D 모델, 베타 가입 폼)
  - 베타 가입 이메일 전송(서버리스 함수 사용)
  - 접근성·가독성 중심 디자인(ASD 친화적)

---

## 기술 스택 & 설정

- 정적 사이트: Hugo (프로젝트 설정에서 `HUGO_VERSION` 환경 변수 참조)
  - hugo.toml 핵심 설정:
    ```toml
    baseURL = 'https://cuemein.app'
    languageCode = 'en-us'
    title = 'CueMeIn - Workplace Skills for Neurodivergent Professionals'

    [params]
      description = "Interactive, AI-supported learning..."
      author = "CueMeIn"
    ```
    (파일: hugo.toml, 상단 섹션)
- Front-end: Vanilla CSS (다수의 CSS 파일), JavaScript (Three.js 포함)
- JS 종속성: main.js (Three.js 로더 등), navigation.js
- Serverless/Backend:
  - submit-form.js — Resend 이메일 전송 (서버리스 함수, Vercel 스타일)
  - package.json (Node env 및 `resend` 의존성)
    ```json
    {
      "name": "cuemein-hugo-api",
      "version": "1.0.0",
      "dependencies": { "resend": "^3.2.0" },
      "engines": { "node": ">=18.0.0" }
    }
    ```
    (파일: package.json)

배포 설정
- Netlify: netlify.toml — `hugo --minify` 빌드, `publish = "public"`, `HUGO_VERSION = "0.128.0"`
  (파일: netlify.toml)
- Vercel: vercel.json — build env `HUGO_VERSION = "0.128.0"` (파일: vercel.json)
- 기본 배포 명령:
  - 개발 서버:
    ```powershell
    hugo server --disableFastRender
    ```
  - 생산 빌드:
    ```powershell
    hugo --minify
    ```
  - Netlify 빌드(로컬 확인): `hugo --minify && netlify deploy --prod` (환경에 따라 다름)

---

## 파일 구조 상세 (요약)

상위 구조(주요 폴더)
- layouts — Hugo 템플릿
  - baseof.html — 공통 레이아웃(헤드, CSS 포함, `#site-main` 래퍼) (파일 참조: lines 1–~51)
  - single.html — 개별 포스트 템플릿 (파일 참조: 본문에 `<main class="post-main">` 사용)
  - header.html — 헤더 마크업 (`<header>` 내부에 `.container nav-container`) — (파일: header.html)
  - index.html, thank-you.html, 등
- content — 콘텐츠(블로그 포스트)
  - `content/posts/*.md` — 개별 포스트(예: why-i-built-cuemein.md) — (파일: why-i-built-cuemein.md)
- static — 정적 자원
  - style.css — 메인 스타일시트 (많은 규칙 포함, `.post-main` 규칙이 있음)
  - navigation.css — 네비게이션 보조 스타일
  - modern-blog.css — repo에 존재하지만 baseof.html에서 불러오지는 않음 (참고: 중복 CSS 가능성)
  - main.js, navigation.js
  - `static/images/*`, `static/models/*`
- api — 서버리스 함수 (submit-form.js)
- landing.yml — 랜딩 페이지 콘텐츠 데이터(피쳐, 통계 등)

파일 참고(일부):
- baseof.html — head에 CSS 링크:
  ```html
  <link rel="stylesheet" href="{{ "css/style.css" | relURL }}">
  <link rel="stylesheet" href="{{ "css/navigation.css" | relURL }}">
````

(파일: baseof.html, head 섹션)

- single.html (개별 포스트 템플릿 시작):
  ```html
  {{ define "main" }}
  <main class="post-main">
    <div class="container">
      <article class="post">
        <header class="post-header">
          <div class="post-meta">
            <time datetime="{{ .Date.Format "2006-01-02" }}">{{ .Date.Format "January 2, 2006" }}</time>
            ...
  ```
  (파일: single.html)

---

## CSS 아키텍처 (실제 파일 근거)

주요 파일

- style.css — 통합 스타일, 변수(`:root`), `.post-main` 관련 규칙 등 (길이 1,500+ 라인)
  - `.post-main, .blog-main`에 대한 헤더 보상 규칙: (파일 내 약 `line ~642` 부근)
    ```css
    .post-main,
    .blog-main {
      min-height: calc(100vh - 80px);
      ...
      padding-top: 120px; /* 기본 보상: 80px header + 40px breathing room */
    }
    ```
  - 문서 하단에도 추가 `.post-main` 관련 규칙(파일 끝부분, `~line 1422`) — 중복 정의 주의
  - 모바일 미디어쿼리에서 `.post-main` padding-top이 변경됨 (예: `@media (max-width: 768px) { .post-main { padding-top: 100px } }`)
- navigation.css — 네비게이션 스타일(로고, 메뉴, 토글 등)
- modern-blog.css — 유사 스타일이 존재(예: `.post-main`에 `margin-top: var(--header-height)`) — 현재 baseof.html에서 로드되지 않음(확인 필요)

현재 CSS 관련 주목점

- 동일한 선택자(`.post-main`)가 여러 파일/지점에 존재 → CSS 중복/우선순위 문제 발생 가능
- baseof.html head에서 style.css가 먼저 로드되고 navigation.css가 뒤에 로드됨. (실제 브라우저 로드 순서 확인 권장)
- 프로젝트는 `:root { --header-height: 80px; }` 변수를 사용함 → JS에서 동적으로 `--header-height`를 재설정하는 코드가 baseof.html에 포함되어 있음 (아래 참조)

동적 헤더 높이 스크립트 (파일: baseof.html, head 내 inline script)

```html
<script>
  window.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector("header");
    if (header) {
      const actualHeight = header.offsetHeight;
      document.documentElement.style.setProperty(
        "--header-height",
        actualHeight + "px"
      );
      console.log("Dynamic header height set to:", actualHeight + "px");
    }
  });
</script>
```

- 이 스크립트는 런타임에 `--header-height`를 설정하므로, CSS에서 이 변수를 사용하면 헤더 높이 변화에 대응할 수 있음.

권장: CSS 중복 제거 또는 단일 소스(예: style.css)에서 `.post-main`을 관리하도록 통합.

---

## JavaScript 요약 (핵심 기능 및 위치)

- main.js
  - Smooth scrolling 보정(헤더 높이 보정 값 하드코딩 `headerHeight = 80`)
  - 3D 모델 초기화 (Three.js)
  - 스크롤에 따른 헤더 스타일 변경 (투명→불투명 전환)
  - 애니메이션 트리거(IntersectionObserver)
  - 파일: main.js (상단에 `headerHeight` 사용 코드)
- navigation.js
  - 모바일 내비게이션 토글 및 메뉴 제어 (class toggle)
  - 파일: navigation.js
- baseof.html에 인라인 스크립트로 header 높이 CSS 변수 설정(위 인용)

주의사항:

- Smooth-scroll 코드가 headerHeight를 80으로 하드코딩: 만약 동적 헤더 높이를 쓰기로 결정하면 `document.documentElement.style.getPropertyValue('--header-height')` 등을 참조하도록 변경 권장.

---

## 블로그 기능 구현 상세

템플릿 구조(요약)

- baseof.html — 공통 head/foot, `#site-main` 래퍼(중요: 이전에 outer `<main>`이 사용되어 child `<main>`과 중첩되던 문제를 해결하기 위해 `#site-main`으로 대체됨)
- single.html — 단일 포스트: `<main class="post-main">` 내부에 `.container > .post` 구조
- 부분(Partial): header.html, footer.html, animated-character.html 등

메뉴/네비게이션

- hugo.toml에 `menu.main` 항목이 정의되어 있으며 header.html에서 순환하여 렌더링
- HTML: header 내부에 `<div class="container nav-container">` 및 `<nav class="main-nav">` (파일: header.html)

SEO / 메타

- baseof.html head에 Open Graph / Twitter 관련 메타 태그 존재:
  ```html
  <meta property="og:title" content="{{ .Title | default .Site.Title }}" />
  <meta
    property="og:description"
    content="{{ .Description | default .Site.Params.description }}"
  />
  <meta property="twitter:card" content="summary_large_image" />
  ```
  (파일: baseof.html, head 섹션)

카테고리/태그 시스템

- hugo.toml에 `taxonomies` 선언:
  ```toml
  [taxonomies]
    category = "categories"
    tag = "tags"
  ```
- 각 포스트의 front matter에 `categories`/`tags` 사용 (예: why-i-built-cuemein.md)

---

## 알려진 이슈 및 해결된 항목 (문제·원인·해결)

1. 헤더가 포스트 콘텐츠를 가리는 문제 (중요)

- 증상: 고정(header: `position: fixed; height: 80px`)인 헤더가 개별 포스트의 최상단 텍스트를 가림.
- 원인 식별:
  - baseof.html에 외부 `<main>`이 있었고, single.html도 자체 `<main>`을 선언 — 결과적으로 브라우저가 잘못된 중첩을 "repair" 하면서 예기치 않은 레이아웃 동작이 발생.
  - CSS 규칙이 여러 곳에서 `.post-main`을 정의(중복)하여 우선순위/상속 문제 가능.
- 조치(이미 적용됨):
  - baseof.html의 외부 `<main>`을 제거하고 대신 `<div id="site-main">...</div>`로 대체하여 "중복 `<main>`" 문제를 해결했습니다. (파일: baseof.html, head 이후 `#site-main` 래퍼)
- 추가 권장 조치:
  - 헤더 보상(스크롤 오프셋)을 한 곳으로 집중: `#site-main { padding-top: var(--header-height); }` 또는 `main.post-main`에서 중앙 관리.
  - DevTools로 `document.querySelectorAll('main').length` 확인 — 반드시 1이어야 함.

2. CSS 중복 및 우선순위 문제

- 증상: `.post-main { padding-top: 120px }`를 넣었지만 적용되지 않음(또는 덮어쓰기 됨).
- 원인: 동일 선택자가 여러 파일(예: style.css와 modern-blog.css)에 의해 정의되어 있으며, 로드 순서 또는 더 높은 특수성으로 인해 우회될 수 있음.
- 권장 조치:
  - 불필요한 중복 스타일 파일 제거 혹은 하나로 병합.
  - 툴(브라우저 DevTools > Styles)로 어떤 파일이 최종적으로 규칙을 제공하는지 확인.
  - 단기 테스트: `#site-main > main.post-main { padding-top: 120px !important; }` 적용(권장 : 테스트용).

3. 베타 폼/이메일 전송 관련

- 위치: submit-form.js — Resend API 사용
- 확인 포인트: 환경변수 `RESEND_API_KEY` 필요 (코드에서 검증 및 오류 처리 포함)
- 로그 코드 샘플(요약):
  ```js
  const { email, name, message, honeypot } = req.body || {};
  if (!email || !email.includes('@')) return res.status(400)...
  if (honeypot) return res.status(200)... // 스팸 차단
  const resend = new Resend(apiKey);
  await resend.emails.send(emailData);
  ```
  (파일: submit-form.js — 예외/로깅이 상세하게 구현되어 있음)

---

## 디버그/검증 체크리스트 (헤더/ 레이아웃 관련)

1. 템플릿 구조 확인

   - baseof.html에 `#site-main` 존재 확인:
     ```html
     <div id="site-main">{{ block "main" . }}{{ end }}</div>
     ```
     (파일: baseof.html)
   - single.html이 `<main class="post-main">`을 단 하나만 선언하는지 확인.

2. 브라우저 실행 시 DevTools에서
   - `document.querySelectorAll('main').length` ⇒ 1 이어야 함.
   - `.post-main`의 계산된(`getComputedStyle`) `padding-top` 확인:
     ```js
     getComputedStyle(document.querySelector(".post-main")).getPropertyValue(
       "padding-top"
     );
     getComputedStyle(document.querySelector(".post-main")).getPropertyValue(
       "margin-top"
     );
     ```
   - 로드된 CSS 파일 순서 확인:
     ```js
     [...document.styleSheets].map((s) => s.href || "[inline]");
     ```
3. 서버 재시작(캐시 무시)
   - 개발 서버:
     ```powershell
     hugo server --disableFastRender
     ```
   - 브라우저에서 Network 탭의 "Disable cache" 체크 후 강력 새로고침(Ctrl+F5)

---

## 문제 해결 가이드 (권장 패치/스니펫)

1. 중앙화된 헤더 오프셋(권장)

- style.css 끝부분에 추가:

```css
/* Centralized header offset */
#site-main {
  padding-top: var(--header-height, 80px);
}
main.post-main {
  padding-top: calc(var(--header-height, 80px) + 40px); /* breathing room */
}
```

- 이유: `#site-main`에 기본 오프셋을 주면 페이지 유형(홈/섹션/포스트) 구분 없이 일관 적용.

2. 헤더 시각적 개선(불투명+구분선)

- navigation.css 또는 style.css에:

```css
header {
  background-color: #ffffff; /* 완전 불투명 */
  border-bottom: 1px solid #e6e9ec;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  position: fixed;
  width: 100%;
  z-index: 1000;
}
```

- 이유: 반투명으로 인해 텍스트 가독성이 낮으면 완전 불투명으로 전환하고 subtle border로 경계부여.

3. `.post-meta` 줄 정렬 개선 (예시)

- style.css에:

```css
.post-meta {
  display: flex;
  gap: 16px;
  align-items: center; /* baseline 대신 center로 안정화 */
  line-height: 1.5;
}
.post-header {
  padding: 24px 0;
  margin: 0;
}
```

- 이유: `baseline` 정렬 기준으로 인해 라인 정렬이 흔들리면 `center`로 고정해 ASD 사용자에게 안정적 표시.

---

## 개발 가이드 (로컬 환경 / 배포)

로컬 개발

- 요구: Hugo(프로젝트가 참조하는 버전과 호환), Node (>= 18) — package.json의 `engines`
- 빠른 로컬: (PowerShell)

```powershell
# 개발 서버 (빠른 새로고침 비활성화 권장)
hugo server --disableFastRender
# 프로덕션 빌드
hugo --minify
```

배포(요약)

- Netlify: netlify.toml에 명시된 `build.command = "hugo --minify"`, publish public
- Vercel: vercel.json에 `HUGO_VERSION` 세팅
- CI/CD: Git → netlify / vercel 자동 배포 (repo에 workflow 없음 확인 — 자체 CI 스크립트가 없을 경우 netlify/vercel가 자동으로 빌드)

서버리스(폼 처리)

- 배포 환경에서 `RESEND_API_KEY` 반드시 설정 필요
- submit-form.js는 Vercel 스타일 handler 모듈: Netlify Functions 사용 시 변환 필요

---

## 콘텐츠 관리 & 작성 가이드

포스트 front matter (권장 형식)

```yaml
---
title: "Example Title"
date: 2025-11-14T10:00:00+11:00
categories: ["Category"]
tags: ["tag1", "tag2"]
summary: "Short summary text"
---
```

- 파일: `content/posts/<slug>.md` (예: why-i-built-cuemein.md)

편집 권장사항 (ASD 친화성)

- 제목/요약은 명확하고 간결하게
- 단락 길이 짧게(가독성 향상)
- 시각적 강조는 너무 많지 않게(일관된 색상/간격 유지)

---

## 향후 개발 방향(권장 우선순위)

1. CSS 정리: style.css를 단일 소스 오브젝트로 정리하고 modern-blog.css 같은 미사용 파일 제거
2. 스크롤/앵커 오프셋: main.js의 하드코딩 `headerHeight = 80`을 `getComputedStyle(document.documentElement).getPropertyValue('--header-height')`로 치환
3. 폼 백엔드: submit-form.js에 대한 테스트 케이스, 비정상 응답 핸들링 강화, 로깅 체계(특히 배포 환경에서 API 키 존재 유무 모니터링)
4. 접근성(A11y): 색상 대비 테스트(WCAG AA/AAA 검토), 키보드 네비게이션 보강, ARIA 속성 검토
5. CI: GitHub Actions 워크플로우 추가(테스트/빌드/배포 자동화)

---

## 참조 파일 리스트 (핵심, 편의상 경로만)

- hugo.toml — 사이트 설정
- baseof.html — 공통 레이아웃 (head, CSS 로드, `#site-main` 래퍼)
- single.html — 포스트 템플릿 (`<main class="post-main">`)
- header.html — 헤더 마크업 (`<header> ... .nav-container`)
- style.css — 메인 스타일 (~1,500+ 라인; `.post-main` 규칙 존재)
- navigation.css — 네비게이션
- modern-blog.css — repository에 존재하지만 baseof.html에서 로드되지 않음(검토 필요)
- main.js — UI/3D/스크롤 스크립트
- submit-form.js — 이메일 전송 로직(Resend)
- why-i-built-cuemein.md — 예시 포스트

---

## 빠른 액션 (제가 대신 적용 가능)

1. `#site-main`에 중앙 padding-top 추가 (권장) — style.css에 직접 추가
2. main.js의 하드코딩된 `headerHeight = 80`을 CSS 변수 방식으로 변경
3. style.css에서 중복 `.post-main` 규칙 제거(또는 병합)
4. 헤더 시각적 경계(불투명 + border-bottom) 적용

원하시면 (선택):

- A: 1~3번을 제가 repo에 패치해서 적용해 드리겠습니다(작업 후 `hugo server`로 로컬 테스트 지침 제공).
- B: 변경 없이 DevTools 콘솔 검사 명령(간단한 체크리스트)을 보내드려 직접 확인하실 수 있게 합니다.
- C: 우선 헤더-메타 정렬(줄 어긋남) 해결을 위해 `.post-meta`와 `.post-header` 패치만 적용해 드립니다.

어떤 작업을 우선으로 진행할까요? 원하시면 제가 즉시 파일 패치를 만들어 적용하겠습니다(변경 전후 diff와 적용 방법 포함).
