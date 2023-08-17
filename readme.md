# 고민의 참견, 고참 프로젝트 프론트에 참여한 여러분을 환영합니다.

## 개발 환경 및 도구
```
언어: 타입스크립트

베이스 라이브러리: 리액트

상태관리: jotal

통신방법: REST API. ApiConfig 함수를 이용함.
         기존에 작성된 코드를 참고.

이미지 업로드: 파이어베이스

css 라이브러리: emotion (스타일드컴포넌트랑 사용법은 동일)

pwa: 적용됨. npm start 상태에서는 영향없고, 배포된 페이지에서는 서비스 워커가 코드 변동을 감지하면, 업데이트 배너를 보여주는 형식으로 작동.
     여건이 된다면, pwa builder로 앱 빌드 진행. 
```
## 버전 표기법 
version 1.2.3.a
릴리즈 버전.메이저 버전.마이너 버전.핫 픽스

## 깃헙 브랜치 관리
`main`과 `dev`는 origin에 push할 경우
각 `gomin.zone`, `dev.gomin.zone`에 배포되도록 CD 설정되어있음.

## 기능 개발 로직
### 1. github issue 생성 
해당 스프린트에 개발해야하는 기능을 페이지단위로 묶어서 open.
    <br/>
_000 퍼블리싱, 000 로직 구성, ㅁㅁㅁ 퍼블리싱, ㅁㅁㅁ 로직 구성, api 연동_ 정도로 권장.
### 2. 브랜치 생성
dev 브랜치 기준으로 `issue-00`라는 이름의 브랜치를 생성
### 3. 기능 개발
파이팅 >_<
<br/><br/>
**앵귤러** 커밋 컨벤션을 변형해서 이용.
<br/>

[공식문서](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit-message-header)

```
<type>(<scope>): <short summary>
  │       │             │
  │       │             └─⫸ Summary in present tense. Not capitalized. No period at the end.
  │       │
  │       └─⫸ Commit Scope: animations|bazel|benchpress|common|compiler|compiler-cli|core|
  │                          elements|forms|http|language-service|localize|platform-browser|
  │                          platform-browser-dynamic|platform-server|router|service-worker|
  │                          upgrade|zone.js|packaging|changelog|docs-infra|migrations|
  │                          devtools
  │
  └─⫸ Commit Type: build|ci|docs|feat|fix|perf|refactor|test
```
scope는 아래와 같이 커스텀해서 이용함.<br/>
scope가 카멜케이스 -> 기능 단위에 대한 범위.
scope가 파스칼케이스 -> 특정 컴포넌트나 페이지에 대한 범위.

### 4. issue를 dev로 merge
issue 브랜치를 이용해서 개발한 기능은 
스퀴싱 또는 merge 중 편한대로.
단, PR을 이용하지 말고 로컬에서 병합처리.

### 5. 버전 관리 및 origin/dev에 push
버전은 uri: /settings 에서 확인할 수 있음. <br/>
기능개발이 완료되었든, QC 진행, main에 머지 전 등의 이유로 
버전에 대한 표기가 필요할 경우.<br/>
dev 브랜치에서 src/version.js 의 버전을 수정하고, 
`Version 0.0.0.0` 와 같은 형식으로 커밋후 origin/dev에 push.

### 6. QC
QC 노션을 참고하여 수정작업 진행 후  dev에 푸시.

### 7. origin/main에 PR open
스프린트 중 개발기간이 끝나가거나, 핫픽스가 
dev->main 방향으로 `Version 0.0.0.0`과 같은 형식의 PR을 오픈. <br/>
코드리뷰등 중간과정을 모두 거친 후,
머지를 진행하는데 이때, 머지 클릭시 제목의 `Merge ~`라는 문구를 본문으로 옮기고,
제목에는 `Version 0.0.0.0 release` 라는 이름으로 병합 진행

즉, 커밋기록 기준으로 
버전 표시를 위한 커밋은 `Version 0.0.0.0`이고,
dev->main merge를 위한 커밋은 `Version 0.0.0.0 release`이다. 

