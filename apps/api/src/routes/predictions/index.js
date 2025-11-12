var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { prisma } from "../../helpers";
import { verifyAuth } from "../../middlewares/auth";
const router = require("express").Router();
router.post("/api/predictions", verifyAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { predictions } = req.body;
        if (!req.userId || !predictions) {
            return res.status(400).json({ error: "Missing required data" });
        }
        const formattedPredictions = predictions.map((prediction) => {
            const { matchId, teamAScore, teamBScore } = prediction;
            return {
                userId: req.userId,
                fixtureId: matchId,
                teamAScore,
                teamBScore,
            };
        });
        // Save predictions to the database
        const savedPredictions = yield prisma.fixturePrediction.createMany({
            data: formattedPredictions,
            skipDuplicates: true,
        });
        res.status(201).json(savedPredictions);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to save predictions" });
    }
}));
export { router as predictionsRouter };
