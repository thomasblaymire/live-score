import { google } from "googleapis";

export const getVideoTagByQuery = async (query: string) => {
  const defaultChannel = "SkySportsPremierLeague";

  const youtube = google.youtube({
    version: "v3",
    auth: process.env.GOOGLE_API_KEY,
  });

  // We can get fancy with this in the future and search YT for league specific, time etc
  const response = await youtube.search.list({
    part: "snippet" as any,
    q: `${defaultChannel} ${query}`,
  });

  // @ts-ignore
  return response.data.items[0].id.videoId;
};
