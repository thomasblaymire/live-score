import fetch from "node-fetch";
import express, { Request, Response } from "express";
import { catchAsync } from "../helpers";
import mockNews from "../mocks/news.json";

const router = express.Router();

router.get(
  "/api/news",
  catchAsync(async (req: Request, res: Response) => {
    // If no API key configured, return mock data
    if (!process.env.FOOTBALL_NEWS_API_KEY) {
      console.log("News API key not configured, using mock data");
      return res.json(mockNews);
    }

    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?q=football&country=gb&category=sports&apiKey=${process.env.FOOTBALL_NEWS_API_KEY}`
      );

      if (!response.ok) {
        console.log("News API request failed, using mock data");
        return res.json(mockNews);
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.log("News API error, using mock data:", error);
      res.json(mockNews);
    }
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

    // If no API key configured, return mock data
    if (!process.env.FOOTBALL_NEWS_API_KEY) {
      console.log("News API key not configured, using mock data");
      const paginatedData = mockNews.articles.slice(startIndex, endIndex);
      return res.json({
        currentPage: page,
        totalPages: Math.ceil(mockNews.articles.length / limit),
        data: paginatedData,
      });
    }

    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?q=${team}&country=gb&category=sports&apiKey=${process.env.FOOTBALL_NEWS_API_KEY}`
      );

      if (!response.ok) {
        console.log("News API request failed, using mock data");
        const paginatedData = mockNews.articles.slice(startIndex, endIndex);
        return res.json({
          currentPage: page,
          totalPages: Math.ceil(mockNews.articles.length / limit),
          data: paginatedData,
        });
      }

      const data = await response.json();
      const paginatedData = data.articles.slice(startIndex, endIndex);

      res.json({
        currentPage: page,
        totalPages: Math.ceil(data.articles.length / limit),
        data: paginatedData,
      });
    } catch (error) {
      console.log("News API error, using mock data:", error);
      const paginatedData = mockNews.articles.slice(startIndex, endIndex);
      res.json({
        currentPage: page,
        totalPages: Math.ceil(mockNews.articles.length / limit),
        data: paginatedData,
      });
    }
  })
);

export { router as newsRouter };
