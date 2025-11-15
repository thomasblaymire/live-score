import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { apiClient } from "@/lib/api-client";
import { extractFixtureId } from "@/lib/slug-helpers";

interface FixturePageProps {
  params: Promise<{
    category: string;
    league: string;
    match: string;
  }>;
}

async function getFixture(fixtureId: string) {
  try {
    const fixture = await apiClient.fixtures.getById(fixtureId);
    return fixture;
  } catch (error) {
    console.error("Failed to fetch fixture:", error);
    return null;
  }
}

export default async function FixturePage({ params }: FixturePageProps) {
  const resolvedParams = await params;
  const fixtureId = extractFixtureId(resolvedParams.match);
  const fixture = await getFixture(fixtureId);

  if (!fixture) {
    notFound();
  }

  const status = fixture.fixture.status;
  const isLive = status.short === "1H" || status.short === "2H";
  const isHalfTime = status.short === "HT";
  const isFinished = status.short === "FT";
  const isNotStarted = status.short === "NS" || status.short === "TBD";

  const getStatusColor = () => {
    if (isLive) return "bg-green-500";
    if (isHalfTime) return "bg-yellow-500";
    if (isFinished) return "bg-gray-500";
    return "bg-gray-600";
  };

  const getStatusText = () => {
    if (status.short === "1H") return "First Half";
    if (status.short === "2H") return "Second Half";
    if (status.short === "HT") return "Half Time";
    if (status.short === "FT") return "Full Time";
    if (status.short === "NS") return "Not Started";
    if (status.short === "TBD") return "To Be Determined";
    return status.long;
  };

  const matchDate = new Date(fixture.fixture.date);
  const formattedDate = matchDate.toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = matchDate.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-8">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Matches
      </Link>

      {/* Match Header Card */}
      <div className="bg-surface border border-gray-800 rounded-[15px] overflow-hidden">
        {/* League Info */}
        <div className="bg-gray-800/50 px-6 py-3 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="relative w-6 h-6">
              <Image
                src={fixture.league.logo}
                alt={fixture.league.name}
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h2 className="text-white font-semibold text-sm">
                {fixture.league.name}
              </h2>
              <p className="text-gray-400 text-xs">{fixture.league.country}</p>
            </div>
          </div>
        </div>

        {/* Match Info */}
        <div className="p-8">
          {/* Status Badge */}
          <div className="flex justify-center mb-6">
            <span
              className={`${getStatusColor()} text-white px-4 py-1.5 rounded-full text-sm font-semibold`}
            >
              {getStatusText()}
              {status.elapsed && ` - ${status.elapsed}'`}
            </span>
          </div>

          {/* Teams and Score */}
          <div className="grid grid-cols-[1fr_auto_1fr] gap-8 items-center mb-8">
            {/* Home Team */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-24 h-24 md:w-32 md:h-32">
                <Image
                  src={fixture.teams.home.logo || "/placeholder-team.png"}
                  alt={fixture.teams.home.name}
                  fill
                  className="object-contain"
                />
              </div>
              <h1 className="text-white text-xl md:text-2xl font-bold text-center">
                {fixture.teams.home.name}
              </h1>
            </div>

            {/* Score */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-4">
                <span className="text-5xl md:text-6xl font-bold text-white">
                  {fixture.goals.home ?? "-"}
                </span>
                <span className="text-3xl md:text-4xl font-bold text-gray-600">
                  :
                </span>
                <span className="text-5xl md:text-6xl font-bold text-white">
                  {fixture.goals.away ?? "-"}
                </span>
              </div>
              {fixture.score && (
                <div className="text-sm text-gray-400">
                  HT: {fixture.score.halftime.home ?? "-"} -{" "}
                  {fixture.score.halftime.away ?? "-"}
                </div>
              )}
            </div>

            {/* Away Team */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-24 h-24 md:w-32 md:h-32">
                <Image
                  src={fixture.teams.away.logo || "/placeholder-team.png"}
                  alt={fixture.teams.away.name}
                  fill
                  className="object-contain"
                />
              </div>
              <h1 className="text-white text-xl md:text-2xl font-bold text-center">
                {fixture.teams.away.name}
              </h1>
            </div>
          </div>

          {/* Match Details */}
          <div className="border-t border-gray-800 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center md:text-left">
              <div>
                <p className="text-gray-500 text-sm mb-1">Date</p>
                <p className="text-white font-semibold">{formattedDate}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Kick-off Time</p>
                <p className="text-white font-semibold">{formattedTime}</p>
              </div>
              {fixture.venue && (
                <>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Venue</p>
                    <p className="text-white font-semibold">
                      {fixture.venue.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">City</p>
                    <p className="text-white font-semibold">
                      {fixture.venue.city}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info Placeholder */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface border border-gray-800 rounded-[15px] p-6">
          <h3 className="text-white font-semibold mb-4">Match Statistics</h3>
          <p className="text-gray-400 text-sm">Coming soon...</p>
        </div>
        <div className="bg-surface border border-gray-800 rounded-[15px] p-6">
          <h3 className="text-white font-semibold mb-4">Timeline</h3>
          <p className="text-gray-400 text-sm">Coming soon...</p>
        </div>
      </div>
    </div>
  );
}
