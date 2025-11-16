import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { LeagueStandings } from "../league-standings";

// Mock the api-client
const mockGetById = vi.fn();
vi.mock("@/lib/api-client", () => ({
  apiClient: {
    leagues: {
      getById: (...args: any[]) => mockGetById(...args),
    },
  },
}));

const mockPremierLeagueStandings = [
  {
    position: 1,
    team: {
      id: 42,
      name: "Arsenal",
      logo: "https://example.com/arsenal.png",
    },
    played: 20,
    points: 50,
  },
  {
    position: 2,
    team: {
      id: 33,
      name: "Manchester City",
      logo: "https://example.com/city.png",
    },
    played: 20,
    points: 48,
  },
  {
    position: 3,
    team: {
      id: 40,
      name: "Liverpool",
      logo: "https://example.com/liverpool.png",
    },
    played: 20,
    points: 46,
  },
];

const mockLaLigaStandings = [
  {
    position: 1,
    team: {
      id: 529,
      name: "Barcelona",
      logo: "https://example.com/barca.png",
    },
    played: 20,
    points: 52,
  },
  {
    position: 2,
    team: {
      id: 541,
      name: "Real Madrid",
      logo: "https://example.com/real.png",
    },
    played: 20,
    points: 50,
  },
];

describe("LeagueStandings", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("User views league standings", () => {
    it("displays the initial league name", () => {
      render(
        <LeagueStandings
          initialStandings={mockPremierLeagueStandings}
          initialLeagueId={39}
          initialLeagueName="Premier League"
        />
      );

      expect(screen.getByText("Premier League Standings")).toBeInTheDocument();
    });

    it("displays all team names from standings", () => {
      render(
        <LeagueStandings
          initialStandings={mockPremierLeagueStandings}
          initialLeagueId={39}
          initialLeagueName="Premier League"
        />
      );

      expect(screen.getByText("Arsenal")).toBeInTheDocument();
      expect(screen.getByText("Manchester City")).toBeInTheDocument();
      expect(screen.getByText("Liverpool")).toBeInTheDocument();
    });

    it("displays team statistics (played and points)", () => {
      render(
        <LeagueStandings
          initialStandings={mockPremierLeagueStandings}
          initialLeagueId={39}
          initialLeagueName="Premier League"
        />
      );

      // Check for played games
      expect(screen.getAllByText("20").length).toBeGreaterThan(0);

      // Check for points
      expect(screen.getByText("50")).toBeInTheDocument();
      expect(screen.getByText("48")).toBeInTheDocument();
      expect(screen.getByText("46")).toBeInTheDocument();
    });

    it("displays team logos", () => {
      render(
        <LeagueStandings
          initialStandings={mockPremierLeagueStandings}
          initialLeagueId={39}
          initialLeagueName="Premier League"
        />
      );

      const arsenalLogo = screen.getByAltText("Arsenal");
      const cityLogo = screen.getByAltText("Manchester City");
      const liverpoolLogo = screen.getByAltText("Liverpool");

      expect(arsenalLogo).toBeInTheDocument();
      expect(cityLogo).toBeInTheDocument();
      expect(liverpoolLogo).toBeInTheDocument();
    });

    it("displays column headers", () => {
      render(
        <LeagueStandings
          initialStandings={mockPremierLeagueStandings}
          initialLeagueId={39}
          initialLeagueName="Premier League"
        />
      );

      expect(screen.getByText("Team")).toBeInTheDocument();
      expect(screen.getByText("P")).toBeInTheDocument();
      expect(screen.getByText("Pts")).toBeInTheDocument();
    });
  });

  describe("User navigates between leagues", () => {
    it("shows navigation arrows", () => {
      render(
        <LeagueStandings
          initialStandings={mockPremierLeagueStandings}
          initialLeagueId={39}
          initialLeagueName="Premier League"
        />
      );

      const prevButton = screen.getByLabelText("Previous league");
      const nextButton = screen.getByLabelText("Next league");

      expect(prevButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();
    });

    it("fetches and displays next league when next arrow is clicked", async () => {
      const user = userEvent.setup();

      mockGetById.mockResolvedValueOnce({
        league: mockLaLigaStandings,
      });

      render(
        <LeagueStandings
          initialStandings={mockPremierLeagueStandings}
          initialLeagueId={39}
          initialLeagueName="Premier League"
        />
      );

      const nextButton = screen.getByLabelText("Next league");
      await user.click(nextButton);

      // Should update to Championship
      await waitFor(() => {
        expect(screen.getByText("Championship Standings")).toBeInTheDocument();
      });

      // Verify API was called with correct league ID (40 for Championship)
      expect(mockGetById).toHaveBeenCalledWith("40");
    });

    it("fetches and displays previous league when previous arrow is clicked", async () => {
      const user = userEvent.setup();

      mockGetById.mockResolvedValueOnce({
        league: mockLaLigaStandings,
      });

      render(
        <LeagueStandings
          initialStandings={mockPremierLeagueStandings}
          initialLeagueId={39}
          initialLeagueName="Premier League"
        />
      );

      const prevButton = screen.getByLabelText("Previous league");
      await user.click(prevButton);

      // Should update to Ligue 1 (last in the list when going backwards from first)
      await waitFor(() => {
        expect(screen.getByText("Ligue 1 Standings")).toBeInTheDocument();
      });

      // Verify API was called with correct league ID (61 for Ligue 1)
      expect(mockGetById).toHaveBeenCalledWith("61");
    });

    it("updates standings data after navigation", async () => {
      const user = userEvent.setup();

      mockGetById.mockResolvedValueOnce({
        league: mockLaLigaStandings,
      });

      render(
        <LeagueStandings
          initialStandings={mockPremierLeagueStandings}
          initialLeagueId={39}
          initialLeagueName="Premier League"
        />
      );

      // Initially shows Premier League teams
      expect(screen.getByText("Arsenal")).toBeInTheDocument();

      const nextButton = screen.getByLabelText("Next league");
      await user.click(nextButton);

      // After clicking next, should show new standings data
      await waitFor(() => {
        expect(mockGetById).toHaveBeenCalled();
      });
    });

    it("cycles through leagues correctly", async () => {
      const user = userEvent.setup();

      mockGetById
        .mockResolvedValueOnce({ league: mockLaLigaStandings }) // Championship
        .mockResolvedValueOnce({ league: mockLaLigaStandings }) // League One
        .mockResolvedValueOnce({ league: mockLaLigaStandings }); // League Two

      render(
        <LeagueStandings
          initialStandings={mockPremierLeagueStandings}
          initialLeagueId={39}
          initialLeagueName="Premier League"
        />
      );

      const nextButton = screen.getByLabelText("Next league");

      // Click next 3 times
      await user.click(nextButton);
      await waitFor(() => expect(mockGetById).toHaveBeenCalledTimes(1));

      await user.click(nextButton);
      await waitFor(() => expect(mockGetById).toHaveBeenCalledTimes(2));

      await user.click(nextButton);
      await waitFor(() => expect(mockGetById).toHaveBeenCalledTimes(3));

      // Should have called with different league IDs
      expect(mockGetById).toHaveBeenNthCalledWith(1, "40"); // Championship
      expect(mockGetById).toHaveBeenNthCalledWith(2, "41"); // League One
      expect(mockGetById).toHaveBeenNthCalledWith(3, "42"); // League Two
    });
  });

  describe("Loading states", () => {
    it("shows loading overlay when fetching new standings", async () => {
      const user = userEvent.setup();

      // Make the API call take some time
      mockGetById.mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve({ league: [] }), 100))
      );

      render(
        <LeagueStandings
          initialStandings={mockPremierLeagueStandings}
          initialLeagueId={39}
          initialLeagueName="Premier League"
        />
      );

      const nextButton = screen.getByLabelText("Next league");
      await user.click(nextButton);

      // Should show loading state
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("does not show loading on initial render", () => {
      render(
        <LeagueStandings
          initialStandings={mockPremierLeagueStandings}
          initialLeagueId={39}
          initialLeagueName="Premier League"
        />
      );

      // Should show standings immediately, not loading
      expect(screen.getByText("Arsenal")).toBeInTheDocument();
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
  });

  describe("Empty states", () => {
    it("shows empty message when no standings available", () => {
      render(
        <LeagueStandings
          initialStandings={[]}
          initialLeagueId={39}
          initialLeagueName="Premier League"
        />
      );

      expect(screen.getByText("No standings available")).toBeInTheDocument();
    });

    it("handles API errors gracefully", async () => {
      const user = userEvent.setup();

      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      mockGetById.mockRejectedValueOnce(new Error("API Error"));

      render(
        <LeagueStandings
          initialStandings={mockPremierLeagueStandings}
          initialLeagueId={39}
          initialLeagueName="Premier League"
        />
      );

      const nextButton = screen.getByLabelText("Next league");
      await user.click(nextButton);

      // Should show empty state after error
      await waitFor(() => {
        expect(screen.getByText("No standings available")).toBeInTheDocument();
      });

      consoleSpy.mockRestore();
    });
  });

  describe("Scrollable content", () => {
    it("is scrollable when standings list is long", () => {
      const longStandings = Array.from({ length: 20 }, (_, i) => ({
        position: i + 1,
        team: {
          id: i,
          name: `Team ${i + 1}`,
          logo: `https://example.com/team${i}.png`,
        },
        played: 20,
        points: 50 - i,
      }));

      const { container } = render(
        <LeagueStandings
          initialStandings={longStandings}
          initialLeagueId={39}
          initialLeagueName="Premier League"
        />
      );

      // Should have overflow-auto class for scrolling
      const scrollableDiv = container.querySelector(".overflow-auto");
      expect(scrollableDiv).toBeInTheDocument();
    });
  });
});
