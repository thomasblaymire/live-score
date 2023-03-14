import express, { Request, Response } from "express";
import { catchAsync } from "../../helpers/async";
import { getVideoTagByQuery } from "../../helpers/youtube";
import { fetchApi } from "../../helpers/fetch";

const router = express.Router();

// Returns specific fixtures for a given team name
router.get(
  "/api/fixtures/:team",
  catchAsync(async (req: Request, res: Response) => {
    const { team } = req.params;
    const response = await fetch(process.env.MOCKY_TEAM_FIXTURES_API_URL);
    const data = await response.json();
    res.json(data);
  })
);

// Returns all fixtures for a date range
router.get(
  "/api/fixtures",
  catchAsync(async (req: Request, res: Response) => {
    const today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const response = await fetch(
      `${process.env.PAID_FOOTBALL_MOCK_LIVE_SCORES}`
    );
    const data = await response.json();

    res.json(data);
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
