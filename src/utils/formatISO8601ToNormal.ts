export function formatISO8601ToNormal(dateString: string) {
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = `0${date.getUTCMonth() + 1}`.slice(-2);
  const day = `0${date.getUTCDate()}`.slice(-2);
  return `${year}-${month}-${day}`;
}
