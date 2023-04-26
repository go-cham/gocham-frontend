const API = process.env.REACT_APP_API;
const NEORDINARY_API = process.env.REACT_APP_NEORDINARY_API;

export const EndPoint = {
  login: {
    post: {
      ADMIN_AUTH_SIGN_IN: `${API}/admin/auth/sign-in`, // 관리자 로그인 api
    },
  },
  register: {
    post: {
      ADMIN_AUTH_SIGN_UP: `${API}/admin/auth/sign-up`, // 관리자 회원가입 api
    },
  },
  nerds: {
    get: {
      ADMIN_NERDS: `${API}/admin/nerds`, // 관리자 작업자 리스트 조회 api
      ADMIN_NERDS_NERDID: `${API}/admin/nerds/:nerdId`, // 관리자 작업자 리스트 상세 조회 api
    },
    patch: {
      ADMIN_NERDS_NERDID: `${API}/admin/nerds/:nerdId`, // 관리자 작업자 상태값 변경 api
    },
  },
  requesters: {
    get: {
      ADMIN_REQUESTERS: `${API}/admin/requesters`, // 관리자 의뢰자 리스트 조회 api
      ADMIN_REQUESTERS_REQUESTERID: `${API}/admin/requesters/:requesterId`, // 관리자 의뢰자 리스트 상세 조회 api
    },
    patch: {
      ADMIN_REQUESTERS_REQUESTERID: `${API}/admin/requesters/:requesterId`, // 관리자 회원가입 api
    },
  },
  test: {
    get: {
      ADMIN_TEST: `${API}/admin/test`, // 관리자 그릿지 테스트 조회 api
      ADMIN_TEST_TESTID: `${API}/admin/test/:testId`, // 관리자 그릿지 테스트 상세 조회 api
      ADMIN_TEST_DUTIES: `${API}/admin/test/duties`, // 관리자 그릿지 테스트 직무 조회 api
      ADMIN_TEST_GRIDGE_MARKERS: `${API}/admin/test/gridge-markers`, // 관리자 그릿지 채점자 리스트 api
    },
    patch: {
      ADMIN_TEST_TESTID: `${API}/admin/test/:testId`, // 관리자 테스트 정보 입력/수정 api
    },
    post: {
      ADMIN_TEST_SEND_SMS_TESTID: `${API}/admin/test/send-sms/:testId`, // 관리자 그릿지 테스트 결과 전송 api
    },
  },
  projects: {
    get: {
      ADMIN_PROJECTS_MASTER: `${API}/admin/projects/master`, // 관리자 프로젝트 전체 조회 api
      ADMIN_PROJECTS: `${API}/admin/projects`, // 관리자 프로젝트 리스트 조회 api
      ADMIN_PROJECTS_PROJECTID: `${API}/admin/projects/:projectId`, // 관리자 프로젝트 상세 조회 api
      ADMIN_PROJECTS_BILLINGS: `${API}/admin/projects/billings`, // 관리자 프로젝트 의뢰자/작업자 입금금액 조회 api
      ADMIN_PROJECTS_BILLINGS_PROJECTBILLINGID: `${API}/admin/projects/billings/:projectBillingId`, // 관리자 프로젝트 의뢰자/작업자 입금금액 상세 조회 api
      ADMIN_PROPOSALS_USER: `${API}/admin/proposals/user`, // 관리자 유저 기획서 리스트 조회 api
      ADMIN_PROJECTS_PROJECT_MANAGERS: `${API}/admin/projects/project-managers`, // 관리자 프로젝트 매니저 리스트 조회 api
    },
    post: {
      ADMIN_PROJECTS: `${API}/admin/projects`, // 관리자 프로젝트 등록 api
      ADMIN_PROJECTS_BILLINGS: `${API}/admin/projects/billings`, // 관리자 프로젝트 의뢰자/작업자 입금금액 추가 api
    },
    patch: {
      ADMIN_PROJECTS: `${API}/admin/projects`, // 관리자 프로젝트 수정 api
      ADMIN_PROJECTS_STATUS: `${API}/admin/projects/status`, // 관리자 프로젝트 삭제 api
      ADMIN_PROJECTS_BILLINGS: `${API}/admin/projects/billings`, // 관리자 프로젝트 의뢰자/작업자 입금금액 수정 api
      ADMIN_PROJECTS_BILLINGS_STATUS: `${API}/admin/projects/billings/status`, // 관리자 프로젝트 의뢰자/작업자 입금금액 삭제 api
    },
  },
};
