/** Public env — document keys in `.env.example`. */
export function getAPIBaseURL(): string {
  return import.meta.env.VITE_API_URL ?? "";
}
