"use client";

import { useRef, useEffect } from "react";

interface HorizontalDatePickerProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export function HorizontalDatePicker({
  selectedDate,
  onDateChange,
}: HorizontalDatePickerProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Generate dates (30 days before and after today)
  const generateDates = () => {
    const dates: Date[] = [];
    const start = new Date();
    start.setDate(start.getDate() - 30);

    for (let i = 0; i < 90; i++) {
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

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Scroll to selected date on mount
    const selectedElement = document.querySelector(
      '[data-is-selected="true"]'
    );
    if (selectedElement && scrollContainerRef.current) {
      selectedElement.scrollIntoView({ behavior: "auto", block: "nearest", inline: "center" });
    }
  }, []);

  return (
    <div className="bg-gray-800/50 border-b border-gray-700 max-w-full">
      {/* Month/Year Header */}
      <div className="px-4 py-2 flex items-center justify-between">
        <span className="text-white text-sm font-semibold">
          {formatMonth(selectedDate)}
        </span>
        <span className="text-gray-400 text-xs">
          {selectedDate.toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </span>
      </div>

      {/* Horizontal Date Scroll */}
      <div className="relative overflow-hidden w-full">
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-0 bottom-0 z-10 px-2 bg-gradient-to-r from-gray-800 to-transparent hover:from-gray-700"
          aria-label="Scroll left"
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

        {/* Scrollable Dates */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-scroll gap-2 px-10 py-3 scrollbar-hide w-full"
          style={{ scrollBehavior: "smooth" }}
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
                className={`
                  flex-shrink-0 w-16 px-2 py-2 rounded-lg transition-all
                  ${
                    isSelectedDate
                      ? "bg-primary text-white shadow-lg scale-105"
                      : isTodayDate
                      ? "bg-green-600/20 border border-green-600 text-green-400"
                      : "bg-gray-800/50 text-gray-400 hover:bg-gray-700 hover:text-white"
                  }
                `}
              >
                <div className="text-center">
                  <div className="text-xs font-medium">
                    {formatDayOfWeek(date)}
                  </div>
                  <div className="text-2xl font-bold mt-1">
                    {date.getDate()}
                  </div>
                  {isTodayDate && !isSelectedDate && (
                    <div className="text-xs mt-1 font-semibold">Today</div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-0 bottom-0 z-10 px-2 bg-gradient-to-l from-gray-800 to-transparent hover:from-gray-700"
          aria-label="Scroll right"
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

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
