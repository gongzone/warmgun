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

# Warmgun의 목표 및 방향성

다음은 개발 커뮤니티 & 블로그 서비스인 Warmgun이 도달해야 할 목표들입니다.

- 사용자에게 최적화된 글쓰기와 글 관리 환경 제공 (블로그 서비스 기능, v1)
- 개발자들 간 교류를 촉진하는 커뮤니티 공간 마련 (커뮤니티 기능, v2)
- 지속적이고 몰입된 글쓰기를 촉진하는 동기 부여 시스템 구현 (성장 시스템 도입, v3)

아직은 블로그 서비스 기능을 완성해 나가는 단계이므로 할 일이 많지만, 지속적으로 개선하고 기능을 추가하며 완성도를 높이고자 합니다. v1 단계에 도달한 후, 운영과 관련된 모든 요소들(비용, 수익, 그 외 관리)이 예측 가능하고 처리 가능한 상태가 될 때 정식 릴리즈를 계획하고 있습니다.

<br>

# 기술 스택

이번 프로젝트를 진행하며, 단순히 친숙한 기술들에만 의존하지 않고, 애플리케이션 개발에 더 효율적이고 적합한 기술을 찾기 위해 노력했습니다.

다음은 Warmgun 구현에 큰 도움이 된 주요 기술들입니다.

- Svelte & Sveltekit
- Tailwind CSS & Skeleton
- PostgreSQL & Prisma
- Meilisearch
- TanStack Query
- Editor.js
- TypeScript
- AWS(S3, CloudFront, Lambda@Edge, EC2, RDS) & Vercel

<br>

# 주요 활동

개인 프로젝트이기에 기획, 디자인, 개발(프론트 + 백), 배포 및 운영 모두 도맡아 했습니다.

## 이미지 최적화

- S3 + CloudFront + Lambda@Edge 조합으로 이미지 캐싱 및 On-The-Fly 리사이징 기능 구현 (적은 용량의 webp 포맷으로 변환)
- lazy loading 기법을 적용하여 초기 로딩 시간 단축

## 인증 보안 강화

- Refresh Token Rotation 전략을 구현하여 제 3자로부터 토큰 탈취 시 보안 강화
- http only, secure cookie 사용

## 검색 엔진을 통한 검색 쿼리 성능 향상

- Meilisearch Open Source 버전을 EC2에 배포하여 활용
- 적절한 검색 결과 도출을 위한 관련성(relevancy) 설정
- 검색 인덱스 관리를 위한 어드민 패널 구현

## 구조화된 스타일링

- Tailwind CSS & Skeleton 라이브러리를 사용하여 디자인 theme 구축

## SEO 작업 

<br>

# Why?

## Svelte와 Sveltekit을 선택한 이유

초기 로딩 속도를 높이고 검색 엔진 최적화(SEO)를 위해 서버 사이드 렌더링(SSR)을 지원하는 프레임워크를 선택하고자 했습니다. 처음에는 React에 익숙했기 때문에, React 기반의 Next.js와 Remix에 관심이 가더군요.

원래는 Next.js를 선택할 계획이었지만, 당시 13 버전으로 전환하면서 핵심 기능인 App Router가 베타 상태여서 프로덕션에 적합하지 않다고 판단했습니다. 그래서 Remix를 사용하다가, 중간에 잠시 찍먹해본 Svelte가 여러 매력적인 요소가 있어 Svelte의 메타 프레임워크인 Sveltekit으로 최종 선택하게 되었습니다. 자세한 이유는 아래와 같습니다.

### 쉽고 깔끔하다

이전에 Svelte를 일절 사용해본 적이 없음에도 금방 적응하여 코드를 작성할 수 있을 정도로 다루기 쉬웠습니다. 또한 그저 변수를 선언하여 상태를 생성하고 값을 재 할당하여 상태의 변화를 일으킬 수 있었기 때문에 상태관리가 React의 hook 시스템에 비해 직관적이였던것이 참 마음에 들더군요. 이 밖에도 Logic Blocks 같은 여러 문법적인 사항들이 좀 더 코드를 이해하기 쉽게 작성하도록 도와준다는 느낌을 받았습니다.

### 빠르게 동작한다

React는 가상 돔(virtual DOM)을 사용해 렌더링 과정을 개선합니다. 상태가 변경되어 UI가 바뀔 때, 새 가상 돔과 이전 스냅샷을 비교해 필요한 부분만 실제 돔(real DOM)에 적용하는 과정을 거칩니다. 그러나, 이런 방식은 일부 overhead가 발생할 수 밖에 없습니다. 반면, Svelte는 빌드 타임에 미리 변경 사항을 포함한 바닐라 자바스크립트 코드를 생성하는 컴파일러입니다. 그래서 성능 면에서 더 좋은 결과를 보이는 경향이 있습니다. 추가적으로 번들 사이즈 역시 작은 것이 장점이기도 합니다. 이러한 특성들이 매력적으로 느껴져 Sveltekit에 정착하게 되었습니다.
