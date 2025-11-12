var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { retry } from "../../helpers";
export function fetchLiveScores(apiUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield retry(() => __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Failed to fetch live scores: ${response.statusText}`);
            }
            return response;
        }));
        return yield response.json();
    });
}
export function fetchFixturesByDate(fixturesByDate) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield retry(() => __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(fixturesByDate);
            if (!response.ok) {
                throw new Error(`Failed to fetch fixtures: ${response.statusText}`);
            }
            return response;
        }));
        const data = yield response.json();
        return data.response.slice(0, 15);
    });
}
export function fetchFixturesByStatus(fixturesByStatus) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield retry(() => __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(fixturesByStatus);
            if (!response.ok) {
                throw new Error(`Failed to fetch fixtures by status: ${response.statusText}`);
            }
            return response;
        }));
        const data = yield response.json();
        return data.response.slice(0, 15);
    });
}
