import Image from "next/image";
import { Card } from "@/components/ui/card";
import { LeagueFixtures } from "@/components/features/league-fixtures";
import { apiClient } from "@/lib/api-client";
import { transformFixtures } from "@/lib/transform-fixtures";

// Map of league IDs to names for known leagues
const LEAGUE_NAMES: Record<string, { name: string; country: string; slug: string }> = {
  "39": { name: "Premier League", country: "England", slug: "premier-league" },
  "40": { name: "Championship", country: "England", slug: "championship" },
  "41": { name: "League One", country: "England", slug: "league-one" },
  "42": { name: "League Two", country: "England", slug: "league-two" },
  "2": { name: "Champions League", country: "Europe", slug: "champions-league" },
  "140": { name: "La Liga", country: "Spain", slug: "la-liga" },
  "78": { name: "Bundesliga", country: "Germany", slug: "bundesliga" },
  "135": { name: "Serie A", country: "Italy", slug: "serie-a" },
  "61": { name: "Ligue 1", country: "France", slug: "ligue-1" },
  "3": { name: "Europa League", country: "Europe", slug: "europa-league" },
};

async function getLeagueData(leagueId: string) {
  try {
    const [leagueDetails, fixtures, broadcasts] = await Promise.all([
      apiClient.leagues.getById(leagueId),
      apiClient.leagues.getFixtures(leagueId),
      apiClient.broadcasts.getByLeague(leagueId),
    ]);

    return {
      standings: leagueDetails.league || [],
      topScorers: leagueDetails.topScorers || [],
      fixtures: transformFixtures(fixtures),
      broadcasts: broadcasts || null,
    };
  } catch (error: any) {
    // Log but don't crash - gracefully handle rate limits and errors
    if (error.message?.includes('429')) {
      console.warn(`League ${leagueId} API rate limited - using empty state`);
    } else {
      console.error("Failed to fetch league data:", error);
    }
    return {
      standings: [],
      topScorers: [],
      fixtures: [],
      broadcasts: null,
    };
  }
}

export default async function LeaguePage({
  params,
}: {
  params: Promise<{ id: string; slug: string }>;
}) {
  const { id } = await params;
  const { standings, topScorers, fixtures, broadcasts } = await getLeagueData(id);
  const leagueInfo = LEAGUE_NAMES[id] || {
    name: "League",
    country: "Unknown",
    slug: "league",
  };

  return (
    <div className="max-w-[1200px] mx-auto mb-16 px-4 md:px-6">
      {/* League Header */}
      <div className="mt-6 mb-8">
        <div className="flex items-center gap-4 mb-2">
          <h1 className="text-3xl font-bold text-white">{leagueInfo.name}</h1>
        </div>
        <p className="text-gray-400">{leagueInfo.country}</p>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
        {/* Main content - Fixtures */}
        <div className="space-y-6">
          <Card heading="Fixtures">
            <div className="p-4">
              <LeagueFixtures fixtures={fixtures} />
            </div>
          </Card>
        </div>

        {/* Right sidebar - Stats */}
        <aside className="space-y-6">
          {/* Where to Watch */}
          {broadcasts && broadcasts.broadcasters.length > 0 && (
            <Card heading="Where to Watch" className="overflow-hidden">
              <div className="p-4 space-y-3">
                {broadcasts.broadcasters.map((broadcaster, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-gray-800/30 rounded-lg"
                  >
                    <div className="flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm">
                        {broadcaster.name}
                      </p>
                      {broadcaster.channels.length > 0 && (
                        <p className="text-gray-400 text-xs mt-1">
                          {broadcaster.channels.join(", ")}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <span
                          className={`text-xs px-2 py-0.5 rounded ${
                            broadcaster.type === "streaming"
                              ? "bg-purple-900/30 text-purple-300"
                              : broadcaster.type === "tv"
                              ? "bg-blue-900/30 text-blue-300"
                              : "bg-green-900/30 text-green-300"
                          }`}
                        >
                          {broadcaster.type === "streaming"
                            ? "Streaming"
                            : broadcaster.type === "tv"
                            ? "TV"
                            : "TV & Streaming"}
                        </span>
                        {broadcaster.requiresSubscription && (
                          <span className="text-xs text-gray-500">
                            Subscription required
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Top Scorers */}
          <Card heading="Top Scorers" className="max-h-[500px] overflow-auto">
            {topScorers.length > 0 ? (
              <div className="divide-y divide-gray-800">
                {topScorers.slice(0, 10).map((scorer, index) => {
                  const stats = scorer.statistics[0];
                  // Handle goals being either an object or a number
                  const goalsTotal = typeof stats.goals === 'object' && stats.goals !== null ? (stats.goals as any).total : stats.goals;

                  return (
                    <div
                      key={`${scorer.player.id}-${index}`}
                      className="p-3 hover:bg-gray-800/30 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                            <span className="text-gray-500 text-xs font-semibold">
                              {index + 1}
                            </span>
                          </div>
                          <div className="flex-shrink-0 w-6 h-6 relative">
                            {stats.team.logo ? (
                              <Image
                                src={stats.team.logo}
                                alt={stats.team.name}
                                fill
                                className="object-contain"
                              />
                            ) : null}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-medium truncate">
                              {scorer.player.name}
                            </p>
                            <p className="text-gray-500 text-xs truncate">
                              {stats.team.name}
                            </p>
                          </div>
                        </div>
                        <div className="flex-shrink-0 ml-3">
                          <span className="text-white font-bold text-lg">
                            {goalsTotal || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-4 text-gray-500 text-sm text-center">
                No top scorers data available
              </div>
            )}
          </Card>

          {/* Standings */}
          <Card heading="Standings" className="max-h-[500px] overflow-auto">
            {standings.length > 0 ? (
              <div className="p-4">
                <table className="w-full text-xs">
                  <thead className="sticky top-0 bg-surface z-10">
                    <tr className="text-gray-500">
                      <th className="text-left pb-2 pr-2">Pos</th>
                      <th className="text-left pb-2">Team</th>
                      <th className="text-center pb-2">P</th>
                      <th className="text-center pb-2">Pts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {standings.map((standing: any) => (
                      <tr
                        key={standing.position}
                        className="border-t border-gray-800"
                      >
                        <td className="py-2 pr-2 text-gray-400">
                          {standing.rank || standing.position}
                        </td>
                        <td className="py-2 text-white">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 relative flex-shrink-0">
                              {standing.team.logo ? (
                                <Image
                                  src={standing.team.logo}
                                  alt={standing.team.name}
                                  fill
                                  className="object-contain"
                                />
                              ) : null}
                            </div>
                            <span className="truncate text-xs">
                              {standing.team.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-2 text-center text-gray-400">
                          {standing.all?.played || standing.played || 0}
                        </td>
                        <td className="py-2 text-center text-white font-semibold">
                          {standing.points}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-4 text-gray-500 text-sm text-center">
                No standings available
              </div>
            )}
          </Card>
        </aside>
      </div>
    </div>
  );
}
