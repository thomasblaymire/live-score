import express, { Request, Response } from "express";
import { RequestInfo, RequestInit } from "node-fetch";
import { catchAsync } from "../../helpers/async";
import { leagueCodes } from "../../constants";
import { formatDate } from "../../helpers/date";

const fetch = (url: RequestInfo, init?: RequestInit) =>
  import("node-fetch").then(({ default: fetch }) => fetch(url, init));

const router = express.Router();

router.get(
  "/api/competitions",
  catchAsync(async (req: Request, res: Response) => {
    const response = await fetch(
      `${process.env.FOOTBALL_API_URL}/competitions`,
      {
        headers: {
          "X-Auth-Token": process.env.FOOTBALL_TOKEN as string,
        },
      }
    );

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

    const response = await fetch(
      `${
        process.env.FOOTBALL_API_URL
      }/matches?competitions=${leagueCodes}&dateFrom=${formatDate(
        today
      )}&dateTo=${formatDate(tomorrow)}`,
      {
        headers: {
          "X-Auth-Token": process.env.FOOTBALL_TOKEN as string,
        },
      }
    );

    const data = await response.json();
    res.json(data);
  })
);

export { router as footballRouter };
