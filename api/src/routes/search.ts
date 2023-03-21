import fetch from "node-fetch";
import express, { Request, Response } from "express";
import { catchAsync } from "../helpers/async";

const router = express.Router();

router.get(
  "/api/search",
  catchAsync(async (req: Request, res: Response) => {
    const { searchTerm } = req.query;
    console.log("debug searchTerm", searchTerm);

    const response = await fetch(process.env.MOCKY_SEARCH_API_URL);
    const data = await response.json();
    return res.json(data);
  })
);

export { router as searchRouter };
