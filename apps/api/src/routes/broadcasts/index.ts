import express, { Request, Response } from "express";
import { catchAsync, sendError } from "../../helpers";
import { getBroadcastInfo, getAllBroadcasts } from "../../services/broadcast-service";

const router = express.Router();

// Get broadcast information for a specific league
router.get(
  "/api/broadcasts/league/:leagueId",
  catchAsync(async (req: Request, res: Response) => {
    const { leagueId } = req.params;
    const country = (req.query.country as string) || "UK";

    const leagueIdNum = parseInt(leagueId);

    if (isNaN(leagueIdNum)) {
      return sendError(res, 400, "Invalid league ID");
    }

    try {
      const broadcastInfo = await getBroadcastInfo(leagueIdNum, country);

      if (!broadcastInfo) {
        return res.json({
          leagueId: leagueIdNum,
          country,
          broadcasters: [],
        });
      }

      res.json(broadcastInfo);
    } catch (error) {
      console.error("Error fetching broadcast info:", error);
      sendError(res, 500, "Failed to fetch broadcast information");
    }
  })
);

// Get all broadcast information
router.get(
  "/api/broadcasts",
  catchAsync(async (req: Request, res: Response) => {
    try {
      const broadcasts = await getAllBroadcasts();
      res.json(broadcasts);
    } catch (error) {
      console.error("Error fetching all broadcasts:", error);
      sendError(res, 500, "Failed to fetch broadcast information");
    }
  })
);

export { router as broadcastsRouter };
