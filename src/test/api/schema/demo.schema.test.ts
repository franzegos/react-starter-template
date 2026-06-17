import { describe, expect, it } from "vitest";
import { demoPostSchema } from "@/api/schema/demo.schema";
import { nonEmptyString } from "@/api/schema/primitives.schema";

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

describe("nonEmptyString", () => {
  it("trims and accepts non-empty values", () => {
    expect(nonEmptyString.parse("  hello  ")).toBe("hello");
  });

  it("rejects empty strings", () => {
    expect(() => nonEmptyString.parse("   ")).toThrow();
  });
});
