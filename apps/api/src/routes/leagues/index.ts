import express, { Request, Response } from "express";
import { catchAsync, sendError } from "../../helpers";
import { leaguesAPI, standingsAPI, topScorersAPI } from "../../services/football-api";

const router = express.Router();

// Get top leagues
router.get(
  "/api/leagues",
  catchAsync(async (req: Request, res: Response) => {
    try {
      const response = await leaguesAPI.getTopLeagues();

      // Top 10 most popular leagues worldwide (ordered by priority - UK leagues first)
      const topLeagueIds = [
        39,  // Premier League (England)
        40,  // Championship (England)
        41,  // League One (England)
        42,  // League Two (England)
        2,   // Champions League
        140, // La Liga (Spain)
        78,  // Bundesliga (Germany)
        135, // Serie A (Italy)
        61,  // Ligue 1 (France)
        3,   // Europa League
      ];

      const leagues = (response.response as any[]) || [];
      const filtered = leagues.filter((league: any) =>
        topLeagueIds.includes(league.league.id)
      );

      // Sort by the order in topLeagueIds to maintain priority
      const sorted = filtered.sort((a: any, b: any) => {
        const indexA = topLeagueIds.indexOf(a.league.id);
        const indexB = topLeagueIds.indexOf(b.league.id);
        return indexA - indexB;
      });

      console.log(`Found ${sorted.length} out of ${topLeagueIds.length} top leagues`);

      res.json(sorted);
    } catch (error: any) {
      console.error("Error fetching leagues:", error);
      sendError(res, 500, "Failed to fetch leagues from API-Football");
    }
  })
);

// Get league standings and top scorers
router.get(
  "/api/league/:league",
  catchAsync(async (req: Request, res: Response) => {
    const { league } = req.params;
    const leagueId = parseInt(league);

    if (isNaN(leagueId)) {
      return sendError(res, 400, "Invalid league ID");
    }

    try {
      const currentYear = new Date().getFullYear();
      const season = currentYear; // Adjust based on actual season

      const [standingsData, topScorersData] = await Promise.all([
        standingsAPI.getByLeague(leagueId, season),
        topScorersAPI.getByLeague(leagueId, season),
      ]);

      const formatted = {
        league: standingsData.response?.[0]?.league?.standings?.[0] || [],
        topScorers: topScorersData.response || [],
      };

      res.json(formatted);
    } catch (error) {
      console.error("Error fetching league details:", error);
      sendError(res, 500, "Failed to fetch league details");
    }
  })
);

export { router as leaguesRouter };
