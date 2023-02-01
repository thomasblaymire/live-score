import express, { Request, response, Response } from "express";
import { catchAsync } from "../../helpers/async";
import { leagueCodes } from "../../constants";
import { formatDate } from "../../helpers/date";
import { getVideoTagByQuery } from "../../helpers/youtube";
import { fetchApi } from "../../helpers/fetch";

const router = express.Router();

router.get(
  "/api/competitions",
  catchAsync(async (req: Request, res: Response) => {
    try {
      const response = await fetch(process.env.MOCKY_TOP_COMPETITIONS_API_URL);
      const data = await response.json();
      res.json(data.response);
    } catch (error: any) {
      console.error("error:" + error);
    }
  })
);

router.get(
  "/api/matches",
  catchAsync(async (req: Request, res: Response) => {
    const today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    // const response = await fetchApi(
    //   `/matches?competitions=${leagueCodes}&dateFrom=${formatDate(
    //     today
    //   )}&dateTo=${formatDate(tomorrow)},`,
    //   false
    // );

    // let data = await response.json();
    // const filtred = data.matches
    //   .sort((a: any, b: any) => a.status.localeCompare(b.status === "IN_PLAY"))
    //   .reverse();

    const response = await fetch(
      `${process.env.PAID_FOOTBALL_MOCK_LIVE_SCORES}`
    );
    const data = await response.json();

    res.json(data);
  })
);

router.get(
  "/api/match/:id",
  catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await fetchApi(`/matches/${id}`, false);
    const footballAPIData = await response.json();
    const youtubeQuery = `${footballAPIData.homeTeam.name} vs ${footballAPIData.awayTeam.name}`;
    const youtubeVideoID = await getVideoTagByQuery(youtubeQuery);
    res.json({ ...footballAPIData, ...{ youtubeID: youtubeVideoID } });
  })
);

router.get(
  "/api/league/:league",
  catchAsync(async (req: Request, res: Response) => {
    const { league } = req.params;

    const urls = [
      process.env.MOCKY_STANDINGS_API_URL,
      process.env.MOCKY_TOP_SCORERS_API_URL,
    ];

    const response = await Promise.all(
      urls.map((url) => fetch(url).then((res) => res.json()))
    );

    const formatted = {
      league: response[0].response[0].league,
      topScorers: response[1].response,
    };

    res.json(formatted);
  })
);

router.get(
  "/api/fixtures/:team",
  catchAsync(async (req: Request, res: Response) => {
    const { team } = req.params;

    const response = await fetch(process.env.MOCKY_TEAM_FIXTURES_API_URL);
    const data = await response.json();

    res.json(data);
  })
);

export { router as footballRouter };
