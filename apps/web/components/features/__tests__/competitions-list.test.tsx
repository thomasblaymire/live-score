import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CompetitionsList } from "../competitions-list";

describe("CompetitionsList", () => {
  const mockCompetitions = [
    {
      id: 39,
      name: "Premier League",
      country: "England",
      logo: "https://example.com/premier-league.png",
    },
    {
      id: 140,
      name: "La Liga",
      country: "Spain",
      logo: "https://example.com/la-liga.png",
    },
    {
      id: 78,
      name: "Bundesliga",
      country: "Germany",
      logo: "https://example.com/bundesliga.png",
    },
  ];

  it("renders all competitions passed as props", () => {
    render(<CompetitionsList competitions={mockCompetitions} />);

    expect(screen.getByText("Premier League")).toBeInTheDocument();
    expect(screen.getByText("La Liga")).toBeInTheDocument();
    expect(screen.getByText("Bundesliga")).toBeInTheDocument();
  });

  it("displays country names for each competition", () => {
    render(<CompetitionsList competitions={mockCompetitions} />);

    expect(screen.getByText("England")).toBeInTheDocument();
    expect(screen.getByText("Spain")).toBeInTheDocument();
    expect(screen.getByText("Germany")).toBeInTheDocument();
  });

  it("renders competition logos with correct alt text", () => {
    render(<CompetitionsList competitions={mockCompetitions} />);

    const premierLeagueLogo = screen.getByAltText("Premier League");
    const laLigaLogo = screen.getByAltText("La Liga");
    const bundesligaLogo = screen.getByAltText("Bundesliga");

    expect(premierLeagueLogo).toBeInTheDocument();
    expect(laLigaLogo).toBeInTheDocument();
    expect(bundesligaLogo).toBeInTheDocument();
  });

  it("creates clickable links to league pages with correct URLs", () => {
    render(<CompetitionsList competitions={mockCompetitions} />);

    const premierLeagueLink = screen
      .getByText("Premier League")
      .closest("a");
    const laLigaLink = screen.getByText("La Liga").closest("a");

    expect(premierLeagueLink).toHaveAttribute("href", "/league/39");
    expect(laLigaLink).toHaveAttribute("href", "/league/140");
  });

  it("renders empty state when no competitions provided", () => {
    const { container } = render(<CompetitionsList competitions={[]} />);

    // Should render empty list without errors
    expect(container.querySelector("div")).toBeInTheDocument();
  });

  it("maintains competition order as provided in props", () => {
    render(<CompetitionsList competitions={mockCompetitions} />);

    const competitionNames = screen
      .getAllByText(/Premier League|La Liga|Bundesliga/)
      .map((el) => el.textContent);

    expect(competitionNames).toEqual([
      "Premier League",
      "La Liga",
      "Bundesliga",
    ]);
  });
});
