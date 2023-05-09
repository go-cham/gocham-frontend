export function getRemainingTime(deadline: string | any): string {
  if (typeof deadline !== "string") {
    return "";
  }
  const deadlineDate = new Date(deadline);
  const now = new Date();

  if (deadlineDate < now) {
    return "마감됨";
  }

  const remainingTime = Math.abs(deadlineDate.getTime() - now.getTime());
  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remainingTime / 1000 / 60) % 60);

  return `마감까지 ${days}일 ${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;
}
