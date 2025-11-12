var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fetch from "node-fetch";
import express from "express";
import { catchAsync } from "../../helpers";
const router = express.Router();
router.get("/api/leagues", catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(process.env.MOCKY_TOP_COMPETITIONS_API_URL);
        const data = yield response.json();
        res.json(data.response);
    }
    catch (error) {
        console.error("error:" + error);
    }
})));
router.get("/api/league/:league", catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { league } = req.params;
    const urls = [
        process.env.MOCKY_STANDINGS_API_URL,
        process.env.MOCKY_TOP_SCORERS_API_URL,
    ];
    const response = yield Promise.all(urls.map((url) => fetch(url).then((res) => res.json())));
    const formatted = {
        league: response[0].response[0].league.standings[0],
        topScorers: response[1].response,
    };
    res.json(formatted);
})));
export { router as leaguesRouter };
