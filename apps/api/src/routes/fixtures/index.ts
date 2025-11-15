import express, { Request, Response } from "express";
import { isString, catchAsync, sendError, prisma } from "../../helpers";
import { fixturesAPI } from "../../services/football-api";

const router = express.Router();

// Returns specific fixtures for a given team id
router.get(
  "/api/fixtures/:team",
  catchAsync(async (req: Request, res: Response) => {
    const teamId = parseInt(req.params.team);
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    const skip = (page - 1) * pageSize;
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    console.log("debug", {
      page,
      pageSize,
      teamId,
    });

    try {
      const fixtures = await prisma.fixture.findMany({
        where: {
          OR: [{ homeTeamId: teamId }, { awayTeamId: teamId }],
          date: {
            gte: currentDate,
          },
        },
        orderBy: {
          date: "asc",
        },
        select: {
          id: true,
          homeTeam: true,
          awayTeam: true,
          league: true,
          date: true,
          status: true,
        },
        skip: skip,
        take: pageSize,
      });

      res.status(200).json(fixtures);
    } catch (error) {
      console.error("Error fetching fixtures:", error);
      res.status(500).json({ error: "Failed to fetch fixtures" });
    }
  })
);

// Returns all fixtures (live, by date, etc.)
router.get(
  "/api/fixtures",
  catchAsync(async (req: Request, res: Response) => {
    try {
      const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

      const [liveScores, fixturesByDate] = await Promise.all([
        fixturesAPI.getLive(),
        fixturesAPI.getByDate(today),
      ]);

      const response = {
        liveScores,
        fixturesByDate,
      };

      res.json(response);
    } catch (error) {
      console.error(error);
      sendError(res, 500, "Failed to fetch fixtures from API-Football");
    }
  })
);

router.get("/api/fixtures-all/date", async (req: Request, res: Response) => {
  const startDate = req.query.start;
  const endDate = req.query.end;

  if (!isString(startDate) || !isString(endDate)) {
    sendError(
      res,
      400,
      "Both start and end date query parameters are required."
    );
    return;
  }

  try {
    // Extract just the date part (YYYY-MM-DD) from ISO strings
    const fromDate = startDate.split("T")[0];
    const toDate = endDate.split("T")[0];

    const response = await fixturesAPI.getByDateRange(fromDate, toDate);

    // Return the response array directly
    res.status(200).json(response.response || []);
  } catch (error) {
    console.error("Error fetching fixtures by date range:", error);
    res.status(500).json({
      message: "An error occurred while fetching fixtures by date range.",
      error,
    });
  }
});

// Returns specific fixture by ID
router.get(
  "/api/fixture/:id",
  catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const fixtureId = parseInt(id);

    if (isNaN(fixtureId)) {
      return sendError(res, 400, "Invalid fixture ID");
    }

    try {
      const response = await fixturesAPI.getById(fixtureId);
      res.json(response.response?.[0] || null);
    } catch (error) {
      console.error("Error fetching fixture by ID:", error);
      sendError(res, 500, "Failed to fetch fixture");
    }
  })
);

export { router as fixturesRouter };
