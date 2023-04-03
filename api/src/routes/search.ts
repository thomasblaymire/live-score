import fetch from "node-fetch";
import express, { Request, Response } from "express";
import { catchAsync } from "../helpers/async";

const router = express.Router();

router.get(
  "/api/search",
  catchAsync(async (req: Request, res: Response) => {
    const { searchTerm } = req.query;
    try {
      const response = await fetch(process.env.MOCKY_SEARCH_API_URL);
      const data = await response.json();
      if (data.length === 0) {
        return res.status(404).json({ message: "No results found." });
      }
      return res.json(data);
    } catch (err) {
      console.error("Failed to fetch search results:", err);
      return res.status(500).json({ error: "Failed to fetch search results." });
    }
  })
);

export { router as searchRouter };
