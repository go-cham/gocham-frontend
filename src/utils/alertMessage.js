export const defaultErrorMessage = "관리자에게 문의하세요.";
export const alertMessage = {
  error: {
    user: {
      deactivatedUser: `비활성화된 계정입니다. ${defaultErrorMessage}`,
      dormantUser: `휴먼 계정입니다. ${defaultErrorMessage}`,
      onceUser: `개인정보를 아직 입력하지 않으셨군요! 해당 페이지로 이동합니다.`,
    },
    register: {
      didntAgreeTerm: `약관동의에 문제가 발생하였습니다. ${defaultErrorMessage}`,
    },
    post: {
      noUploadPermission: `업로드 권한이 없는 유저입니다. ${defaultErrorMessage}`, //denyUploadWithWrongPermissionBecauseWithoutTerms
      failedUploadImage: `이미지 업로드에 실패했습니다. ${defaultErrorMessage}`,
    },
  },
  report: {
    post: "포스팅이 정상적으로 신고되었습니다.",
  },
};
