"use client";

import { Card } from "../ui/card";
import Image from "next/image";

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
    <div className="space-y-2 p-4">
      {competitions.map((competition) => (
        <a
          key={competition.id}
          href={`/league/${competition.id}`}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors group"
        >
          <div className="w-8 h-8 relative flex-shrink-0">
            <Image
              src={competition.logo}
              alt={competition.name}
              fill
              className="object-contain"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate group-hover:text-primary transition-colors">
              {competition.name}
            </p>
            <p className="text-gray-500 text-xs truncate">{competition.country}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
