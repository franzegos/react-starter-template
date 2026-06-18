import { describe, expect, it } from "vitest";
import { mapDemoPostToCard } from "@/lib/demo/mapDemoPostToCard";

describe("mapDemoPostToCard", () => {
  it("maps API fields to card model", () => {
    expect(
      mapDemoPostToCard({
        userId: 2,
        id: 3,
        title: "Hello",
        body: "World",
      }),
    ).toEqual({
      headline: "Hello",
      excerpt: "World",
    });
  });
});
