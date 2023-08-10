export function parseDateString(
  dateString: string,
): { year: string; month: string; day: string } | null {
  const date = new Date(dateString);

  if (!isNaN(date.getTime())) {
    const year = date.getFullYear() + '';
    const month = date.getMonth() + 1 + '';
    const day = date.getDate() + '';

    return { year, month, day };
  }
  return null;
}
