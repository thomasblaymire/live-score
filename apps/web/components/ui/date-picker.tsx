"use client";

import { useEffect, useRef, useState } from "react";

interface DatePickerProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export function DatePicker({ selectedDate, onDateChange }: DatePickerProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Generate dates for display (60 days before and after current month)
  const generateDates = () => {
    const dates: Date[] = [];
    const start = new Date(currentMonth);
    start.setDate(1);
    start.setDate(start.getDate() - 30); // Start 30 days before

    for (let i = 0; i < 120; i++) {
      const date = new Date(start);
      date.setDate(date.getDate() + i);
      dates.push(date);
    }

    return dates;
  };

  const dates = generateDates();

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date: Date) => {
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const formatDayOfWeek = (date: Date) => {
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  const scrollToToday = () => {
    const today = new Date();
    onDateChange(today);
    setCurrentMonth(today);

    // Scroll to today's date
    setTimeout(() => {
      const todayElement = document.querySelector('[data-is-today="true"]');
      if (todayElement && scrollContainerRef.current) {
        todayElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth);
    if (direction === "prev") {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  useEffect(() => {
    // Scroll to selected date on mount
    const selectedElement = document.querySelector('[data-is-selected="true"]');
    if (selectedElement && scrollContainerRef.current) {
      selectedElement.scrollIntoView({ behavior: "auto", block: "center" });
    }
  }, []);

  return (
    <div className="bg-surface border border-gray-800 rounded-[15px] overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-semibold text-sm">Choose date</h3>
          <button
            onClick={scrollToToday}
            className="text-xs text-primary hover:text-blue-400 transition-colors"
          >
            Skip to today
          </button>
        </div>
        <div className="text-gray-400 text-xs">
          Selected: {selectedDate.toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
          })}
        </div>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800/50 border-b border-gray-700">
        <button
          onClick={() => navigateMonth("prev")}
          className="p-1 hover:bg-gray-700 rounded transition-colors"
          aria-label="Previous month"
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

        <span className="text-white text-sm font-semibold">
          {currentMonth.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric"
          })}
        </span>

        <button
          onClick={() => navigateMonth("next")}
          className="p-1 hover:bg-gray-700 rounded transition-colors"
          aria-label="Next month"
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

      {/* Scrollable Date List */}
      <div
        ref={scrollContainerRef}
        className="overflow-y-auto max-h-[400px] divide-y divide-gray-800"
      >
        {dates.map((date, index) => {
          const isTodayDate = isToday(date);
          const isSelectedDate = isSelected(date);

          return (
            <button
              key={index}
              onClick={() => onDateChange(date)}
              data-is-today={isTodayDate}
              data-is-selected={isSelectedDate}
              className={`w-full px-4 py-3 flex items-center justify-between hover:bg-gray-800/30 transition-colors ${
                isSelectedDate ? "bg-primary/20 border-l-4 border-primary" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="text-left">
                  <div className="text-gray-400 text-xs">
                    {formatDayOfWeek(date)}
                  </div>
                  <div className={`text-lg font-bold ${
                    isSelectedDate ? "text-primary" : "text-white"
                  }`}>
                    {date.getDate()}
                  </div>
                </div>
                {isTodayDate && (
                  <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                    Today
                  </span>
                )}
              </div>
              {isSelectedDate && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-primary"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 11.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
