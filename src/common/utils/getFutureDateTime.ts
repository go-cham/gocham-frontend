/**
 * n시간을 입력하면 현재로부터 n시간 후가 몇시인지를 알려주는 함수
 * @param hoursToAdd
 */
function getFutureDateTime(hoursToAdd: number): string {
  if (hoursToAdd === 0) return '';
  const currentDate = new Date();
  const futureDate = new Date(
    currentDate.getTime() + hoursToAdd * 60 * 60 * 1000,
  );

  const year = futureDate.getFullYear();
  const month = (futureDate.getMonth() + 1).toString().padStart(2, '0');
  const date = futureDate.getDate().toString().padStart(2, '0');
  const hours = futureDate.getHours().toString().padStart(2, '0');
  const minutes = futureDate.getMinutes().toString().padStart(2, '0');
  const seconds = futureDate.getSeconds().toString().padStart(2, '0');

  return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
}

export default getFutureDateTime;
