import { describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { makeQueryWrapper } from "@/test/helpers/queryWrapper";

vi.mock("@/api/features/demo/demo.service", () => ({
  fetchDemoPost: vi.fn(),
}));

import { fetchDemoPost } from "@/api/features/demo/demo.service";
import { useDemoPost } from "@/api/features/demo/use-demo";

const mockedFetch = vi.mocked(fetchDemoPost);

describe("useDemoPost", () => {
  it("returns data on success", async () => {
    const post = { userId: 1, id: 1, title: "T", body: "B" };
    mockedFetch.mockResolvedValueOnce(post);
    const { wrapper } = makeQueryWrapper();

    const { result } = renderHook(() => useDemoPost(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(post);
  });

  it("surfaces service errors", async () => {
    mockedFetch.mockRejectedValueOnce(new Error("Network error"));
    const { wrapper } = makeQueryWrapper();

    const { result } = renderHook(() => useDemoPost(), { wrapper });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toBe("Network error");
  });
});
