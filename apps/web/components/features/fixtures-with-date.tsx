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

      // If selected date is today, get live + scheduled
      if (dateStr === today) {
        const fixturesData = await apiClient.fixtures.getAll();
        const liveFixtures = fixturesData.liveScores?.response || [];
        const todayFixtures = fixturesData.fixturesByDate?.response || [];
        const allFixtures = [...liveFixtures, ...todayFixtures].slice(0, 30);
        setFixtures(transformFixtures(allFixtures));
      } else {
        // For other dates, fetch by date range
        const response = await apiClient.fixtures.getByDateRange(dateStr, dateStr);
        setFixtures(transformFixtures(response.slice(0, 30)));
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
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-10 rounded-[15px]">
          <div className="text-white">Loading fixtures...</div>
        </div>
      )}

      <div className="bg-surface border border-gray-800 rounded-[15px]">
        {/* Horizontal Date Picker at Top */}
        <HorizontalDatePicker
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />

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
