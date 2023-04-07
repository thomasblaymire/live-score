import fetch from "node-fetch";
import express, { Request, Response } from "express";
import { sendError } from "../../helpers/error";
import { isString } from "../../helpers/string";
import { catchAsync } from "../../helpers/async";
import { retry } from "../../helpers/retry";
import {
  fetchLiveScores,
  fetchFixturesByDate,
  fetchFixturesByStatus,
} from "./requests";
import { prisma } from "../../helpers/prisma";

const router = express.Router();

// Returns specific fixtures for a given team name
router.get(
  "/api/fixtures/:team",
  catchAsync(async (req: Request, res: Response) => {
    const { team } = req.params;
    const response = await fetch(`${process.env.MOCKY_TEAM_FIXTURES_API_URL}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch data from API: ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data);
  })
);

// Returns all fixtures for a date range inc (live matches, odds, finished matches)
router.get(
  "/api/fixtures",
  catchAsync(async (req: Request, res: Response) => {
    const { getDate } = Date.prototype;
    const today = new Date();
    const tomorrow = new Date(getDate.call(today) + 1);

    try {
      const [liveScores, fixturesByDate, fixturesByStatus] = await Promise.all([
        retry(() => fetchLiveScores(`${process.env.MOCKY_LIVE_SCORES}`)),
        retry(() =>
          fetchFixturesByDate(`${process.env.MOCKY_FIXTURES_BY_DATE}`)
        ),
        retry(() =>
          fetchFixturesByStatus(`${process.env.MOCKY_FIXTURES_BY_STATUS}`)
        ),
      ]);

      const response = {
        liveScores,
        fixturesByDate,
        fixturesByStatus,
      };

      res.json(response);
    } catch (error) {
      console.error(error);
      sendError(res, 500, "Failed to fetch data from API");
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

  const startDateTime = new Date(startDate);
  const endDateTime = new Date(endDate);
  endDateTime.setHours(23, 59, 59, 999);

  try {
    const fixtures = await prisma.fixture.findMany({
      where: {
        AND: [
          {
            date: {
              gte: startDateTime,
            },
          },
          {
            date: {
              lte: endDateTime,
            },
          },
        ],
      },
      include: {
        homeTeam: true,
        awayTeam: true,
        status: true,
        goals: true,
        score: true,
        league: true,
        venue: true,
      },
      orderBy: {
        date: "asc",
      },
    });

    if (fixtures.length === 0) {
      sendError(res, 404, "Sorry no fixtures found for the given date range.");
      return;
    }

    res.status(200).json(fixtures);
  } catch (error) {
    console.error("Error fetching fixtures by date range:", error);
    sendError(
      res,
      500,
      "An error occurred while fetching fixtures by date range."
    );
  }
});

// Returns specific fixtures for a given teamID and youtube generated URL
router.get(
  "/api/fixture/:id",
  catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await fetch(`${process.env.MOCKY_FIXTURE_BY_ID_API_URL}`);
    const data = await response.json();
    res.json(data.response[0]);
  })
);

export { router as fixturesRouter };
