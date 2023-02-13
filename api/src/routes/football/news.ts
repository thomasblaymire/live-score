import express, { Request, Response } from "express";
import { catchAsync } from "../../helpers/async";

const router = express.Router();

router.get(
  "/api/news",
  catchAsync(async (req: Request, res: Response) => {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=gb&category=sports&apiKey=${process.env.FOOTBALL_NEWS_API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  })
);

export { router as newsRouter };
