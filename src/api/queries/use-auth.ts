/**
 * Replace with a real auth source (Zustand mirror, context, etc.).
 * Export `useAuthAccessToken()` so query hooks can gate on the same token the Axios client uses.
 */
export function useAuthAccessToken(): string | null {
  return null;
}
