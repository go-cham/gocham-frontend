export function getBearerToken() {
  const token = window.localStorage.getItem("token");

  return token ? token : null;
}
