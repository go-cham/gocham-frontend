export function calculateAge(year: number, month: number, day: number) {
  const today = new Date();
  const birthday = new Date(year, month - 1, day);

  let age = today.getFullYear() - birthday.getFullYear();
  const monthDiff = today.getMonth() - birthday.getMonth();
  const dayDiff = today.getDate() - birthday.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
}
