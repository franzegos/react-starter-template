import { demoPostSchema } from "@/api/schema/demo.schema";
import { api } from "@/api/client";

export async function fetchDemoPost() {
  const { data } = await api.get("/posts/1");
  return demoPostSchema.parse(data);
}
