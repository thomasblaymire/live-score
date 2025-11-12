var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { google } from "googleapis";
export const getVideoTagByQuery = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const defaultChannel = "SkySportsPremierLeague";
    const youtube = google.youtube({
        version: "v3",
        auth: process.env.GOOGLE_API_KEY,
    });
    // We can get fancy with this in the future and search YT for league specific, time etc
    const response = yield youtube.search.list({
        part: "snippet",
        q: `${defaultChannel} ${query}`,
    });
    // @ts-ignore
    return response.data.items[0].id.videoId;
});
