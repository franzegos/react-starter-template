import type { UseQueryResult } from "@tanstack/react-query";
import type { DemoPost } from "@/api/features/demo/demo.schema";

export type DemoPostStatus = "loading" | "error" | "empty" | "ready";

export function getDemoPostStatus(
  query: UseQueryResult<DemoPost>,
): DemoPostStatus {
  if (query.isPending) return "loading";
  if (query.isError && !query.data) return "error";
  if (!query.data) return "empty";
  return "ready";
}
