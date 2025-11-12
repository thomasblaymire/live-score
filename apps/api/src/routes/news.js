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
import { catchAsync } from "../helpers";
const router = express.Router();
router.get("/api/news", catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`https://newsapi.org/v2/top-headlines?q=football&country=gb&category=sports&apiKey=${process.env.FOOTBALL_NEWS_API_KEY}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch data from API: ${response.statusText}`);
    }
    const data = yield response.json();
    res.json(data);
})));
router.get("/api/news/team", catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("debug req.query", req.query);
    const team = req.query.name;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 5;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const response = yield fetch(`https://newsapi.org/v2/top-headlines?q=${team}&country=gb&category=sports&apiKey=${process.env.FOOTBALL_NEWS_API_KEY}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch data from API: ${response.statusText}`);
    }
    const data = yield response.json();
    const paginatedData = data.articles.slice(startIndex, endIndex);
    res.json({
        currentPage: page,
        totalPages: Math.ceil(data.length / limit),
        data: paginatedData,
    });
})));
export { router as newsRouter };
