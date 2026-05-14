import {
  type UseQueryOptions,
  type UseQueryResult,
  useQuery,
} from "@tanstack/react-query";

type UseAuthenticatedQueryOptions<
  TQueryFnData,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends readonly unknown[] = readonly unknown[],
> = Omit<
  UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  "enabled"
> & {
  /** JWT or session token — query does not run when missing. */
  accessToken: string | null | undefined;
  enabled?: boolean;
};

/**
 * Auth-gated `useQuery`: disabled until `accessToken` is truthy.
 * Pair with `useAuthAccessToken()` from `use-auth.ts` when you add real auth.
 */
export function useAuthenticatedQuery<
  TQueryFnData,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends readonly unknown[] = readonly unknown[],
>(
  options: UseAuthenticatedQueryOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryKey
  >,
): UseQueryResult<TData, TError> {
  const { accessToken, enabled: enabledOption, ...rest } = options;
  const hasToken = Boolean(accessToken);

  return useQuery({
    ...rest,
    enabled: hasToken && (enabledOption ?? true),
  });
}
