import rateLimit from "express-rate-limit";
import { Request, Response, Router } from "express";
import { check, validationResult } from "express-validator";
import { teamsAPI } from "../services/football-api";

const router = Router();

const searchRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 requests
  message: "Too many requests, please try again later.",
});

const searchValidation = [
  check("q")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Search term must not be empty.")
    .isLength({ max: 100 })
    .withMessage("Search term must not exceed 100 characters."),
];

async function search(query: string) {
  try {
    // Search teams using API-Football
    const teamsResponse = await teamsAPI.search(query);

    return {
      teams: teamsResponse.response || [],
    };
  } catch (error) {
    console.error("Error while searching:", error);
    throw error;
  }
}

router.get(
  "/api/search",
  searchRateLimit,
  searchValidation,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const searchTerm = req.query.q as string;
      const results = await search(searchTerm);
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "An error occurred while searching." });
    }
  }
);

export { router as searchRouter };
