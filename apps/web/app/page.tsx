import { CompetitionsList } from "@/components/features/competitions-list";
import { FixturesWithDate } from "@/components/features/fixtures-with-date";
import { LeagueStandings } from "@/components/features/league-standings";
import { Card } from "@/components/ui/card";
import { apiClient } from "@/lib/api-client";
import { transformFixtures } from "@/lib/transform-fixtures";

async function getCompetitions() {
  try {
    const leagues = await apiClient.leagues.getAll();

    // Transform API-Football response to match our component interface
    return leagues.map((item: any) => ({
      id: item.league.id,
      name: item.league.name,
      country: item.country.name,
      logo: item.league.logo,
    }));
  } catch (error: any) {
    // Log but don't crash - gracefully handle rate limits and errors
    if (error.message?.includes('429')) {
      console.warn("Competitions API rate limited - using empty state");
    } else {
      console.error("Failed to fetch competitions:", error);
    }
    return [];
  }
}

async function getNews() {
  try {
    const newsData = await apiClient.news.getAll();
    return newsData.articles.slice(0, 5); // Get first 5 articles
  } catch (error: any) {
    // Log but don't crash - gracefully handle rate limits and errors
    if (error.message?.includes('429')) {
      console.warn("News API rate limited - using empty state");
    } else {
      console.error("Failed to fetch news:", error);
    }
    return [];
  }
}

async function getFixtures() {
  try {
    // Get all fixtures (live + today's scheduled)
    const fixturesData = await apiClient.fixtures.getAll();

    // Combine live scores and today's fixtures
    const liveFixtures = fixturesData.liveScores?.response || [];
    const todayFixtures = fixturesData.fixturesByDate?.response || [];

    // Combine and limit to 30 fixtures to save on rendering
    const allFixtures = [...liveFixtures, ...todayFixtures].slice(0, 30);

    return transformFixtures(allFixtures);
  } catch (error: any) {
    // Log but don't crash - gracefully handle rate limits and errors
    if (error.message?.includes('429')) {
      console.warn("Fixtures API rate limited - using empty state");
    } else {
      console.error("Failed to fetch fixtures:", error);
    }
    return [];
  }
}

async function getStandings() {
  try {
    // Get standings for Premier League (ID: 39) as default
    const leagueData = await apiClient.leagues.getById("39");

    // Return all teams from the standings
    return leagueData.league || [];
  } catch (error: any) {
    // Log but don't crash - gracefully handle rate limits and errors
    if (error.message?.includes('429')) {
      console.warn("Standings API rate limited - using empty state");
    } else {
      console.error("Failed to fetch standings:", error);
    }
    return [];
  }
}

export default async function HomePage() {
  const [competitions, news, fixtures, standings] = await Promise.all([
    getCompetitions(),
    getNews(),
    getFixtures(),
    getStandings(),
  ]);

  return (
    <div className="max-w-[1200px] mx-auto mb-16 px-4 md:px-6">
      {/* 3-Column Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-[7fr_17fr] xl:grid-cols-[6fr_12fr_7fr] gap-4 md:gap-6 mt-4 md:mt-8">
        {/* Left Sidebar - Top Competitions */}
        <aside className="hidden md:block">
          <Card heading="Top Competitions" className="h-[80vh] overflow-auto">
            {competitions.length > 0 ? (
              <CompetitionsList competitions={competitions} />
            ) : (
              <div className="p-4 text-gray-500 text-sm">
                No competitions available
              </div>
            )}
          </Card>
        </aside>

        {/* Main Content - Matches */}
        <main className="min-w-0">
          <FixturesWithDate initialFixtures={fixtures} />
        </main>

        {/* Right Sidebar - Search, Standings, News */}
        <aside className="hidden xl:block space-y-6">
          {/* Search */}
          <div className="bg-surface border border-gray-800 rounded-[15px] p-4">
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search teams, players..."
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:bg-gray-900 transition-colors"
              />
            </div>
          </div>

          {/* Standings */}
          <LeagueStandings
            initialStandings={standings}
            initialLeagueId={39}
            initialLeagueName="Premier League"
          />

          {/* Latest News */}
          <Card heading="Latest News" className="max-h-[40vh] overflow-auto">
            {news.length > 0 ? (
              <div className="divide-y divide-gray-800">
                {news.map((article, index) => (
                  <a
                    key={index}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 hover:bg-gray-800/50 transition-colors"
                  >
                    <h4 className="text-white text-sm font-medium mb-1 line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-gray-500 text-xs mb-2 line-clamp-2">
                      {article.description}
                    </p>
                    <span className="text-gray-600 text-xs">
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                  </a>
                ))}
              </div>
            ) : (
              <div className="p-4 text-gray-500 text-sm">No news available</div>
            )}
          </Card>
        </aside>
      </div>
    </div>
  );
}
