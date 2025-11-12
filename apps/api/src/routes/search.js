var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import rateLimit from "express-rate-limit";
import { Router } from "express";
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
function search(query_1) {
    return __awaiter(this, arguments, void 0, function* (query, limit = 3) {
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
            const [teams, venues, playersResults] = yield Promise.all([
                teamsPromise,
                venuesPromise,
                playersPromise,
            ]);
            const playersWithRelevance = playersResults.map((player) => {
                const playerTerms = player.name.toLowerCase().split(" ");
                let relevance = 0;
                for (const term of searchTerms) {
                    if (playerTerms.includes(term.toLowerCase())) {
                        relevance += 1;
                    }
                }
                return Object.assign(Object.assign({}, player), { relevance });
            });
            const players = playersWithRelevance
                .sort((a, b) => b.relevance - a.relevance)
                .slice(0, limit);
            return { teams, venues, players };
        }
        catch (error) {
            console.error("Error while searching:", error);
            throw error;
        }
    });
}
router.get("/api/search", searchRateLimit, searchValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const searchTerm = req.query.term;
        const results = yield search(searchTerm);
        res.json(results);
    }
    catch (error) {
        res.status(500).json({ error: "An error occurred while searching." });
    }
}));
export { router as searchRouter };
