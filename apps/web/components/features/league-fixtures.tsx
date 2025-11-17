"use client";

import { useState, useEffect } from "react";
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
  date?: string;
  venue?: string;
  referee?: string;
  round?: string;
  halftimeScore?: {
    home: number | null;
    away: number | null;
  };
}

interface LeagueFixturesProps {
  fixtures: Fixture[];
}

export function LeagueFixtures({ fixtures }: LeagueFixturesProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Helper functions
  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const isToday = (date: Date) => isSameDay(date, new Date());

  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const formatDate = (date: Date) => {
    if (isToday(date)) return "Today";

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (isSameDay(date, tomorrow)) return "Tomorrow";

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (isSameDay(date, yesterday)) return "Yesterday";

    return date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short"
    });
  };

  // Filter fixtures by selected date
  const fixturesForDate = fixtures.filter((fixture) => {
    if (fixture.date) {
      const fixtureDate = new Date(fixture.date);
      return isSameDay(fixtureDate, selectedDate);
    }
    return false;
  });

  // Auto-jump to next date with fixtures on initial load only
  useEffect(() => {
    const today = new Date();
    const todayFixtures = fixtures.filter((fixture) => {
      if (!fixture.date) return false;
      const fixtureDate = new Date(fixture.date);
      return isSameDay(fixtureDate, today);
    });

    // Only auto-jump if today has no fixtures (on initial load)
    if (todayFixtures.length === 0 && fixtures.length > 0) {
      const upcomingFixtures = fixtures
        .filter((fixture) => {
          if (!fixture.date) return false;
          const fixtureDate = new Date(fixture.date);
          return fixtureDate >= today;
        })
        .sort((a, b) => {
          const dateA = new Date(a.date!).getTime();
          const dateB = new Date(b.date!).getTime();
          return dateA - dateB;
        });

      if (upcomingFixtures.length > 0 && upcomingFixtures[0].date) {
        const nextDate = new Date(upcomingFixtures[0].date);
        setSelectedDate(nextDate);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  const isLive = (status: string) =>
    status === "1H" || status === "2H" || status === "HT";

  return (
    <div className="space-y-4">
      {/* Date Navigation */}
      <div className="flex items-center justify-between gap-4 p-3 bg-gray-800/30 rounded-lg border border-gray-800/50">
        <button
          onClick={() => changeDate(-1)}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Previous day"
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

        <div className="flex flex-col items-center flex-1">
          <span className="text-white font-semibold text-sm">
            {formatDate(selectedDate)}
          </span>
          <span className="text-gray-500 text-xs">
            {selectedDate.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric"
            })}
          </span>
        </div>

        <button
          onClick={() => changeDate(1)}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Next day"
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

      {/* Fixtures List */}
      {fixturesForDate.length > 0 ? (
        <div className="space-y-2">
          {fixturesForDate.map((fixture) => (
            <Link
              key={fixture.id}
              href={generateFixtureUrl(fixture)}
              className="block"
            >
              <div className="bg-gray-800/30 hover:bg-gray-800/50 rounded-lg p-4 transition-colors border border-gray-800/50 hover:border-gray-700">
                {/* Match Info */}
                <div className="flex items-center justify-between gap-4">
                  {/* Home Team */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-8 h-8 relative flex-shrink-0">
                      <Image
                        src={fixture.homeTeamLogo}
                        alt={fixture.homeTeam}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-white font-medium text-sm truncate">
                      {fixture.homeTeam}
                    </span>
                  </div>

                  {/* Score or Time */}
                  <div className="flex-shrink-0 text-center min-w-[60px]">
                    {fixture.status === "NS" || fixture.status === "TBD" ? (
                      <span className="text-gray-400 text-sm">
                        {fixture.time}
                      </span>
                    ) : (
                      <div className="flex items-center justify-center gap-1">
                        <span
                          className={`text-lg font-bold ${
                            fixture.homeScore !== null &&
                            fixture.awayScore !== null &&
                            fixture.homeScore > fixture.awayScore
                              ? "text-white"
                              : "text-gray-400"
                          }`}
                        >
                          {fixture.homeScore ?? "-"}
                        </span>
                        <span className="text-gray-500">-</span>
                        <span
                          className={`text-lg font-bold ${
                            fixture.homeScore !== null &&
                            fixture.awayScore !== null &&
                            fixture.awayScore > fixture.homeScore
                              ? "text-white"
                              : "text-gray-400"
                          }`}
                        >
                          {fixture.awayScore ?? "-"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Away Team */}
                  <div className="flex items-center gap-3 flex-1 min-w-0 justify-end">
                    <span className="text-white font-medium text-sm truncate text-right">
                      {fixture.awayTeam}
                    </span>
                    <div className="w-8 h-8 relative flex-shrink-0">
                      <Image
                        src={fixture.awayTeamLogo}
                        alt={fixture.awayTeam}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Match Info Row */}
                <div className="mt-3 flex items-center justify-between text-xs">
                  {/* Left: Status or HT Score */}
                  <div className="flex items-center gap-2">
                    {isLive(fixture.status) && (
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-green-500 font-medium">
                          {fixture.status}
                        </span>
                      </span>
                    )}
                    {fixture.status === "FT" && fixture.halftimeScore && (
                      <span className="text-gray-500">
                        HT: {fixture.halftimeScore.home}-{fixture.halftimeScore.away}
                      </span>
                    )}
                    {fixture.status === "NS" && fixture.venue && (
                      <span className="text-gray-400 flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {fixture.venue}
                      </span>
                    )}
                  </div>

                  {/* Right: Referee or Full Time */}
                  <div>
                    {fixture.status === "FT" && (
                      <span className="text-gray-500">Full Time</span>
                    )}
                    {(fixture.status === "NS" || fixture.status === "TBD") && fixture.referee && (
                      <span className="text-gray-400">
                        {fixture.referee.includes(',') ? `Ref: ${fixture.referee.split(',')[0]}` : `Ref: ${fixture.referee}`}
                      </span>
                    )}
                    {isLive(fixture.status) && (
                      <span className="text-gray-400">Live</span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg mb-2">No fixtures found</p>
          <p className="text-sm">
            There are no fixtures available for this league
          </p>
        </div>
      )}
    </div>
  );
}
