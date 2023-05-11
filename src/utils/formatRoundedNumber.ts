export function formatRoundedNumber(num: number): string {
  if (Number.isInteger(num)) {
    return num.toString();
  } else {
    return num.toFixed(1);
  }
}
