const ONE_HOUR_IN_MILLISECONDS =
  parseInt(process.env.NEXT_PUBLIC_STORAGE_TIME || "") * 1000;
  const TOKEN_KEY = "seees_token";
export function saveToken(token: string) {
  saveToLocalStorage(TOKEN_KEY, token, ONE_HOUR_IN_MILLISECONDS);
}
export function saveToLocalStorage(
  key: string,
  value: string,
  expirationTime: number
) {
  const now = new Date();
  const item = {
    value: value,
    expirationTime: now.getTime() + expirationTime,
  };
  localStorage.setItem(key, JSON.stringify(item));
}
export function getToken() {
  return getWithExpiry(TOKEN_KEY);
}
export function getWithExpiry(key: string) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expirationTime) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}
