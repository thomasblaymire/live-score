import express, { Request, Response } from "express";

const router = express.Router();

router.post("/api/favourites", async (req: Request, res: Response) => {
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
});

router.delete("/api/favourites", async (req: Request, res: Response) => {
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
});

export { router as favouritesRouter };
