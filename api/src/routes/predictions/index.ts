import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { verifyAuth, AuthenticatedRequest } from "../../middlewares/auth";

const prisma = new PrismaClient();

const router = require("express").Router();

router.post(
  "/api/predictions",
  verifyAuth,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { predictions } = req.body;

      if (!req.userId || !predictions) {
        return res.status(400).json({ error: "Missing required data" });
      }
      const formattedPredictions = predictions.map((prediction: any) => {
        const { matchId, teamAScore, teamBScore } = prediction;
        return {
          userId: req.userId as string,
          fixtureId: matchId,
          teamAScore,
          teamBScore,
        };
      });

      // Save predictions to the database
      const savedPredictions = await prisma.fixturePrediction.createMany({
        data: formattedPredictions,
        skipDuplicates: true,
      });

      res.status(201).json(savedPredictions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to save predictions" });
    }
  }
);

export { router as predictionsRouter };
