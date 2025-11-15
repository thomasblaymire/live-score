import { CompetitionsList } from "@/components/features/competitions-list";
import { FixturesWithDate } from "@/components/features/fixtures-with-date";
import { Card } from "@/components/ui/card";
import { apiClient } from "@/lib/api-client";
import { transformFixtures } from "@/lib/transform-fixtures";
import { mockStandings } from "@/data/mock-data";

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
  } catch (error) {
    console.error("Failed to fetch competitions:", error);
    return [];
  }
}

async function getNews() {
  try {
    const newsData = await apiClient.news.getAll();
    return newsData.articles.slice(0, 5); // Get first 5 articles
  } catch (error) {
    console.error("Failed to fetch news:", error);
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
  } catch (error) {
    console.error("Failed to fetch fixtures:", error);
    return [];
  }
}

export default async function HomePage() {
  const [competitions, news, fixtures] = await Promise.all([
    getCompetitions(),
    getNews(),
    getFixtures(),
  ]);

  return (
    <div className="max-w-[1200px] mx-auto mb-16 px-4 md:px-6">
      {/* 3-Column Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-[7fr_17fr] xl:grid-cols-[6fr_12fr_7fr] gap-4 md:gap-6 mt-4 md:mt-8">
        {/* Left Sidebar - Top Competitions */}
        <aside className="hidden md:block">
          <Card heading="Top Competitions" className="h-[45vh] overflow-auto">
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
        <main>
          <div className="mb-6 hidden md:block">
            <div className="bg-gradient-to-r from-primary to-blue-600 rounded-lg p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">Welcome to Live Score</h2>
              <p className="text-blue-100">
                Follow live football scores and predictions
              </p>
            </div>
          </div>

          <h2 className="text-white text-xl font-semibold mb-4 hidden md:block">
            Football Matches
          </h2>

          <FixturesWithDate initialFixtures={fixtures} />
        </main>

        {/* Right Sidebar - Search, News, Standings */}
        <aside className="hidden xl:block space-y-6">
          {/* Search */}
          <Card className="overflow-auto">
            <div className="p-4">
              <input
                type="text"
                placeholder="Search teams, players..."
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
              />
            </div>
          </Card>

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

          {/* Standings */}
          <Card heading="Standings" className="overflow-auto">
            <div className="p-4">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-gray-500">
                    <th className="text-left pb-2">#</th>
                    <th className="text-left pb-2">Team</th>
                    <th className="text-center pb-2">P</th>
                    <th className="text-center pb-2">Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {mockStandings.map((team) => (
                    <tr
                      key={team.position}
                      className="border-t border-gray-800"
                    >
                      <td className="py-2 text-gray-400">{team.position}</td>
                      <td className="py-2 text-white">{team.team}</td>
                      <td className="py-2 text-center text-gray-400">
                        {team.played}
                      </td>
                      <td className="py-2 text-center text-white font-semibold">
                        {team.points}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
