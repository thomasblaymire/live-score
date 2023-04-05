import fetch from "node-fetch";
import express, { Request, Response } from "express";
import { catchAsync } from "../../helpers/async";
import { retry } from "../../helpers/retry";
import {
  fetchLiveScores,
  fetchFixturesByDate,
  fetchFixturesByStatus,
} from "./requests";

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
      res.status(500).send("Failed to fetch data from API");
    }
  })
);

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
