import fetch from "node-fetch";
import express, { Request, Response } from "express";
import { catchAsync } from "../../helpers";

const router = express.Router();

router.get(
  "/api/leagues",
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
      league: response[0].response[0].league.standings[0],
      topScorers: response[1].response,
    };

    res.json(formatted);
  })
);

export { router as leaguesRouter };
