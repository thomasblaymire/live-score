import fetch from "node-fetch";
import express, { Request, Response } from "express";
import { catchAsync } from "../../helpers/async";
import { retry } from "../../helpers/retry";
import { getVideoTagByQuery } from "../../helpers/youtube";

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

// Returns all fixtures for a date range
// including (live matches, odds, finished matches)
router.get(
  "/api/fixtures",
  catchAsync(async (req: Request, res: Response) => {
    const { getDate } = Date.prototype;
    const today = new Date();
    const tomorrow = new Date(getDate.call(today) + 1);

    async function fetchLiveScores(apiUrl: string) {
      const response = await retry(async () => {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch live scores: ${response.statusText}`
          );
        }
        return response;
      });
      return await response.json();
    }

    async function fetchFixturesByDate(fixturesByDate: string) {
      const response = await retry(async () => {
        const response = await fetch(fixturesByDate);
        if (!response.ok) {
          throw new Error(`Failed to fetch fixtures: ${response.statusText}`);
        }
        return response;
      });
      const data = await response.json();
      return data.response.slice(0, 15);
    }

    async function fetchFixturesByStatus(fixturesByStatus: string) {
      const response = await retry(async () => {
        const response = await fetch(fixturesByStatus);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch fixtures by status: ${response.statusText}`
          );
        }
        return response;
      });
      const data = await response.json();
      return data.response.slice(0, 15);
    }

    try {
      const [liveScores, fixturesByDateData, fixturesByStatusData] =
        await Promise.all([
          retry(() => fetchLiveScores(`${process.env.MOCKY_LIVE_SCORES}`)),
          retry(() =>
            fetchFixturesByDate(`${process.env.MOCKY_FIXTURES_BY_DATE}`)
          ),
          retry(() =>
            fetchFixturesByStatus(`${process.env.MOCKY_FIXTURES_BY_STATUS}`)
          ),
        ]);

      const responseData = {
        liveScores,
        fixturesByDateData,
        fixturesByStatusData,
      };

      res.json(responseData);
    } catch (error) {
      console.error(error);
      res.status(500).send("Failed to fetch data from API");
    }
  })
);

// Returns specific fixtures for a given team id and youtube generated URL
router.get(
  "/api/fixture/:id",
  catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const response = await fetch(`${process.env.MOCKY_FIXTURE_BY_ID_API_URL}`);
    const data = await response.json();

    // const response = await fetchApi(`/matches/${id}`, false);
    // const footballAPIData = await response.json();

    res.json(data.response[0]);

    // const youtubeQuery = `${footballAPIData.response.fixture.teams.home.name} vs ${footballAPIData.response.fixture.teams.away.name}`;
    // const youtubeVideoID = await getVideoTagByQuery(youtubeQuery);
    // res.json({ ...footballAPIData, ...{ youtubeID: youtubeVideoID } });
  })
);

export { router as fixturesRouter };
