"use client";

import Image from "next/image";
import { Card } from "../ui/card";

interface Competition {
  id: number;
  name: string;
  country: string;
  logo: string;
}

interface CompetitionsListProps {
  competitions: Competition[];
}

export function CompetitionsList({ competitions }: CompetitionsListProps) {
  return (
    <div className="divide-y divide-gray-800">
      {competitions.map((competition) => (
        <a
          key={competition.id}
          href={`/league/${competition.id}`}
          className="flex items-center gap-3 p-3 hover:bg-gray-800/30 transition-colors group"
        >
          <div className="w-7 h-7 relative flex-shrink-0">
            <Image
              src={competition.logo}
              alt={competition.name}
              fill
              className="object-contain"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate group-hover:text-gray-300 transition-colors">
              {competition.name}
            </p>
            <p className="text-gray-500 text-xs truncate">
              {competition.country}
            </p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-600 group-hover:text-gray-400 transition-colors"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      ))}
    </div>
  );
}
