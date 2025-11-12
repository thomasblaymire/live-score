// import express, { Request, Response } from "express";
// import { prisma, catchAsync } from "../../helpers";
// import { verifyAuth } from "../../middlewares/auth";

// const router = express.Router();

// interface RequestWithUserId extends Request {
//   query: {
//     userId: string;
//     page?: string;
//     limit?: string;
//   };
// }

// // Get Favourite Matches
// router.get(
//   "/api/favourites",
//   verifyAuth,
//   catchAsync(async (req: RequestWithUserId, res: Response) => {
//     const { userId, page = "1", limit = "10" } = req.query;
//     const offset = (parseInt(page) - 1) * parseInt(limit);
//     try {
//       const [favourites, totalCount] = await Promise.all([
//         prisma.favourites.findMany({
//           where: {
//             userId,
//           },
//           take: parseInt(limit),
//           skip: offset,
//         }),
//         prisma.favourites.count({
//           where: {
//             userId,
//           },
//         }),
//       ]);
//       if (favourites.length === 0) {
//         return res.status(404).json({
//           message: `No favourites found for user ID: ${userId}`,
//         });
//       }
//       return res.json({ favourites, totalCount });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: "Sorry, something went wrong." });
//     }
//   })
// );

// // Add Favourite Match
// router.post(
//   "/api/favourites",
//   verifyAuth,
//   catchAsync(async (req: Request, res: Response) => {
//     const { matchId, userId } = req.body;

//     if (!matchId || !userId) {
//       return res.status(400).json({
//         message: "Unable to add favourite match, please try again.",
//       });
//     }

//     try {
//       const favorite = await prisma.favourites.create({
//         data: {
//           matchId,
//           userId,
//         },
//       });
//       return res.json({ matchId, status: "ADDED", favorite });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: "Sorry, something went wrong." });
//     }
//   })
// );

// // Remove Favourite Match
// router.delete(
//   "/api/favourites",
//   verifyAuth,
//   catchAsync(async (req: Request, res: Response) => {
//     const { matchId, userId } = req.body;

//     if (!matchId || !userId) {
//       return res.status(400).json({
//         message: "Unable to remove favourite match, plase try again.",
//       });
//     }

//     try {
//       await prisma.favourites.delete({
//         where: {
//           id: matchId,
//         },
//       });
//       return res.json({ matchId, status: "REMOVED" });
//     } catch (e) {
//       console.error(e);
//       return res.status(500).json({ message: "Sorry, something went wrong." });
//     }
//   })
// );

// export { router as favouritesRouter };
