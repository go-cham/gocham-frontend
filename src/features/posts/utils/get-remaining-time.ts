export function getRemainingTime(
  deadline: string | null,
): 'closed' | string | null {
  if (!deadline) {
    return null;
  }
  /*
  TODO: 현재 DB에 UTC 형식으로 저장되어 있지만 시간은 한국 시간을 사용 중
        추후 백엔드에서 timezone 에러 해결 시 코드 변경하기
   */
  const deadlineDate = new Date(deadline.replace('Z', ''));
  const now = new Date();

  if (deadlineDate < now) {
    return 'closed';
  }

  const remainingTime = Math.abs(deadlineDate.getTime() - now.getTime());
  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);

  return `마감까지 ${days}일 ${hours < 10 ? '0' + hours : hours}시간 ${
    minutes < 10 ? '0' + minutes : minutes
  }분`;
}
