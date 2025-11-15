/**
 * Transform fixtures from API response to ScoreBoard format
 */

interface ApiFixture {
  id: number;
  homeTeam: {
    id: number;
    name: string;
    logo?: string;
  };
  awayTeam: {
    id: number;
    name: string;
    logo?: string;
  };
  status: {
    long: string;
    short: string;
    elapsed?: number | null;
  };
  goals?: {
    home: number | null;
    away: number | null;
  } | null;
  league: {
    id: number;
    name: string;
  };
  date: string;
}

interface ScoreBoardFixture {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  status: string;
  time: string;
  league: string;
}

export function transformFixtures(
  apiFixtures: ApiFixture[]
): ScoreBoardFixture[] {
  return apiFixtures.map((fixture) => {
    // Format time based on status
    let time = "";
    if (fixture.status.short === "NS") {
      // Not started - show match time
      const matchDate = new Date(fixture.date);
      time = matchDate.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (fixture.status.short === "FT") {
      // Finished
      time = "FT";
    } else if (fixture.status.short === "HT") {
      // Half time
      time = "HT";
    } else if (fixture.status.elapsed !== null && fixture.status.elapsed !== undefined) {
      // Live match - show elapsed time
      time = `${fixture.status.elapsed}'`;
    } else {
      time = fixture.status.short;
    }

    return {
      id: fixture.id,
      homeTeam: fixture.homeTeam.name,
      awayTeam: fixture.awayTeam.name,
      homeScore: fixture.goals?.home ?? null,
      awayScore: fixture.goals?.away ?? null,
      status: fixture.status.short,
      time,
      league: fixture.league.name,
    };
  });
}
