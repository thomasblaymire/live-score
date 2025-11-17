"use client";

import { useState } from "react";
import Image from "next/image";
import { Card } from "../ui/card";
import { apiClient } from "@/lib/api-client";

interface Standing {
  position: number;
  team: {
    id: number;
    name: string;
    logo?: string;
  };
  played: number;
  points: number;
}

interface LeagueStandingsProps {
  initialStandings: Standing[];
  initialLeagueId: number;
  initialLeagueName: string;
}

// List of leagues to cycle through
const LEAGUES = [
  { id: 39, name: "Premier League" },
  { id: 40, name: "Championship" },
  { id: 41, name: "League One" },
  { id: 42, name: "League Two" },
  { id: 140, name: "La Liga" },
  { id: 78, name: "Bundesliga" },
  { id: 135, name: "Serie A" },
  { id: 61, name: "Ligue 1" },
];

export function LeagueStandings({
  initialStandings,
  initialLeagueId,
  initialLeagueName,
}: LeagueStandingsProps) {
  const [standings, setStandings] = useState<Standing[]>(initialStandings);
  const [currentLeagueIndex, setCurrentLeagueIndex] = useState(
    LEAGUES.findIndex((l) => l.id === initialLeagueId) || 0
  );
  const [loading, setLoading] = useState(false);

  const currentLeague = LEAGUES[currentLeagueIndex];

  const fetchStandings = async (leagueId: number) => {
    setLoading(true);
    try {
      const leagueData = await apiClient.leagues.getById(leagueId.toString());
      setStandings(leagueData.league || []);
    } catch (error) {
      console.error("Failed to fetch standings:", error);
      setStandings([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevLeague = () => {
    const newIndex = currentLeagueIndex === 0 ? LEAGUES.length - 1 : currentLeagueIndex - 1;
    setCurrentLeagueIndex(newIndex);
    fetchStandings(LEAGUES[newIndex].id);
  };

  const handleNextLeague = () => {
    const newIndex = currentLeagueIndex === LEAGUES.length - 1 ? 0 : currentLeagueIndex + 1;
    setCurrentLeagueIndex(newIndex);
    fetchStandings(LEAGUES[newIndex].id);
  };

  return (
    <Card className="max-h-[50vh] overflow-hidden flex flex-col">
      {/* Header with navigation */}
      <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-surface sticky top-0 z-10">
        <button
          onClick={handlePrevLeague}
          className="p-1 hover:bg-gray-800 rounded transition-colors"
          aria-label="Previous league"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <h3 className="text-white text-sm font-semibold">
          {currentLeague.name} Standings
        </h3>

        <button
          onClick={handleNextLeague}
          className="p-1 hover:bg-gray-800 rounded transition-colors"
          aria-label="Next league"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Standings table */}
      <div className="flex-1 overflow-auto relative">
        {loading && (
          <div className="absolute inset-0 bg-surface/80 flex items-center justify-center z-10">
            <div className="text-white text-sm">Loading...</div>
          </div>
        )}

        {standings.length > 0 ? (
          <div className="p-4">
            <table className="w-full text-xs">
              <thead className="sticky top-0 bg-surface z-10">
                <tr className="text-gray-500">
                  <th className="text-left pb-2">Team</th>
                  <th className="text-center pb-2">P</th>
                  <th className="text-center pb-2">Pts</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((standing) => (
                  <tr
                    key={standing.position}
                    className="border-t border-gray-800"
                  >
                    <td className="py-2 text-white">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 relative flex-shrink-0">
                          {standing.team.logo && (
                            <Image
                              src={standing.team.logo}
                              alt={standing.team.name}
                              fill
                              className="object-contain"
                            />
                          )}
                        </div>
                        <span className="truncate">{standing.team.name}</span>
                      </div>
                    </td>
                    <td className="py-2 text-center text-gray-400">
                      {standing.played}
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
            {loading ? "Loading..." : "No standings available"}
          </div>
        )}
      </div>
    </Card>
  );
}
