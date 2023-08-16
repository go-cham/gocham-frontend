export function focusById(id: string) {
  const el = document.getElementById(id);
  el && el.focus();
}
