import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * `true` in the browser after hydration, `false` during SSR / first server pass.
 * Prefer this over `useEffect` + `setState` for client-only gates.
 */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
