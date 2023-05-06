const API = process.env.REACT_APP_SERVER_API;

export const EndPoint = {
  TEST: `${API}/test`,
  login: {
    get: {
      KAKAO_AUTH: `${API}/auth/kakao`, // 관리자 로그인 api
      KAKAO_AUTH_CALLBACK: `${API}/auth/kakao-call-back`, // 관리자 로그인 api
    },
  },
  user: {
    get: {
      USER_TYPE: `${API}/user/type`, // 첫 유저 정보 추가 api
    },
    patch: {
      USER: `${API}/user`, // 첫 유저 정보 추가 api
      USER_ACCEPTANCE_OF_TERMS: `${API}/user/acceptance-of-terms`, // 첫 유저 정보 추가 api
    },
  },
  worry: {
    get: {
      WORRIES: `${API}/worries`, // 고민 조회 api (페이지네이션)
      WORRY_CHOICE: `${API}/worry-choice`, // 고민 선택지 조회 api
      USER_WORRY_CHOICE: `${API}/user-worry-choice`, // 고민 선택지 투표 조회 api
    },
    post: {
      WORRIES_USERID: `${API}/worries`, // 고민 상세 조회 api
      USER_WORRY_CHOICE: `${API}/user-worry-choice`, // 고민 선택지 투표 api
      WORRY: `${API}/worry`, // 고민 게시글 작성 api
      WORRY_REPLY: `${API}/worry-reply`, // 고민 게시글 댓글 작성 api
    },
  },
};
