import express, { Request, Response } from "express";
import { catchAsync } from "../../helpers/async";
import { leagueCodes } from "../../constants";
import { formatDate } from "../../helpers/date";
import { getVideoTagByQuery } from "../../helpers/youtube";
import { fetchApi } from "../../helpers/fetch";

const router = express.Router();

router.get(
  "/api/competitions",
  catchAsync(async (req: Request, res: Response) => {
    const response = await fetchApi("/competitions");
    const data = await response.json();
    const formattedData = data?.competitions?.filter(
      (competition: any) => competition.id !== 2152
    );

    res.json(formattedData);
  })
);

router.get(
  "/api/matches",
  catchAsync(async (req: Request, res: Response) => {
    const today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const response = await fetchApi(
      `/matches?competitions=${leagueCodes}&dateFrom=${formatDate(
        today
      )}&dateTo=${formatDate(tomorrow)}`
    );

    let data = await response.json();
    const filtred = data.matches
      .sort((a: any, b: any) => a.status.localeCompare(b.status === "IN_PLAY"))
      .reverse();

    res.json(data);
  })
);

router.get(
  "/api/match/:id",
  catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await fetchApi(`/matches/${id}`);
    const footballAPIData = await response.json();
    const youtubeQuery = `${footballAPIData.homeTeam.name} vs ${footballAPIData.awayTeam.name}`;
    const youtubeVideoID = await getVideoTagByQuery(youtubeQuery);

    res.json({ ...footballAPIData, ...{ youtubeID: youtubeVideoID } });
  })
);

router.get(
  "/api/standings/:league",
  catchAsync(async (req: Request, res: Response) => {
    const { league } = req.params;
    const response = await fetchApi(`/competitions/${league}/standings`);
    const data = await response.json();

    res.json(data.standings[0].table);
  })
);

export { router as footballRouter };
