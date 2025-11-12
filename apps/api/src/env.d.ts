import { z } from "zod";
declare const envVariables: z.ZodObject<{
    PORT: z.ZodString;
    FOOTBALL_API_TOKEN: z.ZodString;
    FOOTBALL_API_URL: z.ZodString;
    FOOTBALL_API_HOST: z.ZodString;
    GOOGLE_API_KEY: z.ZodString;
    MOCKY_SEARCH_API_URL: z.ZodString;
    MOCKY_TOP_COMPETITIONS_API_URL: z.ZodString;
    MOCKY_STANDINGS_API_URL: z.ZodString;
    MOCKY_TOP_SCORERS_API_URL: z.ZodString;
    MOCKY_TEAM_FIXTURES_API_URL: z.ZodString;
    MOCKY_ALL_TEAMS_API_URL: z.ZodString;
    MOCKY_FIXTURE_BY_ID_API_URL: z.ZodString;
    JWT_SECRET: z.ZodString;
    FOOTBALL_NEWS_API_KEY: z.ZodString;
}, "strip", z.ZodTypeAny, {
    PORT: string;
    FOOTBALL_API_TOKEN: string;
    FOOTBALL_API_URL: string;
    FOOTBALL_API_HOST: string;
    GOOGLE_API_KEY: string;
    MOCKY_SEARCH_API_URL: string;
    MOCKY_TOP_COMPETITIONS_API_URL: string;
    MOCKY_STANDINGS_API_URL: string;
    MOCKY_TOP_SCORERS_API_URL: string;
    MOCKY_TEAM_FIXTURES_API_URL: string;
    MOCKY_ALL_TEAMS_API_URL: string;
    MOCKY_FIXTURE_BY_ID_API_URL: string;
    JWT_SECRET: string;
    FOOTBALL_NEWS_API_KEY: string;
}, {
    PORT: string;
    FOOTBALL_API_TOKEN: string;
    FOOTBALL_API_URL: string;
    FOOTBALL_API_HOST: string;
    GOOGLE_API_KEY: string;
    MOCKY_SEARCH_API_URL: string;
    MOCKY_TOP_COMPETITIONS_API_URL: string;
    MOCKY_STANDINGS_API_URL: string;
    MOCKY_TOP_SCORERS_API_URL: string;
    MOCKY_TEAM_FIXTURES_API_URL: string;
    MOCKY_ALL_TEAMS_API_URL: string;
    MOCKY_FIXTURE_BY_ID_API_URL: string;
    JWT_SECRET: string;
    FOOTBALL_NEWS_API_KEY: string;
}>;
declare global {
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof envVariables> {
        }
    }
}
export {};
//# sourceMappingURL=env.d.ts.map