### 참고.
실수로 개발내용을 main에 바로 푸시한 경우
<br/> 깃허브 액션에서 이전 작업을 찾아서 해당 작업을 재시작.

## 라우팅 및 네비게이션
_23.05.26 기준_
```js
export const RouteURL = {
home: "/", // 리스트형 게시글
feed: "/feed", // 피드형 게시글
feed_star: "/feed/:id", // 피드형 게시글 (특정 id 조회)
feed_route_star: "/feed/:id/:route", // 피드형 게시글, (특정 id 조회 + my, participated 케이스)
login: "/login", // 로그인
login_oauth_kakao: "/login/oauth/kakao", // 카카오 로그인시 리다이렉트 
register_term: "/register/term", // 약관동의
onboarding: "/onboarding", //온보딩 (미사용)
write: "/write", // 글쓰기 페이지
collect_information: "/collect-information", // 개인정보 수집
user: "/user", // 유저 프로필(내정보, 내가 쓴글, 내가 참여한 글)
settings: "/settings", // 설정 및 버전
edit_profile: "/edit-profile", // 유저 프로필 수정
not_found: "/*", // not found
auth_check: "/auth-check", // HOC적용이 힘든 케이스에 사용할 검증 컴포넌트(댓글 컴포넌트 등)
};
```

