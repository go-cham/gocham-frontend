export function validateNickname(nickname: string) {
  if (nickname.length > 10) {
    return '10자 이내 입력 가능합니다.';
  }
  if (nickname.length < 2) {
    return '최소 2자 이상 입력해야 합니다.';
  }
  if (/[!@#$%^&*(),.?":{}|<>]/.test(nickname)) {
    return '특수 문자 입력이 불가합니다.';
  }
  if (/\s/.test(nickname)) {
    return '띄어쓰기 입력이 불가합니다.';
  }
  // if (true) {
  //   return '금칙어 입력이 불가합니다.';
  // }
  // if (true) {
  //   return '이미 존재하는 닉네임입니다.';
  // }
  return null;
}
