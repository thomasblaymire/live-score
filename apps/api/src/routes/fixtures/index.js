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
import { isString, catchAsync, retry, sendError, prisma } from "../../helpers";
import { fetchLiveScores, fetchFixturesByDate, fetchFixturesByStatus, } from "./requests";
const router = express.Router();
// Returns specific fixtures for a given team id
router.get("/api/fixtures/:team", catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const teamId = parseInt(req.params.team);
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    console.log("debug", {
        page,
        pageSize,
        teamId,
    });
    try {
        const fixtures = yield prisma.fixture.findMany({
            where: {
                OR: [{ homeTeamId: teamId }, { awayTeamId: teamId }],
                date: {
                    gte: currentDate,
                },
            },
            orderBy: {
                date: "asc",
            },
            select: {
                id: true,
                homeTeam: true,
                awayTeam: true,
                league: true,
                date: true,
                status: true,
            },
            skip: skip,
            take: pageSize,
        });
        res.status(200).json(fixtures);
    }
    catch (error) {
        console.error("Error fetching fixtures:", error);
        res.status(500).json({ error: "Failed to fetch fixtures" });
    }
})));
// Returns all fixtures for a date range inc (live matches, odds, finished matches)
router.get("/api/fixtures", catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { getDate } = Date.prototype;
    const today = new Date();
    const tomorrow = new Date(getDate.call(today) + 1);
    try {
        const [liveScores, fixturesByDate, fixturesByStatus] = yield Promise.all([
            retry(() => fetchLiveScores(`${process.env.MOCKY_LIVE_SCORES}`)),
            retry(() => fetchFixturesByDate(`${process.env.MOCKY_FIXTURES_BY_DATE}`)),
            retry(() => fetchFixturesByStatus(`${process.env.MOCKY_FIXTURES_BY_STATUS}`)),
        ]);
        const response = {
            liveScores,
            fixturesByDate,
            fixturesByStatus,
        };
        res.json(response);
    }
    catch (error) {
        console.error(error);
        sendError(res, 500, "Failed to fetch data from API");
    }
})));
router.get("/api/fixtures-all/date", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const startDate = req.query.start;
    const endDate = req.query.end;
    if (!isString(startDate) || !isString(endDate)) {
        sendError(res, 400, "Both start and end date query parameters are required.");
        return;
    }
    const startDateTime = new Date(startDate);
    const endDateTime = new Date(endDate);
    endDateTime.setHours(23, 59, 59, 999);
    try {
        const fixtures = yield prisma.fixture.findMany({
            where: {
                date: {
                    gte: startDateTime,
                    lte: endDateTime,
                },
            },
            include: {
                homeTeam: true,
                awayTeam: true,
                status: true,
                goals: true,
                score: true,
                league: true,
                venue: true,
            },
            orderBy: {
                date: "asc",
            },
        });
        res.status(200).json(fixtures);
    }
    catch (error) {
        console.error("Error fetching fixtures by date range:", error);
        res.status(500).json({
            message: "An error occurred while fetching fixtures by date range.",
            error,
        });
    }
}));
// Returns specific fixtures for a given teamID and youtube generated URL
router.get("/api/fixture/:id", catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // console.log("debug req.params:", req.params);
    // const url = `${process.env.FOOTBALL_API_URL}/fixtures?id=${id}`;
    // const options: any = {
    //   method: "GET",
    //   headers: {
    //     "X-RapidAPI-Key": process.env.FOOTBALL_API_TOKEN,
    //     "X-RapidAPI-Host": process.env.FOOTBALL_API_HOST,
    //   },
    // };
    // try {
    //   const response = await fetch(url, options);
    //   const data = await response.json();
    //   console.log("debug data from call", data);
    //   res.json(data.response[0]);
    // } catch (error) {
    //   console.error(error);
    // }
    const response = yield fetch(`${process.env.MOCKY_FIXTURE_BY_ID_API_URL}`);
    const data = yield response.json();
    res.json(data.response[0]);
})));
export { router as fixturesRouter };
