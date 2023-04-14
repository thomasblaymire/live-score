import fetch from "node-fetch";
import express, { Request, Response } from "express";
import { catchAsync } from "../../helpers";

const router = express.Router();

router.get(
  "/api/teams",
  catchAsync(async (req: Request, res: Response) => {
    try {
      const response = await fetch(process.env.MOCKY_ALL_TEAMS_API_URL);
      const data = await response.json();
      res.json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Sorry, something went wrong." });
    }
  })
);

router.get("/api/teams/:id", async (req: Request, res: Response) => {});

export { router as teamsRouter };
