export function getRemainingTime(
  deadline: string | null
): null | 'closed' | string {
  if (!deadline) {
    return null;
  }
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

// https://yozm.wishket.com/magazine/detail/1695/
// Z가 빠져야한다. 왜? 현지시간이 아닌 UTC 기준으로 측정해서...
