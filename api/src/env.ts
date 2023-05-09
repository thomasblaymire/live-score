import { z } from "zod";

// Allows type safety of process.env values
const envVariables = z.object({
  PORT: z.string(),
  FOOTBALL_API_TOKEN: z.string(),
  FOOTBALL_API_URL: z.string(),
  FOOTBALL_API_HOST: z.string(),
  GOOGLE_API_KEY: z.string(),
  MOCKY_SEARCH_API_URL: z.string(),
  MOCKY_TOP_COMPETITIONS_API_URL: z.string(),
  MOCKY_STANDINGS_API_URL: z.string(),
  MOCKY_TOP_SCORERS_API_URL: z.string(),
  MOCKY_TEAM_FIXTURES_API_URL: z.string(),
  MOCKY_ALL_TEAMS_API_URL: z.string(),
  MOCKY_FIXTURE_BY_ID_API_URL: z.string(),
  JWT_SECRET: z.string(),
  FOOTBALL_NEWS_API_KEY: z.string(),
});

envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
