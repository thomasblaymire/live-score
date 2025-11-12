import { Card } from "@/components/ui/card";
import { CompetitionsList } from "@/components/features/competitions-list";
import { ScoreBoard } from "@/components/features/scoreboard";
import { mockCompetitions, mockFixtures, mockNews, mockStandings } from "@/data/mock-data";

export default function HomePage() {
  return (
    <div className="max-w-[1200px] mx-auto mb-16">
      {/* 3-Column Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-[7fr_17fr] xl:grid-cols-[6fr_12fr_7fr] gap-6 mt-8">
        {/* Left Sidebar - Top Competitions */}
        <aside className="hidden md:block">
          <Card heading="Top Competitions" className="h-[45vh] overflow-auto">
            <CompetitionsList competitions={mockCompetitions} />
          </Card>
        </aside>

        {/* Main Content - Matches */}
        <main>
          <div className="mb-6 hidden md:block">
            <div className="bg-gradient-to-r from-primary to-blue-600 rounded-lg p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">Welcome to Live Score</h2>
              <p className="text-blue-100">Follow live football scores and predictions</p>
            </div>
          </div>
          
          <h2 className="text-white text-xl font-semibold mb-4 hidden md:block">
            Football Matches
          </h2>
          
          <ScoreBoard fixtures={mockFixtures} />
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
            <div className="divide-y divide-gray-800">
              {mockNews.map((article) => (
                <a
                  key={article.id}
                  href="#"
                  className="block p-4 hover:bg-gray-800/50 transition-colors"
                >
                  <h4 className="text-white text-sm font-medium mb-1 line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-gray-500 text-xs mb-2 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <span className="text-gray-600 text-xs">{article.publishedAt}</span>
                </a>
              ))}
            </div>
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
                    <tr key={team.position} className="border-t border-gray-800">
                      <td className="py-2 text-gray-400">{team.position}</td>
                      <td className="py-2 text-white">{team.team}</td>
                      <td className="py-2 text-center text-gray-400">{team.played}</td>
                      <td className="py-2 text-center text-white font-semibold">{team.points}</td>
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
