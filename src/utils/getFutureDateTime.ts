function getFutureDateTime(hoursToAdd: number | null): string | null {
  if (hoursToAdd === null) return null;
  const currentDate = new Date();
  const futureDate = new Date(
    currentDate.getTime() + hoursToAdd * 60 * 60 * 1000
  );

  const year = futureDate.getFullYear();
  const month = (futureDate.getMonth() + 1).toString().padStart(2, "0");
  const date = futureDate.getDate().toString().padStart(2, "0");
  const hours = futureDate.getHours().toString().padStart(2, "0");
  const minutes = futureDate.getMinutes().toString().padStart(2, "0");
  const seconds = futureDate.getSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
}

export default getFutureDateTime;
