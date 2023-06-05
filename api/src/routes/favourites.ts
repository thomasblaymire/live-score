import express, { Request, Response } from "express";
import rateLimit from "express-rate-limit";
import { prisma } from "../helpers/prisma";
import { verifyAuth } from "../middlewares/auth";

const router = express.Router();

const favouriteRateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 15,
  message: "Too many requests, please try again later.",
});

router.post(
  "/api/favourites",
  verifyAuth,
  favouriteRateLimit,
  async (req: Request, res: Response) => {
    const { userId, favType, favTypeId } = req.body;

    try {
      const favorite = await prisma.favorite.create({
        data: {
          userId,
          favType,
          favTypeId,
        },
      });

      res.status(201).json(favorite);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Something went wrong while adding the favorite" });
    }
  }
);

router.delete(
  "/api/favourites",
  verifyAuth,
  favouriteRateLimit,
  async (req: Request, res: Response) => {
    const { userId, favType, favTypeId } = req.body;

    try {
      const favorite = await prisma.favorite.delete({
        where: {
          userId_favType_favTypeId: {
            userId: userId,
            favType: favType,
            favTypeId: favTypeId,
          },
        },
      });

      res.status(200).json(favorite);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Something went wrong while removing the favorite" });
    }
  }
);

router.post(
  "/api/favourites/status",
  verifyAuth,
  async (req: Request, res: Response) => {
    const { userId, favItems } = req.body as {
      userId: string;
      favItems: { favType: string; favTypeId: string }[];
    };

    try {
      const favorites = await prisma.favorite.findMany({
        where: {
          userId: userId,
          favType: { in: favItems.map((item) => item.favType) },
          favTypeId: { in: favItems.map((item) => Number(item.favTypeId)) },
        },
      });

      const favoritesMap = favorites.reduce(
        (acc: { [key: string]: boolean }, favorite) => {
          acc[`${favorite.favType}_${favorite.favTypeId}`] = true;
          return acc;
        },
        {}
      );

      res.status(200).json(favoritesMap);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Something went wrong while checking favorite status" });
    }
  }
);

export { router as favouritesRouter };
