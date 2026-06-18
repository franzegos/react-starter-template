import { describe, expect, it } from "vitest";
import { demoPostSchema } from "@/api/features/demo/demo.schema";

describe("demoPostSchema", () => {
  it("parses a valid post", () => {
    const parsed = demoPostSchema.parse({
      userId: 1,
      id: 2,
      title: "Title",
      body: "Body",
    });
    expect(parsed.title).toBe("Title");
  });

  it("rejects missing title", () => {
    expect(() =>
      demoPostSchema.parse({ userId: 1, id: 2, body: "Body" }),
    ).toThrow();
  });
});
