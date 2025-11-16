import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ScoreBoard } from "../scoreboard";

const mockFixtures = [
  {
    id: 1,
    homeTeam: "Arsenal",
    awayTeam: "Chelsea",
    homeTeamLogo: "https://example.com/arsenal.png",
    awayTeamLogo: "https://example.com/chelsea.png",
    homeScore: 2,
    awayScore: 1,
    status: "2H",
    time: "75'",
    league: "Premier League",
    leagueLogo: "https://example.com/pl.png",
    leagueCountry: "England",
  },
  {
    id: 2,
    homeTeam: "Liverpool",
    awayTeam: "Manchester United",
    homeTeamLogo: "https://example.com/liverpool.png",
    awayTeamLogo: "https://example.com/man-utd.png",
    homeScore: null,
    awayScore: null,
    status: "NS",
    time: "15:00",
    league: "Premier League",
    leagueLogo: "https://example.com/pl.png",
    leagueCountry: "England",
  },
  {
    id: 3,
    homeTeam: "Barcelona",
    awayTeam: "Real Madrid",
    homeTeamLogo: "https://example.com/barca.png",
    awayTeamLogo: "https://example.com/real.png",
    homeScore: 3,
    awayScore: 2,
    status: "FT",
    time: "FT",
    league: "La Liga",
    leagueLogo: "https://example.com/laliga.png",
    leagueCountry: "Spain",
  },
];

