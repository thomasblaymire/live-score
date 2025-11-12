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
router.get("/api/teams", catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(process.env.MOCKY_ALL_TEAMS_API_URL);
        const data = yield response.json();
        res.json(data);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Sorry, something went wrong." });
    }
})));
router.get("/api/teams/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
export { router as teamsRouter };
