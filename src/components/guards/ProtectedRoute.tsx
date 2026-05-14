type ProtectedRouteProps = {
  children: React.ReactNode;
  /** When false, `fallback` is shown instead of `children`. */
  isAllowed: boolean;
  fallback?: React.ReactNode;
};

/** Layout/route guard — wire `isAllowed` to auth when you add it (no router required). */
export function ProtectedRoute({
  children,
  isAllowed,
  fallback = null,
}: ProtectedRouteProps) {
  if (!isAllowed) return fallback;
  return children;
}
