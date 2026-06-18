import api from "@/api/client";
import { demoPostSchema } from "@/api/features/demo/demo.schema";

export async function fetchDemoPost(signal?: AbortSignal) {
  const { data } = await api.get("/posts/1", { signal });
  return demoPostSchema.parse(data);
}
