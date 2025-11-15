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

      // Filter to top 5 European leagues
      const topLeagueIds = [39, 140, 78, 135, 61];
      const leagues = (response.response as any[]) || [];
      const filtered = leagues.filter((league: any) =>
        topLeagueIds.includes(league.league.id)
      );

      res.json(filtered);
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
