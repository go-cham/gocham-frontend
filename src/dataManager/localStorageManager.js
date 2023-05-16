export function getBearerToken() {
  const token = window.localStorage.getItem("token");

  return token ? token : null;
}

export function deleteBearerToken() {
  window.localStorage.removeItem("token");
}
