import { useQuery } from "@tanstack/react-query";
import { fetchDemoPost } from "@/api/features/demo/demo.service";

export const demoPostQueryKey = ["demo", "post"] as const;

export function useDemoPost() {
  return useQuery({
    queryKey: demoPostQueryKey,
    queryFn: ({ signal }) => fetchDemoPost(signal),
  });
}
