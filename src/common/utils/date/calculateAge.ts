export function calculateAge(year: number, month: number, day: number) {
  const today = new Date();
  const birthDate = new Date(year, month - 1, day);

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
}

export function calculateAgeFromBirthDate(birthDate: string) {
  const date = new Date(birthDate);
  return calculateAge(date.getFullYear(), date.getMonth() + 1, date.getDate());
}
