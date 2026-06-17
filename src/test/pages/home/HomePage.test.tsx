import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HomePage } from "@/pages/home/HomePage";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { renderWithProviders } from "@/test/helpers/renderWithProviders";

vi.mock("@/api/queries/use-demo", () => ({
  useDemoPost: () => ({
    data: { userId: 1, id: 1, title: "Demo title", body: "Demo body" },
    isPending: false,
    isError: false,
    error: null,
    refetch: () => undefined,
    isFetching: false,
  }),
}));

describe("HomePage", () => {
  it("renders the starter shell", () => {
    renderWithProviders(
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <HomePage />
      </ThemeProvider>,
    );

    expect(
      screen.getByRole("heading", { name: "cursor-frontend-template" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Personal webapp frontend template"),
    ).toBeInTheDocument();
    expect(screen.getByText("Demo title")).toBeInTheDocument();
  });
});
