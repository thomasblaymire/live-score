"use client";

import { useState } from "react";

interface Fixture {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  status: string;
  time: string;
  league: string;
}

interface ScoreBoardProps {
  fixtures: Fixture[];
}

const tabs = [
  { title: "All", value: "all" },
  { title: "Live", value: "live" },
  { title: "Finished", value: "finished" },
  { title: "Upcoming", value: "upcoming" },
];

export function ScoreBoard({ fixtures }: ScoreBoardProps) {
  const [activeTab, setActiveTab] = useState("all");

  const filteredFixtures = fixtures.filter((fixture) => {
    if (activeTab === "all") return true;
    if (activeTab === "live") return fixture.status === "LIVE";
    if (activeTab === "finished") return fixture.status === "FT";
    if (activeTab === "upcoming") return fixture.status === "NS";
    return true;
  });

  const getStatusColor = (status: string) => {
    if (status === "LIVE") return "text-green-500";
    if (status === "FT") return "text-gray-500";
    if (status === "HT") return "text-yellow-500";
    return "text-gray-400";
  };

  return (
    <div className="bg-surface border border-gray-800 rounded-[15px]">
      {/* Tabs Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
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

      {/* Fixtures List */}
      <div className="divide-y divide-gray-800">
        {filteredFixtures.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No matches found for this filter
          </div>
        ) : (
          filteredFixtures.map((fixture) => (
            <div
              key={fixture.id}
              className="p-4 hover:bg-gray-800/30 transition-colors cursor-pointer"
            >
              {/* League */}
              <div className="text-xs text-gray-500 mb-2">{fixture.league}</div>

              {/* Match Details */}
              <div className="flex items-center justify-between">
                {/* Teams */}
                <div className="flex-1 space-y-2">
                  {/* Home Team */}
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm font-medium">
                      {fixture.homeTeam}
                    </span>
                    <span className="text-white text-sm font-bold ml-4">
                      {fixture.homeScore ?? "-"}
                    </span>
                  </div>
                  {/* Away Team */}
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm font-medium">
                      {fixture.awayTeam}
                    </span>
                    <span className="text-white text-sm font-bold ml-4">
                      {fixture.awayScore ?? "-"}
                    </span>
                  </div>
                </div>

                {/* Status/Time */}
                <div className="ml-6 text-right">
                  <div
                    className={`text-xs font-semibold ${getStatusColor(
                      fixture.status
                    )}`}
                  >
                    {fixture.status}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {fixture.time}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
