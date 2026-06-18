import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/api/client", () => ({
  default: { get: vi.fn() },
}));

import api from "@/api/client";
import { fetchDemoPost } from "@/api/features/demo/demo.service";

const mockedApi = api as unknown as { get: ReturnType<typeof vi.fn> };

describe("fetchDemoPost", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("GET /posts/1 and parses the response", async () => {
    mockedApi.get.mockResolvedValueOnce({
      data: {
        userId: 1,
        id: 1,
        title: "Hello",
        body: "World",
      },
    });

    const result = await fetchDemoPost();

    expect(mockedApi.get).toHaveBeenCalledWith("/posts/1", {
      signal: undefined,
    });
    expect(result).toEqual({
      userId: 1,
      id: 1,
      title: "Hello",
      body: "World",
    });
  });

  it("forwards AbortSignal to the client", async () => {
    const controller = new AbortController();
    mockedApi.get.mockResolvedValueOnce({
      data: { userId: 1, id: 1, title: "T", body: "B" },
    });

    await fetchDemoPost(controller.signal);

    expect(mockedApi.get).toHaveBeenCalledWith("/posts/1", {
      signal: controller.signal,
    });
  });

  it("rethrows when the response fails schema validation", async () => {
    mockedApi.get.mockResolvedValueOnce({ data: { id: "not-a-number" } });

    await expect(fetchDemoPost()).rejects.toThrow();
  });
});
