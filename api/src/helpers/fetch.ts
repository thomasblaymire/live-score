import { RequestInfo, RequestInit } from "node-fetch";

const fetch = (url: RequestInfo, init?: RequestInit) =>
  import("node-fetch").then(({ default: fetch }) => fetch(url, init));

export const fetchApi = (url: string, type?: any) => {
  console.log("debuuuuug", url);
  return fetch(`${process.env.FOOTBALL_API_URL}${url}`, {
    headers: {
      "X-Auth-Token": process.env.FOOTBALL_TOKEN as string,
    },
  });
};
