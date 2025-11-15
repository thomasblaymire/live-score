import { CompetitionsList } from "@/components/features/competitions-list";
import { ScoreBoard } from "@/components/features/scoreboard";
import { Card } from "@/components/ui/card";
import { apiClient } from "@/lib/api-client";
import { transformFixtures } from "@/lib/transform-fixtures";
import { mockStandings } from "@/data/mock-data";

async function getCompetitions() {
  try {
    const leagues = await apiClient.leagues.getAll();
    return leagues;
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
    // Get fixtures for today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const startDate = today.toISOString();
    const endDate = tomorrow.toISOString();

    const fixtures = await apiClient.fixtures.getByDateRange(startDate, endDate);
    return transformFixtures(fixtures);
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
    <div className="max-w-[1200px] mx-auto mb-16">
      {/* 3-Column Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-[7fr_17fr] xl:grid-cols-[6fr_12fr_7fr] gap-6 mt-8">
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

          {fixtures.length > 0 ? (
            <ScoreBoard fixtures={fixtures} />
          ) : (
            <div className="bg-surface border border-gray-800 rounded-[15px] p-8 text-center text-gray-500">
              No matches scheduled for today
            </div>
          )}
        </main>

        {/* Right Sidebar - Search, News, Standings */}
        <aside className="hidden xl:block space-y-6">
          {/* Search */}
          <Card className="h-[45vh] overflow-auto">
            <div className="p-4">
              <input
                type="text"
                placeholder="Search teams, players..."
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
              />
            </div>
          </Card>

          {/* Latest News */}
          <Card heading="Latest News" className="h-[45vh] overflow-auto">
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
