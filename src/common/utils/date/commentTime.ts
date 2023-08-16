export default function commentTime(createdAt: string) {
  const date = new Date(createdAt);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const hour = date.getUTCHours();
  const minute = date.getUTCMinutes();
  const second = date.getUTCSeconds();

  const nowDate = new Date();

  const year1 = nowDate.getFullYear();
  const month1 = nowDate.getMonth() + 1;
  const day1 = nowDate.getDate();
  const hour1 = nowDate.getHours();
  const minute1 = nowDate.getMinutes();
  const second1 = nowDate.getSeconds();

  const ONE_MINUTE = 60;
  const ONE_HOUR = 60 * ONE_MINUTE;
  const ONE_DAY = 24 * ONE_HOUR;
  const ONE_WEEK = 7 * ONE_DAY;

  const timestamp =
    (year1 - year) * 31536000 +
    (month1 - month) * 2592000 +
    (day1 - day) * ONE_DAY +
    (hour1 - hour) * ONE_HOUR +
    (minute1 - minute) * ONE_MINUTE +
    (second1 - second);

  if (timestamp < ONE_MINUTE) {
    return '방금 전';
  } else if (timestamp < ONE_HOUR) {
    const minutesElapsed = Math.floor(timestamp / ONE_MINUTE);
    return `${minutesElapsed}분 전`;
  } else if (timestamp < ONE_DAY) {
    const hoursElapsed = Math.floor(timestamp / ONE_HOUR);
    return `${hoursElapsed}시간 전`;
  } else if (timestamp < ONE_WEEK) {
    const daysElapsed = Math.floor(timestamp / ONE_DAY);
    return `${daysElapsed}일 전`;
  } else {
    return `${year}년 ${month}월 ${day}일`;
  }
}
