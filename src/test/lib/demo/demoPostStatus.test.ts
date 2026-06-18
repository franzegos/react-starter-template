import { describe, expect, it } from "vitest";
import type { UseQueryResult } from "@tanstack/react-query";
import type { DemoPost } from "@/api/features/demo/demo.schema";
import { getDemoPostStatus } from "@/lib/demo/demoPostStatus";

function mockQuery(
  partial: Partial<UseQueryResult<DemoPost>>,
): UseQueryResult<DemoPost> {
  return partial as UseQueryResult<DemoPost>;
}

const samplePost: DemoPost = {
  userId: 1,
  id: 1,
  title: "Title",
  body: "Body",
};

describe("getDemoPostStatus", () => {
  it("returns loading when pending", () => {
    expect(
      getDemoPostStatus(mockQuery({ isPending: true, isError: false })),
    ).toBe("loading");
  });

  it("returns error when failed with no cached data", () => {
    expect(
      getDemoPostStatus(
        mockQuery({ isPending: false, isError: true, data: undefined }),
      ),
    ).toBe("error");
  });

  it("returns ready when errored but cached data exists", () => {
    expect(
      getDemoPostStatus(
        mockQuery({ isPending: false, isError: true, data: samplePost }),
      ),
    ).toBe("ready");
  });

  it("returns empty when success without data", () => {
    expect(
      getDemoPostStatus(
        mockQuery({ isPending: false, isError: false, data: undefined }),
      ),
    ).toBe("empty");
  });

  it("returns ready when data exists", () => {
    expect(
      getDemoPostStatus(
        mockQuery({ isPending: false, isError: false, data: samplePost }),
      ),
    ).toBe("ready");
  });
});