describe("ScoreBoard", () => {
  describe("User can view all fixtures", () => {
    it("displays all team names when All tab is active", async () => {
      const user = userEvent.setup();
      render(<ScoreBoard fixtures={mockFixtures} />);

      // Click All tab to see all fixtures
      const allTab = screen.getByRole("button", { name: "All" });
      await user.click(allTab);

      expect(screen.getByText("Arsenal")).toBeInTheDocument();
      expect(screen.getByText("Chelsea")).toBeInTheDocument();
      expect(screen.getByText("Liverpool")).toBeInTheDocument();
      expect(screen.getByText("Manchester United")).toBeInTheDocument();
      expect(screen.getByText("Barcelona")).toBeInTheDocument();
      expect(screen.getByText("Real Madrid")).toBeInTheDocument();
    });

    it("displays scores for finished and live matches", async () => {
      const user = userEvent.setup();
      render(<ScoreBoard fixtures={mockFixtures} />);

      // Click All tab to see all fixtures
      const allTab = screen.getByRole("button", { name: "All" });
      await user.click(allTab);

      // Live match scores
      const arsenalScore = screen.getAllByText("2");
      const chelseaScore = screen.getAllByText("1");

      expect(arsenalScore.length).toBeGreaterThan(0);
      expect(chelseaScore.length).toBeGreaterThan(0);

      // Finished match scores
      const barcelonaScore = screen.getAllByText("3");
      expect(barcelonaScore.length).toBeGreaterThan(0);
    });

    it("displays match status and time", async () => {
      const user = userEvent.setup();
      render(<ScoreBoard fixtures={mockFixtures} />);

      // Click All tab to see all fixtures
      const allTab = screen.getByRole("button", { name: "All" });
      await user.click(allTab);

      expect(screen.getByText("2H")).toBeInTheDocument();
      expect(screen.getByText("75'")).toBeInTheDocument();
      // NS appears multiple times (in legend and fixture), so use getAllByText
      expect(screen.getAllByText("NS").length).toBeGreaterThan(0);
      expect(screen.getByText("15:00")).toBeInTheDocument();
      // FT appears multiple times (in legend and fixture), so use getAllByText
      expect(screen.getAllByText("FT").length).toBeGreaterThan(0);
    });
  });

  describe("User can filter fixtures by status", () => {
    it("shows live tab by default", () => {
      render(<ScoreBoard fixtures={mockFixtures} />);

      const liveTab = screen.getByRole("button", { name: "Live" });
      expect(liveTab).toHaveClass(/bg-gray-700/);
    });

    it("filters to show only live matches when Live tab is clicked", async () => {
      const user = userEvent.setup();
      render(<ScoreBoard fixtures={mockFixtures} />);

      // Live tab should be active by default and show live match
      expect(screen.getByText("Arsenal")).toBeInTheDocument();

      // Should not show upcoming or finished matches
      expect(screen.queryByText("Liverpool")).not.toBeInTheDocument();
      expect(screen.queryByText("Barcelona")).not.toBeInTheDocument();
    });

    it("filters to show all matches when All tab is clicked", async () => {
      const user = userEvent.setup();
      render(<ScoreBoard fixtures={mockFixtures} />);

      const allTab = screen.getByRole("button", { name: "All" });
      await user.click(allTab);

      // Should show all matches
      expect(screen.getByText("Arsenal")).toBeInTheDocument();
      expect(screen.getByText("Liverpool")).toBeInTheDocument();
      expect(screen.getByText("Barcelona")).toBeInTheDocument();
    });

    it("filters to show only upcoming matches when Upcoming tab is clicked", async () => {
      const user = userEvent.setup();
      render(<ScoreBoard fixtures={mockFixtures} />);

      const upcomingTab = screen.getByRole("button", { name: "Upcoming" });
      await user.click(upcomingTab);

      // Should show only upcoming match
      expect(screen.getByText("Liverpool")).toBeInTheDocument();

      // Should not show live or finished matches
      expect(screen.queryByText("Arsenal")).not.toBeInTheDocument();
      expect(screen.queryByText("Barcelona")).not.toBeInTheDocument();
    });

    it("filters to show only finished matches when Finished tab is clicked", async () => {
      const user = userEvent.setup();
      render(<ScoreBoard fixtures={mockFixtures} />);

      const finishedTab = screen.getByRole("button", { name: "Finished" });
      await user.click(finishedTab);

      // Should show only finished match
      expect(screen.getByText("Barcelona")).toBeInTheDocument();

      // Should not show live or upcoming matches
      expect(screen.queryByText("Arsenal")).not.toBeInTheDocument();
      expect(screen.queryByText("Liverpool")).not.toBeInTheDocument();
    });
  });

  describe("User can interact with league groupings", () => {
    it("groups fixtures by league", async () => {
      const user = userEvent.setup();
      render(<ScoreBoard fixtures={mockFixtures} />);

      // Click All tab to see all fixtures
      const allTab = screen.getByRole("button", { name: "All" });
      await user.click(allTab);

      // Should show league headers
      expect(screen.getByText("Premier League")).toBeInTheDocument();
      expect(screen.getByText("La Liga")).toBeInTheDocument();
    });

    it("allows collapsing league sections", async () => {
      const user = userEvent.setup();
      render(<ScoreBoard fixtures={mockFixtures} />);

      // Click All tab to see all fixtures
      const allTab = screen.getByRole("button", { name: "All" });
      await user.click(allTab);

      // Find the Premier League header button and click it
      const plHeader = screen.getByText("Premier League").closest("button");
      expect(plHeader).toBeInTheDocument();

      await user.click(plHeader!);

      // Premier League fixtures should be hidden
      expect(screen.queryByText("Arsenal")).not.toBeInTheDocument();
      expect(screen.queryByText("Liverpool")).not.toBeInTheDocument();

      // La Liga should still be visible
      expect(screen.getByText("Barcelona")).toBeInTheDocument();
    });

    it("shows fixture count for each league", async () => {
      const user = userEvent.setup();
      render(<ScoreBoard fixtures={mockFixtures} />);

      // Click All tab
      const allTab = screen.getByRole("button", { name: "All" });
      await user.click(allTab);

      // Should show count in parentheses
      expect(screen.getByText("(2)")).toBeInTheDocument(); // Premier League
      expect(screen.getByText("(1)")).toBeInTheDocument(); // La Liga
    });
  });

  describe("User sees appropriate visual indicators", () => {
    it("shows pulsating animation for live matches", () => {
      render(<ScoreBoard fixtures={mockFixtures} />);

      const liveStatus = screen.getByText("2H");
      expect(liveStatus).toHaveClass(/animate-pulse/);
    });

    it("does not show pulsating animation for finished matches", async () => {
      const user = userEvent.setup();
      render(<ScoreBoard fixtures={mockFixtures} />);

      const finishedTab = screen.getByRole("button", { name: "Finished" });
      await user.click(finishedTab);

      const finishedStatuses = screen.getAllByText("FT");
      // Check that none of the FT status elements have the animate-pulse class
      finishedStatuses.forEach((status) => {
        expect(status.className).not.toContain("animate-pulse");
      });
    });

    it("displays league logos", async () => {
      const user = userEvent.setup();
      render(<ScoreBoard fixtures={mockFixtures} />);

      const allTab = screen.getByRole("button", { name: "All" });
      await user.click(allTab);

      const plLogo = screen.getByAltText("Premier League");
      const laLigaLogo = screen.getByAltText("La Liga");

      expect(plLogo).toBeInTheDocument();
      expect(laLigaLogo).toBeInTheDocument();
    });
  });

  describe("Empty states", () => {
    it("shows empty message when no fixtures match filter", async () => {
      const user = userEvent.setup();

      // Only provide finished match
      const finishedOnlyFixtures = [mockFixtures[2]];

      render(<ScoreBoard fixtures={finishedOnlyFixtures} />);

      // Live tab is active by default, should show empty state
      expect(
        screen.getByText("No matches found for this filter")
      ).toBeInTheDocument();
    });

    it("handles empty fixtures array gracefully", () => {
      render(<ScoreBoard fixtures={[]} />);

      expect(
        screen.getByText("No matches found for this filter")
      ).toBeInTheDocument();
    });
  });

  describe("Navigation", () => {
    it("creates clickable links to fixture detail pages", async () => {
      const user = userEvent.setup();
      render(<ScoreBoard fixtures={mockFixtures} />);

      const arsenalMatch = screen.getByText("Arsenal").closest("a");
      expect(arsenalMatch).toHaveAttribute("href");
      expect(arsenalMatch?.getAttribute("href")).toContain("/football/");
    });
  });

  describe("Without header mode", () => {
    it("does not render tabs when showHeader is false", () => {
      render(<ScoreBoard fixtures={mockFixtures} showHeader={false} />);

      expect(
        screen.queryByRole("button", { name: "Live" })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "All" })
      ).not.toBeInTheDocument();
    });

    it("still renders fixtures when showHeader is false", () => {
      render(<ScoreBoard fixtures={mockFixtures} showHeader={false} />);

      // Should show live fixtures (default filter is still "live")
      expect(screen.getByText("Arsenal")).toBeInTheDocument();

      // Should not show finished matches
      expect(screen.queryByText("Barcelona")).not.toBeInTheDocument();
    });
  });
});
