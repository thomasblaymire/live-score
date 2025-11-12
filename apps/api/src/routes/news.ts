import fetch from "node-fetch";
import express, { Request, Response } from "express";
import { catchAsync } from "../helpers";

const router = express.Router();

router.get(
  "/api/news",
  catchAsync(async (req: Request, res: Response) => {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?q=football&country=gb&category=sports&apiKey=${process.env.FOOTBALL_NEWS_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data from API: ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data);
  })
);

router.get(
  "/api/news/team",
  catchAsync(async (req: Request, res: Response) => {
    console.log("debug req.query", req.query);

    const team = req.query.name;
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 5;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?q=${team}&country=gb&category=sports&apiKey=${process.env.FOOTBALL_NEWS_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data from API: ${response.statusText}`);
    }

    const data = await response.json();
    const paginatedData = data.articles.slice(startIndex, endIndex);

    res.json({
      currentPage: page,
      totalPages: Math.ceil(data.length / limit),
      data: paginatedData,
    });
  })
);

export { router as newsRouter };
