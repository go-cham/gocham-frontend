/**
 *  ISO 8601 타입의 날짜를 프론트에 적절하게 처리하는 함수.
 * @param dateStr  "2023-05-06T18:10:53.000Z"
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffHours < 24) {
    return `${diffHours}시간 전`;
  } else if (diffDays === 1) {
    return "1일 전";
  } else if (diffDays > 1) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
  } else {
    // 이 부분은 날짜가 잘못되었을 경우를 대비한 보충 로직입니다.
    return "";
  }
}