## 파일 구조
```
┣ 📂public
┃ ┣ 📂logo # 로고들 모음
┃ ┣ 📜index.html 
┃ ┣ 📜manifest.json
┃ ┗ 📜robots.txt
┣ 📂src
┃ ┣ 📂apis # 미사용
┃ ┣ 📂atom # 전역 상태관리
┃ ┣ 📂constants # 상수 값, enum
┃ ┣ 📂dataManager # 외부 서비스로 데이터들을 관리하는 툴
┃ ┣ 📂HOC # 고차 검포넌트
┃ ┃ ┗ 📜WithAuth.tsx # 페이지에 접속할때 로그인 유무를 파악
┃ ┣ 📂hooks # 커스텀 훅
┃ ┣ 📂images # 이미지
┃ ┣ 📂style # 공통으로 관리하는 css
┃ ┣ 📂type # 전역에서 사용하는 타입 선언
┃ ┣ 📂utils # 유틸리티 함수
┃ ┣ 📂_components 컴포넌트
┃ ┃ ┣ 📂banner # PWA 업데이트시 사용되는 상단 배너
┃ ┃ ┃ ┗ 📜UpdateBanner.tsx
┃ ┃ ┣ 📂chat # 채팅 
┃ ┃ ┃ ┣ 📜BottomSheetContent.tsx
┃ ┃ ┃ ┗ 📜ChatBottomSheet.tsx
┃ ┃ ┣ 📂collectInformation # (회원가입) 개인정보 수집
┃ ┃ ┃ ┣ 📜BirthDateForm.tsx
┃ ┃ ┃ ┣ 📜CollectNicknameAgeGender.tsx
┃ ┃ ┃ ┣ 📜CollectRegionJobCategory.tsx
┃ ┃ ┃ ┣ 📜MultiPickerComponent.tsx
┃ ┃ ┃ ┗ 📜NicknameForm.tsx
┃ ┃ ┣ 📂common # 공통 컴포넌트
┃ ┃ ┃ ┣ 📜TopAppBar.tsx #상단 앱바
┃ ┃ ┃ ┣ 📜BottomContinueBar.tsx # 하단 컨티뉴 바
┃ ┃ ┃ ┣ 📜BottomAppBar.tsx # 하단 메뉴바
┃ ┃ ┃ ┣ 📜GNBHOC.tsx # 하단 메뉴바의 HOC 관리 컴포넌트
┃ ┃ ┃ ┗ 📜PostUserProfile.tsx #유저 프로필(게시글, 댓글등에 사용)
┃ ┃ ┣ 📂login # 로그인
┃ ┃ ┃ ┗ 📜Checkbox.tsx
┃ ┃ ┣ 📂modal # 모달 각자
┃ ┃ ┃ ┣ 📜CloseButton.tsx
┃ ┃ ┃ ┣ 📜main.tsx
┃ ┃ ┃ ┣ 📜ResultWithoutVote.tsx
┃ ┃ ┃ ┣ 📜styles.js
┃ ┃ ┃ ┗ 📜Survey.tsx
┃ ┃ ┣ 📂post # 포스트
┃ ┃ ┃ ┣ 📂feed # 피드형
┃ ┃ ┃ ┃ ┣ 📜PostDetail.tsx
┃ ┃ ┃ ┃ ┗ 📜PostVote.tsx
┃ ┃ ┃ ┣ 📂list #리스트형
┃ ┃ ┃ ┃ ┣ 📜PostCard.tsx
┃ ┃ ┃ ┃ ┗ 📜PostCardList.tsx
┃ ┃ ┃ ┗ 📜PostUserProfile.tsx
┃ ┃ ┣ 📂user # 유저, 프로필
┃ ┃ ┃ ┣ 📜SelectMyPostType.tsx
┃ ┃ ┃ ┗ 📜PostUserProfile.tsx
┃ ┃ ┗ 📂vote # 투표 컴포넌트
┃ ┃ ┃ ┣ 📜VoteComponent.tsx
┃ ┃ ┃ ┣ 📜VoteContentComponent.tsx
┃ ┃ ┃ ┣ 📜VoteContentTextComponent.tsx
┃ ┃ ┃ ┣ 📜VoteContentVoteComponent.tsx
┃ ┃ ┃ ┣ 📜VoteTitle.tsx
┃ ┃ ┃ ┗ 📜VoteToolbar.tsx
┃ ┣ 📂_pages # 페이지
┃ ┃ ┣ 📂collectInformation
┃ ┃ ┃ ┗ 📜CollectInformationPage.tsx
┃ ┃ ┣ 📂home # 메인
┃ ┃ ┃ ┣ 📜FeedPage.tsx # 피드형
┃ ┃ ┃ ┗ 📜HomePage.tsx # 리스트형
┃ ┃ ┣ 📂login # 로그인, 회원가입 관련
┃ ┃ ┃ ┣ 📜LoginPage.tsx
┃ ┃ ┃ ┣ 📜LoginOauthKakaoPage.tsx
┃ ┃ ┃ ┣ 📜OnboardingPage.tsx
┃ ┃ ┃ ┗ 📜RegisterTermPage.tsx
┃ ┃ ┣ 📂modal # 모달 컨트롤러 (내부 구성은 컴포넌트 폴더에)
┃ ┃ ┃ ┗ 📜ModalController.tsx
┃ ┃ ┣ 📂user # 유저, 프로필
┃ ┃ ┃ ┣ 📜EditProfilePage.tsx
┃ ┃ ┃ ┣ 📜SettingsPage.tsx
┃ ┃ ┃ ┗ 📜UserPage.tsx
┃ ┃ ┣ 📂write # 글쓰기 페이지
┃ ┃ ┃ ┗ 📜WritePage.tsx
┃ ┃ ┗ 📜AuthCheckPage.tsx
┃ ┣ 📜App.css
┃ ┣ 📜App.test.tsx # 미사용
┃ ┣ 📜App.tsx # 리액트 라우트. RouteURL 참고.
┃ ┣ 📜AppWrapper.tsx
┃ ┣ 📜index.css
┃ ┣ 📜main.tsx
┃ ┣ 📜logo.svg # 미사용
┃ ┣ 📜react-app-env.d.ts # 미사용
┃ ┣ 📜reportWebVitals.ts # 미사용
┃ ┣ 📜my-sw.js # PWA를 위한 서비스 워커
┃ ┣ 📜serviceWorkerRegistration.ts # PWA를 위한 서비스 워커
┃ ┣ 📜setupTests.ts # 미사용
┃ ┗ 📜version.js # 버전 커밋
┣ 📜.env.development # dev 환경 환경변수
┣ 📜.env.production # prod 환경 환경변수
┣ 📜.env.test # test 환경 환경변수 (미사용)
┣ 📜.gitignore
┣ 📜package-lock.json
┣ 📜package.json
┣ 📜readme.md
┗ 📜tsconfig.json
```

작성자: **[Kid-Chang](https://github.com/Kid-Chang)**
