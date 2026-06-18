import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HomePage } from "@/pages/home/HomePage";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { renderWithProviders } from "@/test/helpers/renderWithProviders";

const mockUseDemoPost = vi.fn();

vi.mock("@/api/features/demo/use-demo", () => ({
  useDemoPost: () => mockUseDemoPost(),
}));

function renderHome() {
  return renderWithProviders(
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <HomePage />
    </ThemeProvider>,
  );
}

describe("HomePage", () => {
  it("renders ready state with mapped post content", () => {
    mockUseDemoPost.mockReturnValue({
      data: { userId: 1, id: 1, title: "Demo title", body: "Demo body" },
      isPending: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
      isFetching: false,
    });

    renderHome();

    expect(
      screen.getByRole("heading", { name: "personal-ai-frontend-template" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Demo title")).toBeInTheDocument();
    expect(screen.getByText("Demo body")).toBeInTheDocument();
  });

  it("renders loading skeleton for sample request", () => {
    mockUseDemoPost.mockReturnValue({
      data: undefined,
      isPending: true,
      isError: false,
      error: null,
      refetch: vi.fn(),
      isFetching: false,
    });

    renderHome();

    expect(screen.getByLabelText("Loading post")).toBeInTheDocument();
  });

  it("renders error state with retry", () => {
    mockUseDemoPost.mockReturnValue({
      data: undefined,
      isPending: false,
      isError: true,
      error: new Error("Network error"),
      refetch: vi.fn(),
      isFetching: false,
    });

    renderHome();

    expect(screen.getByText("Couldn't load sample post")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Retry" })).toBeInTheDocument();
  });
});
