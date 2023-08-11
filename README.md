<br />

<p align="center">
  <a href="https://getbootstrap.com/">
    <img src="https://github.com/gongzone/warmgun/assets/84328632/4fc90538-6f64-4be7-b3fb-f485d457bea0" width="380" alt="Warmgun logo">
  </a>
</p>

<h3 align="center"><strong>Warmgun</strong></h3>

<p align="center">
  <strong>개발 커뮤니티 & 블로그 서비스</strong>
  <br>
  [v0.20.0 - PreRelease Version]
  <br>
  <a href="https://www.warmgun.kr/">
  <strong>https://www.warmgun.kr</strong>
  </a>
</p>

<br>

# Warmgun

Warmgun은 개발자들을 위한 커뮤니티 및 블로그 서비스 플랫폼입니다.

<small>\* 현재는 정식 릴리즈 전 버전입니다. 테스트 용도로 사용해주세요.</small>

<br>

# 왜 만들게 되었는가?

기존에 Gatsby로 만든 개인용 블로그가 있었습니다. 비용 부담을 피하고자 로컬 환경에서 모든 데이터를 관리하고 빌드하는 정적 사이트 생성 방식을 선택했는데 사용하기 꽤나 불편하더군요.

그래서 새롭게 만들고자 마음을 먹었습니다. 이번에는 더 나아가 백엔드를 포함하고, 다양한 사용자들이 이용할 수 있는 서비스로 기능을 확장하는 것을 목표로 했습니다. 그렇게 시작되어 만들어진 것이 해당 프로젝트인 Warmgun입니다.

<br>

# 👀 비전

- 사용자에게 최적화된 글쓰기와 글 관리 환경 제공 **(Writing)**
- 맞춤형으로 글을 확인할 수 있는 편리함 제공 **(Viewing)**
- 개발자들 간 교류를 촉진하는 커뮤니티 공간 마련 **(Communicating)**
- 지속적이고 몰입된 글쓰기를 촉진하는 동기 부여 시스템 구현 **(Motivating)**

---

# 💭 대표 기술 스택

- Svelte & Sveltekit
- Tailwind CSS & Skeleton
- PostgreSQL & Prisma
- Meilisearch
- TanStack Query
- Tiptap
- TypeScript
- AWS(S3, CloudFront, Lambda@Edge, EC2, RDS) & Vercel

---

# 🛫 주요 기능 구현 현황

### (1) Writing

- 글 작성 시 필요한 메뉴를 두 가지로 분리하여 직관적이고 깔끔한 글쓰기 환경 제공
  - (1) 드래그 시 나타나는 Bubble 메뉴 (굵게, 기울임, 링크 등)
  - (2) 빈 라인에 커서를 놓을 시 자동적으로 활성화되는 Floating 메뉴(제목, 이미지, 코드 등)
- 글 작성 페이지에서 초고를 저장하고 생성할 수 있도록 하여 글 관리에 편리함을 제공

### (2) Viewing

