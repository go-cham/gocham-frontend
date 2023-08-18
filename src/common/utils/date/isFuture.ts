export function isFuture(year: number, month: number, day: number) {
  const date = new Date(year, month - 1, day);
  const now = new Date();
  return date.getTime() > now.getTime();
}
