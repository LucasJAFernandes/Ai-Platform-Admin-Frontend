export function setStoredValue<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;

  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getStoredValue<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;

  const value = window.localStorage.getItem(key);
  if (value === null) return null;

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export function removeStoredValue(key: string): void {
  if (typeof window === 'undefined') return;

  window.localStorage.removeItem(key);
}