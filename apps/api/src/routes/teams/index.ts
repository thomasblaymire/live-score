import express, { Request, Response } from "express";
import { catchAsync, sendError } from "../../helpers";
import { teamsAPI } from "../../services/football-api";

const router = express.Router();

// Get all teams (by league - default to Premier League)
router.get(
  "/api/teams",
  catchAsync(async (req: Request, res: Response) => {
    try {
      const leagueId = parseInt(req.query.league as string) || 39; // Default: Premier League
      const season = parseInt(req.query.season as string) || new Date().getFullYear();

      const response = await teamsAPI.getByLeague(leagueId, season);
      res.json(response.response || []);
    } catch (err) {
      console.error("Error fetching teams:", err);
      return sendError(res, 500, "Failed to fetch teams from API-Football");
    }
  })
);

// Get team by ID
router.get(
  "/api/teams/:id",
  catchAsync(async (req: Request, res: Response) => {
    const teamId = parseInt(req.params.id);

    if (isNaN(teamId)) {
      return sendError(res, 400, "Invalid team ID");
    }

    try {
      const response = await teamsAPI.getById(teamId);
      res.json(response.response?.[0] || null);
    } catch (error) {
      console.error("Error fetching team:", error);
      sendError(res, 500, "Failed to fetch team");
    }
  })
);

export { router as teamsRouter };
