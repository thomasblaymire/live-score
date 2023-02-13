import express, { Request, Response } from "express";
import { catchAsync } from "../../helpers/async";
import { prisma } from "../../helpers/prisma";

const router = express.Router();

// ADD FAVOURITE MATCH
// ADD VERIFY_AUTH
router.post(
  "/api/favourites",
  catchAsync(async (req: Request, res: Response) => {
    const { matchId, userId } = req.body;

    if (!matchId) {
      return res
        .status(400)
        .json({ message: "Unable to add favourite match, plase try again." });
    }

    try {
      await prisma.favourites.create({
        data: {
          matchId,
          userId,
        },
      });
      return res.json({ matchId, status: "ADDED" });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Sorry, something went wrong." });
    }
  })
);

router.delete(
  "/api/favourites",
  catchAsync(async (req: Request, res: Response) => {
    const { matchId } = req.body;

    if (!matchId) {
      return res.status(400).json({
        message: "Unable to remove favourite match, plase try again.",
      });
    }

    try {
      await prisma.favourites.delete({
        where: {
          id: "dsds",
        },
      });
      return res.json({ matchId, status: "REMOVED" });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Sorry, something went wrong." });
    }
  })
);

// GET FAVOURITE MATCHES
// REQUIRE AUTH
router.get(
  "/api/favourites",
  catchAsync(async (req: Request, res: Response) => {
    const { userId } = req.body;
    try {
      const favourites = await prisma.favourites.findMany({
        where: {
          userId,
        },
      });
      return res.json(favourites);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Sorry, something went wrong." });
    }
  })
);

export { router as favouritesRouter };
