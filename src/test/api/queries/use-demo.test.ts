import { describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { makeQueryWrapper } from "@/test/helpers/queryWrapper";

vi.mock("@/api/services/demo", () => ({
  fetchDemoPost: vi.fn(),
}));

import { fetchDemoPost } from "@/api/services/demo";
import { useDemoPost } from "@/api/queries/use-demo";

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
