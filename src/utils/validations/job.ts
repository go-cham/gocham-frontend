import { hasSpecialChars } from '@/utils/validations/hasSpecialChars';

export function validateJob(job: string) {
  if (!job) {
    return '본인의 직업을 입력해주세요.';
  }
  if (job.length < 2) {
    return '최소 2자 이상 입력해야 합니다.';
  }
  if (job.length > 20) {
    return '20자 이내로 입력 가능합니다.';
  }
  if (hasSpecialChars(job)) {
    return '특수 문자 입력이 불가합니다.';
  }
  // if (true) {
  //   return '금칙어 입력이 불가합니다.';
  // }
  return null;
}
