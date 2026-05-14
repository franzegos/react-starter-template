import { z } from "zod";

/** Example: validate JSON Placeholder `/posts/:id` (or similar) responses. */
export const demoPostSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

export type DemoPost = z.infer<typeof demoPostSchema>;
