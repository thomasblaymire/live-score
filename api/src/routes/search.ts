import rateLimit from "express-rate-limit";
import { Request, Response, Router } from "express";
import { prisma } from "../helpers";
import { check, validationResult } from "express-validator";

const router = Router();

const searchRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 requests
  message: "Too many requests, please try again later.",
});

const searchValidation = [
  check("term")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Search term must not be empty.")
    .isLength({ max: 100 })
    .withMessage("Search term must not exceed 100 characters."),
];

async function search(query: string, limit: number = 3) {
  try {
    const searchTerm = query;
    const searchTerms = searchTerm.split(" ");

    const teamsPromise = prisma.team.findMany({
      where: { name: { contains: searchTerm, mode: "insensitive" } },
      take: limit,
    });

    const venuesPromise = prisma.venue.findMany({
      where: { name: { contains: searchTerm, mode: "insensitive" } },
      take: limit,
    });

    const playersPromise = prisma.player.findMany({
      where: {
        OR: searchTerms.map((term) => ({
          name: { contains: term, mode: "insensitive" },
        })),
      },
    });

    const [teams, venues, playersResults] = await Promise.all([
      teamsPromise,
      venuesPromise,
      playersPromise,
    ]);

    const playersWithRelevance = playersResults.map((player: any) => {
      const playerTerms = player.name.toLowerCase().split(" ");
      let relevance = 0;

      for (const term of searchTerms) {
        if (playerTerms.includes(term.toLowerCase())) {
          relevance += 1;
        }
      }

      return { ...player, relevance };
    });

    const players = playersWithRelevance
      .sort((a: any, b: any) => b.relevance - a.relevance)
      .slice(0, limit);

    return { teams, venues, players };
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
      const searchTerm = req.query.term as string;
      const results = await search(searchTerm);
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "An error occurred while searching." });
    }
  }
);
export { router as searchRouter };
