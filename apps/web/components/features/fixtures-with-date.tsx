"use client";

import { useState } from "react";
import { ScoreBoard } from "./scoreboard";
import { HorizontalDatePicker } from "../ui/horizontal-date-picker";
import { apiClient } from "@/lib/api-client";
import { transformFixtures } from "@/lib/transform-fixtures";

interface FixturesWithDateProps {
  initialFixtures: any[];
}

export function FixturesWithDate({ initialFixtures }: FixturesWithDateProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [fixtures, setFixtures] = useState(initialFixtures);
  const [loading, setLoading] = useState(false);

  const fetchFixturesByDate = async (date: Date) => {
    setLoading(true);
    try {
      const dateStr = date.toISOString().split("T")[0]; // YYYY-MM-DD
      const today = new Date().toISOString().split("T")[0];

      console.log("Fetching fixtures for date:", dateStr, "isToday:", dateStr === today);

      // If selected date is today, get live + scheduled
      if (dateStr === today) {
        const fixturesData = await apiClient.fixtures.getAll();
        const liveFixtures = fixturesData.liveScores?.response || [];
        const todayFixtures = fixturesData.fixturesByDate?.response || [];
        const allFixtures = [...liveFixtures, ...todayFixtures].slice(0, 30);
        console.log("Today's fixtures count:", allFixtures.length);
        setFixtures(transformFixtures(allFixtures));
      } else {
        // For other dates, fetch by date range
        const response = await apiClient.fixtures.getByDateRange(dateStr, dateStr);
        console.log("Date range fixtures response:", response, "count:", response?.length);

        // Response is already an array
        if (Array.isArray(response)) {
          const limitedFixtures = response.slice(0, 30);
          console.log("Transformed fixtures count:", limitedFixtures.length);
          setFixtures(transformFixtures(limitedFixtures));
        } else {
          console.error("Unexpected response format:", response);
          setFixtures([]);
        }
      }
    } catch (error) {
      console.error("Failed to fetch fixtures for date:", error);
      setFixtures([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    fetchFixturesByDate(date);
  };

  return (
    <div className="relative overflow-hidden">
      {loading && (
        <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-10 rounded-[15px]">
          <div className="text-white">Loading fixtures...</div>
        </div>
      )}

      <div className="bg-surface border border-gray-800 rounded-[15px] overflow-hidden">
        {/* Horizontal Date Picker at Top */}
        <HorizontalDatePicker
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />

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

        {/* Fixtures */}
        {fixtures.length > 0 ? (
          <ScoreBoard fixtures={fixtures} showHeader={false} />
        ) : (
          <div className="p-8 text-center text-gray-500">
            {loading ? "Loading..." : "No matches scheduled for this date"}
          </div>
        )}
      </div>
    </div>
  );
}
