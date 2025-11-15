/**
 * Transform fixtures from API-Football response to ScoreBoard format
 */

import { Fixture as ApiFixture } from "./api-client";

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
  if (!Array.isArray(apiFixtures)) {
    return [];
  }

  return apiFixtures.map((item) => {
    const fixture = item.fixture;
    const status = fixture.status;

    // Format time based on status
    let time = "";
    if (status.short === "NS") {
      // Not started - show match time
      const matchDate = new Date(fixture.date);
      time = matchDate.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (status.short === "FT") {
      // Finished
      time = "FT";
    } else if (status.short === "HT") {
      // Half time
      time = "HT";
    } else if (status.elapsed !== null && status.elapsed !== undefined) {
      // Live match - show elapsed time
      time = `${status.elapsed}'`;
    } else {
      time = status.short;
    }

    return {
      id: fixture.id,
      homeTeam: item.teams.home.name,
      awayTeam: item.teams.away.name,
      homeScore: item.goals.home,
      awayScore: item.goals.away,
      status: status.short,
      time,
      league: item.league.name,
    };
  });
}
