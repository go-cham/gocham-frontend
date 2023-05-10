/**
 * 시간을 입력해주면 유저들이 알아보기 편하게 가까운 시간은 적절한 텍스트로 전환하는 함수
 * @param date
 */
export function formatDate(date: string): string {
  const now = new Date();
  const dateObj = new Date(date);
  const diff = (now.getTime() - dateObj.getTime()) / 1000; // 초 단위로 시간차 계산

  if (diff < 60) {
    return "방금 전";
  } else if (diff < 3600) {
    const minutes = Math.floor(diff / 60);
    return `${minutes}분 전`;
  } else if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    return `${hours}시간 전`;
  } else if (diff < 172800) {
    return "1일 전";
  } else if (diff < 2592000) {
    const days = Math.floor(diff / 86400);
    return `${days}일 전`;
  } else if (now.getFullYear() === dateObj.getFullYear()) {
    return dateObj.toLocaleString("ko-KR", { month: "long", day: "numeric" });
  } else {
    return dateObj.toLocaleString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
}
