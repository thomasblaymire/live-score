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

      // Filter to top leagues worldwide
      const topLeagueIds = [
        // Top 5 European Leagues
        39,  // Premier League (England)
        140, // La Liga (Spain)
        78,  // Bundesliga (Germany)
        135, // Serie A (Italy)
        61,  // Ligue 1 (France)

        // International Competitions
        2,   // Champions League
        3,   // Europa League
        848, // Europa Conference League
        1,   // World Cup
        4,   // Euro Championship
        9,   // Copa America

        // Other European Leagues
        94,  // Primeira Liga (Portugal)
        88,  // Eredivisie (Netherlands)
        144, // Belgian Pro League
        179, // Scottish Premiership
        218, // Austrian Bundesliga
        203, // Super Lig (Turkey)
        235, // Russian Premier League
        197, // Greek Super League
        119, // Danish Superliga
        103, // Norwegian Eliteserien
        113, // Swedish Allsvenskan

        // Americas
        71,  // Serie A (Brazil)
        253, // MLS (USA)
        262, // Liga MX (Mexico)
        128, // Argentine Primera Division
        13,  // Copa Libertadores
        11,  // CONMEBOL Copa Sudamericana

        // Middle East & Africa
        307, // Saudi Pro League
        188, // Egyptian Premier League

        // Asia & Oceania
        283, // UAE Pro League
        98,  // J1 League (Japan)
        292, // K League 1 (South Korea)
        169, // Chinese Super League
        271, // A-League (Australia)
      ];
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
