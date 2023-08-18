export function hasSpecialChars(str: string) {
  return /[!@#$%^&*(),.?":{}|<>/\\]/.test(str);
}
