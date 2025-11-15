/**
 * Helper functions for generating URL slugs from fixture data
 */

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

interface FixtureSlugData {
  id: number;
  league: string;
  leagueCountry: string;
  homeTeam: string;
  awayTeam: string;
}

/**
 * Generate fixture URL path
 * Example: /football/world-cup-qualification/world-cup-qualifiers-uefa/slovenia-vs-kosovo-12345
 */
export function generateFixtureUrl(fixture: FixtureSlugData): string {
  const sport = "football";
  const competitionCategory = slugify(fixture.leagueCountry);
  const league = slugify(fixture.league);
  const match = `${slugify(fixture.homeTeam)}-vs-${slugify(fixture.awayTeam)}-${fixture.id}`;

  return `/${sport}/${competitionCategory}/${league}/${match}`;
}

/**
 * Parse fixture URL parameters and extract fixture ID
 */
export function parseFixtureUrl(params: {
  category: string;
  league: string;
  match: string;
}) {
  // Match pattern: "team1-vs-team2-12345"
  // Extract ID from the end
  const parts = params.match.split("-");
  const fixtureId = parts[parts.length - 1];

  // Find "-vs-" and split around it
  const vsIndex = params.match.indexOf("-vs-");
  const homeTeam = vsIndex !== -1 ? params.match.substring(0, vsIndex) : "";
  const afterVs = vsIndex !== -1 ? params.match.substring(vsIndex + 4) : "";
  // Remove the ID from the away team
  const awayTeam = afterVs.replace(`-${fixtureId}`, "");

  return {
    category: params.category,
    league: params.league,
    homeTeam,
    awayTeam,
    fixtureId,
  };
}

/**
 * Extract fixture ID from match slug
 * Example: "slovenia-vs-kosovo-12345" -> "12345"
 */
export function extractFixtureId(matchSlug: string): string {
  const parts = matchSlug.split("-");
  return parts[parts.length - 1] || "";
}
