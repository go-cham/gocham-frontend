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