- 주요 개발 분야를 카테고리화하여 (프론트엔드, 백엔드, 모바일 등) 관심 분야의 글들을 쉽게 확인 할 수 있도록 함
- 기본 Sorting 기능 제공 (최신순, 트렌딩, 베스트)
- 태그 시스템 적용
- 마이 피드 기능 제공 (맞춤형 피드, 좋아요한 아티클, 구독중인 블로거)
- [MeiliSearch](https://www.meilisearch.com/) 검색 엔진을 통한 검색 기능 제공
- Tanstack Query를 통한 Infinite Scroll 구현으로 빠른 페이지 로딩과 끊김없는 Viewing 경험 제공

### (3) Communicating

- 소통 창구 역할을 하는 기본 커뮤니티 기능 구현 (자유, 질문, 토론, 팀원)
- 좋아요 및 구독 기능 제공
- 댓글 기능 제공

### (4) Motivating

- 베스트 글로 선정된 글들은 홈 화면 최상단에 전시
- 우수 블로거 선정

  \*_ 추가 예정 사항: 조회수 통계 확인, 포인트 시스템 구현_

---

# ⚒️ 주요 개발 문제들

개인 프로젝트이기에 기획, 디자인, 개발(프론트 + 백), 배포 및 운영 모두 도맡아 했습니다.

### (1) 디자인, UI, UX

- 균일한 스타일링을 위해 [Tailwind CSS](https://tailwindcss.com/) & [Skeleton](https://www.skeleton.dev/)을 활용하여 메인 theme 구축
- 재사용성 향상을 위해 작은 단위의 UI 컴포넌트들 구현

<aside>
💡 *발전 방향: 최종적으로는 Tailwind CSS만 베이스 스타일링 도구로서 활용하고 Skeleton와 같은 UI Framework에 대한 의존성을 제거할 것입니다. 왜냐하면 UI와 같이 사용자들에게 그대로 노출되는 영역이 버전 업데이트에 따라 빈번히 변경되는 것을 선호하지 않기 때문입니다. 또한 내부 코드 수정이 어렵기도 하기 때문입니다. 저는 [shadcn/ui](https://ui.shadcn.com/) 같이 프로젝트 내부에 UI 컴포넌트를 선언하는 것을 좋아합니다.

</aside>

### (2) 에디터 설계

- [Tiptap](https://tiptap.dev/) core 및 ProseMirror 패키지를 활용하여 작은 단위로 에디터 커스터마이징
- 코드 하이라이팅, 이미지 업로드 등 다수 기능 구현

<aside>
💡 *발전 방향: 앞선 발전 방향에 서술한 이유와 같이 차차 Tiptap core에 대한 의존성을 제거할 계획이 있습니다.

</aside>

### (3) 인증 처리

- 자동 로그인 구현
- Refresh Token Rotation 전략을 구현하여 제 3자로부터 토큰 탈취 시 보안 강화
- Refresh Token Rotation 전략 구현으로 인해 발생하는 다중 접속 문제 해결을 위해, 여유 시간 설정 및 세션 구성
- http only, secure cookie 사용하여 보안 강화

<aside>
💡 *발전 방향: 사용자 접근성 및 인증 로직 단순화를 위해 소셜 로그인으로 통합할 생각입니다.

</aside>

### (4) **이미지 최적화**

- S3 + CloudFront + Lambda@Edge 조합으로 이미지 캐싱 및 On-The-Fly 리사이징 기능 구현 (적은 용량의 webp 포맷으로 변환 및 width, height 동적으로 설정)
- lazy loading 기법을 적용하여 초기 로딩 시간 단축

<aside>
💡 *발전 방향: 이미지 가공 처리 때문에, 이미지 요청 시 로드 속도가 느린 것 같아, 다른 방법을 구상 중입니다.

</aside>

### (5) **검색 엔진을 통한 검색 쿼리 성능 향상**

- [Meilisearch](https://www.meilisearch.com/) Open Source 버전을 EC2에 배포하여 활용
- 적절한 검색 결과 도출을 위한 관련성(relevancy) 설정

<aside>
💡 *발전 방향: 비용 문제로 오픈 소스 버전을 이용하기 때문에 검색 엔진에 대한 어드민 패널을 따로 구현 중에 있습니다.

</aside>

### (6) SEO 설정

- Open Graph 및 기타 meta tag 설정

<aside>
💡 *발전 방향: 최종 프로덕션에서는 구글 콘솔 및 아날리틱스에 등록할 예정입니다.

</aside>

### (7) 기타 성능 향상

- SSR(Server-Side-Rendering) 적극 활용
- Edge Function 이용 (vercel)
- 데이터 베이스, 애플리케이션 등 배포 지역은 한국으로 통일
- Sveltekit 자체 캐싱 매커니즘, Tanstack Query 캐싱 이용
- 주 폰트는 가변 폰트로 사용
- S3 Presigned URL을 이용하여 이미지 업로드 시 서버 부담 최소화

---
