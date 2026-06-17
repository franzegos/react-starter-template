import api from "@/api/client";
import { demoPostSchema } from "@/api/schema/demo.schema";

export async function fetchDemoPost() {
  const { data } = await api.get("/posts/1");
  return demoPostSchema.parse(data);
}
