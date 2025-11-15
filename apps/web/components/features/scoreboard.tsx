"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { generateFixtureUrl } from "@/lib/slug-helpers";

interface Fixture {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
  homeScore: number | null;
  awayScore: number | null;
  status: string;
  time: string;
  league: string;
  leagueLogo: string;
  leagueCountry: string;
}

interface ScoreBoardProps {
  fixtures: Fixture[];
  showHeader?: boolean;
}

const tabs = [
  { title: "All", value: "all" },
  { title: "Live", value: "live" },
  { title: "Finished", value: "finished" },
  { title: "Upcoming", value: "upcoming" },
];

export function ScoreBoard({ fixtures, showHeader = true }: ScoreBoardProps) {
  const [activeTab, setActiveTab] = useState("live");
  const [collapsedLeagues, setCollapsedLeagues] = useState<Set<string>>(new Set());

  const filteredFixtures = fixtures.filter((fixture) => {
    if (activeTab === "all") return true;
    if (activeTab === "live") return fixture.status === "1H" || fixture.status === "2H" || fixture.status === "HT";
    if (activeTab === "finished") return fixture.status === "FT";
    if (activeTab === "upcoming") return fixture.status === "NS" || fixture.status === "TBD";
    return true;
  });

  // Group fixtures by league
  const groupedFixtures = filteredFixtures.reduce((acc, fixture) => {
    const leagueKey = fixture.league;
    if (!acc[leagueKey]) {
      acc[leagueKey] = {
        league: fixture.league,
        logo: fixture.leagueLogo,
        country: fixture.leagueCountry,
        fixtures: [],
      };
    }
    acc[leagueKey].fixtures.push(fixture);
    return acc;
  }, {} as Record<string, { league: string; logo: string; country: string; fixtures: Fixture[] }>);

  const leagueGroups = Object.values(groupedFixtures);

  const getStatusColor = (status: string) => {
    if (status === "1H" || status === "2H") return "text-green-500";
    if (status === "HT") return "text-yellow-500";
    if (status === "FT") return "text-gray-500";
    return "text-gray-400";
  };

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      "1H": "First Half",
      "2H": "Second Half",
      "HT": "Half Time",
      "FT": "Full Time",
      "NS": "Not Started",
      "TBD": "To Be Determined",
      "LIVE": "Live",
    };
    return statusMap[status] || status;
  };

  const toggleLeague = (leagueName: string) => {
    setCollapsedLeagues((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(leagueName)) {
        newSet.delete(leagueName);
      } else {
        newSet.add(leagueName);
      }
      return newSet;
    });
  };

  const isLeagueCollapsed = (leagueName: string) => {
    return collapsedLeagues.has(leagueName);
  };

  return (
    <div className={showHeader ? "bg-surface border border-gray-800 rounded-[15px]" : ""}>
      {showHeader && (
        <>
          {/* Tabs Header */}
          <div className="flex items-center justify-between p-3 md:p-4 border-b border-gray-800">
            <div className="flex gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    activeTab === tab.value
                      ? "bg-primary text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  {tab.title}
                </button>
              ))}
            </div>
            <button className="text-gray-400 hover:text-white text-sm">
              📅 Today
            </button>
          </div>

          {/* Status Legend */}
          <div className="px-3 md:px-4 py-2 bg-gray-900/50 border-b border-gray-800">
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
              <span className="text-gray-500">
                <span className="text-green-500 font-semibold">1H/2H</span> = Live
              </span>
              <span className="text-gray-500">
                <span className="text-yellow-500 font-semibold">HT</span> = Half Time
              </span>
              <span className="text-gray-500">
                <span className="text-gray-400 font-semibold">FT</span> = Full Time
              </span>
              <span className="text-gray-500">
                <span className="text-gray-400 font-semibold">NS</span> = Not Started
              </span>
            </div>
          </div>
        </>
      )}

      {/* Fixtures List Grouped by League */}
      <div className="max-h-[600px] overflow-y-auto">
        {leagueGroups.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No matches found for this filter
          </div>
        ) : (
          leagueGroups.map((group) => (
            <div key={group.league} className="mb-2">
              {/* League Header */}
              <button
                onClick={() => toggleLeague(group.league)}
                className="sticky top-0 bg-gray-800 px-3 md:px-4 py-2 flex items-center gap-2 border-b border-gray-700 w-full hover:bg-gray-700 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 text-gray-400 transition-transform ${
                    isLeagueCollapsed(group.league) ? "-rotate-90" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="relative w-4 h-4 flex-shrink-0">
                  <Image
                    src={group.logo}
                    alt={group.league}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xs font-semibold text-gray-300">
                  {group.league}
                </span>
                <span className="text-xs text-gray-500">({group.fixtures.length})</span>
              </button>

              {/* Fixtures for this league */}
              {!isLeagueCollapsed(group.league) && (
                <div className="divide-y divide-gray-800">
                  {group.fixtures.map((fixture) => {
                    const fixtureUrl = generateFixtureUrl({
                      id: fixture.id,
                      league: fixture.league,
                      leagueCountry: fixture.leagueCountry,
                      homeTeam: fixture.homeTeam,
                      awayTeam: fixture.awayTeam,
                    });

                    return (
                      <Link
                        key={fixture.id}
                        href={fixtureUrl}
                        className="block p-2 md:p-3 hover:bg-gray-800/30 transition-colors"
                      >
                      {/* Match Details */}
                      <div className="flex items-center justify-between">
                      {/* Teams */}
                      <div className="flex-1 space-y-2">
                        {/* Home Team */}
                        <div className="flex items-center gap-2">
                          <div className="relative w-5 h-5 flex-shrink-0">
                            <Image
                              src={fixture.homeTeamLogo}
                              alt={fixture.homeTeam}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <span className="text-white text-sm flex-1">
                            {fixture.homeTeam}
                          </span>
                          <span className="text-white text-sm font-bold w-6 text-center">
                            {fixture.homeScore ?? "-"}
                          </span>
                        </div>
                        {/* Away Team */}
                        <div className="flex items-center gap-2">
                          <div className="relative w-5 h-5 flex-shrink-0">
                            <Image
                              src={fixture.awayTeamLogo}
                              alt={fixture.awayTeam}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <span className="text-white text-sm flex-1">
                            {fixture.awayTeam}
                          </span>
                          <span className="text-white text-sm font-bold w-6 text-center">
                            {fixture.awayScore ?? "-"}
                          </span>
                        </div>
                      </div>

                      {/* Status/Time */}
                      <div className="ml-4 text-right min-w-[50px]">
                        <div
                          className={`text-xs font-semibold ${getStatusColor(
                            fixture.status
                          )}`}
                          title={getStatusLabel(fixture.status)}
                        >
                          {fixture.status}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {fixture.time}
                        </div>
                      </div>
                    </div>
                  </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
