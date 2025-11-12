var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import rateLimit from "express-rate-limit";
import { prisma } from "../helpers/prisma";
import { verifyAuth } from "../middlewares/auth";
const router = express.Router();
const favouriteRateLimit = rateLimit({
    windowMs: 60 * 1000,
    max: 15,
    message: "Too many requests, please try again later.",
});
router.post("/api/favourites", verifyAuth, favouriteRateLimit, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, favType, favTypeId } = req.body;
    try {
        const favorite = yield prisma.favorite.create({
            data: {
                userId,
                favType,
                favTypeId,
            },
        });
        res.status(201).json(favorite);
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "Something went wrong while adding the favorite" });
    }
}));
router.delete("/api/favourites", verifyAuth, favouriteRateLimit, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, favType, favTypeId } = req.body;
    try {
        const favorite = yield prisma.favorite.delete({
            where: {
                userId_favType_favTypeId: {
                    userId: userId,
                    favType: favType,
                    favTypeId: favTypeId,
                },
            },
        });
        res.status(200).json(favorite);
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "Something went wrong while removing the favorite" });
    }
}));
router.post("/api/favourites/status", verifyAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, favItems } = req.body;
    try {
        const favorites = yield prisma.favorite.findMany({
            where: {
                userId: userId,
                favType: { in: favItems.map((item) => item.favType) },
                favTypeId: { in: favItems.map((item) => Number(item.favTypeId)) },
            },
        });
        const favoritesMap = favorites.reduce((acc, favorite) => {
            acc[`${favorite.favType}_${favorite.favTypeId}`] = true;
            return acc;
        }, {});
        res.status(200).json(favoritesMap);
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "Something went wrong while checking favorite status" });
    }
}));
export { router as favouritesRouter };
