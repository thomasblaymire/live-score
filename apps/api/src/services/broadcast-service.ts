/**
 * Broadcast Service
 * Abstracts the source of broadcast data (database, API, static file)
 * Making it easy to swap implementation in the future
 */

import { prisma } from "../helpers";

// Types
export interface Broadcaster {
  name: string;
  channels: string[];
  type: "tv" | "streaming" | "both";
  requiresSubscription: boolean;
  logo?: string;
  url?: string;
}

export interface BroadcastInfo {
  leagueId: number;
  country: string;
  broadcasters: Broadcaster[];
}

/**
 * Type for broadcast data source functions
 */
export interface BroadcastDataSource {
  getBroadcastInfo: (leagueId: number, country?: string) => Promise<BroadcastInfo | null>;
  getAllBroadcasts: () => Promise<BroadcastInfo[]>;
}

/**
 * Static broadcast data for UK
 */
const UK_BROADCAST_DATA: Record<number, BroadcastInfo> = {
  39: {
    // Premier League
    leagueId: 39,
    country: "UK",
    broadcasters: [
      {
        name: "Sky Sports",
        channels: ["Sky Sports Premier League", "Sky Sports Main Event"],
        type: "both",
        requiresSubscription: true,
        url: "https://www.skysports.com",
      },
      {
        name: "TNT Sports",
        channels: ["TNT Sports 1", "TNT Sports 2"],
        type: "both",
        requiresSubscription: true,
        url: "https://www.tntsports.co.uk",
      },
      {
        name: "Amazon Prime Video",
        channels: ["Amazon Prime"],
        type: "streaming",
        requiresSubscription: true,
        url: "https://www.amazon.co.uk/primevideo",
      },
    ],
  },
  40: {
    // Championship
    leagueId: 40,
    country: "UK",
    broadcasters: [
      {
        name: "Sky Sports",
        channels: ["Sky Sports Football", "Sky Sports+"],
        type: "both",
        requiresSubscription: true,
      },
    ],
  },
  2: {
    // Champions League
    leagueId: 2,
    country: "UK",
    broadcasters: [
      {
        name: "TNT Sports",
        channels: ["TNT Sports 1", "TNT Sports 2", "TNT Sports 3"],
        type: "both",
        requiresSubscription: true,
      },
      {
        name: "Amazon Prime Video",
        channels: ["Amazon Prime"],
        type: "streaming",
        requiresSubscription: true,
      },
    ],
  },
  140: {
    // La Liga
    leagueId: 140,
    country: "UK",
    broadcasters: [
      {
        name: "Premier Sports",
        channels: ["Premier Sports 1", "Premier Sports 2"],
        type: "both",
        requiresSubscription: true,
      },
      {
        name: "ITV",
        channels: ["ITV4"],
        type: "tv",
        requiresSubscription: false,
      },
    ],
  },
  78: {
    // Bundesliga
    leagueId: 78,
    country: "UK",
    broadcasters: [
      {
        name: "Sky Sports",
        channels: ["Sky Sports Football"],
        type: "both",
        requiresSubscription: true,
      },
    ],
  },
  135: {
    // Serie A
    leagueId: 135,
    country: "UK",
    broadcasters: [
      {
        name: "TNT Sports",
        channels: ["TNT Sports"],
        type: "both",
        requiresSubscription: true,
      },
      {
        name: "Premier Sports",
        channels: ["Premier Sports"],
        type: "both",
        requiresSubscription: true,
      },
    ],
  },
  61: {
    // Ligue 1
    leagueId: 61,
    country: "UK",
    broadcasters: [
      {
        name: "beIN SPORTS",
        channels: ["beIN Sports"],
        type: "both",
        requiresSubscription: true,
      },
    ],
  },
  3: {
    // Europa League
    leagueId: 3,
    country: "UK",
    broadcasters: [
      {
        name: "TNT Sports",
        channels: ["TNT Sports"],
        type: "both",
        requiresSubscription: true,
      },
    ],
  },
};

/**
 * Database-based broadcast data source
 */
export const databaseBroadcastSource: BroadcastDataSource = {
  async getBroadcastInfo(leagueId: number, country: string = "UK"): Promise<BroadcastInfo | null> {
    try {
      const broadcast = await prisma.leagueBroadcast.findFirst({
        where: {
          leagueId,
          country,
        },
        include: {
          broadcasters: true,
        },
      });

      if (!broadcast) {
        return null;
      }

      return {
        leagueId: broadcast.leagueId,
        country: broadcast.country,
        broadcasters: broadcast.broadcasters.map((b) => ({
          name: b.name,
          channels: b.channels,
          type: b.type as "tv" | "streaming" | "both",
          requiresSubscription: b.requiresSubscription,
          logo: b.logo || undefined,
          url: b.url || undefined,
        })),
      };
    } catch (error) {
      console.error("Error fetching broadcast info from database:", error);
      return null;
    }
  },

  async getAllBroadcasts(): Promise<BroadcastInfo[]> {
    try {
      const broadcasts = await prisma.leagueBroadcast.findMany({
        include: {
          broadcasters: true,
        },
      });

      return broadcasts.map((broadcast) => ({
        leagueId: broadcast.leagueId,
        country: broadcast.country,
        broadcasters: broadcast.broadcasters.map((b) => ({
          name: b.name,
          channels: b.channels,
          type: b.type as "tv" | "streaming" | "both",
          requiresSubscription: b.requiresSubscription,
          logo: b.logo || undefined,
          url: b.url || undefined,
        })),
      }));
    } catch (error) {
      console.error("Error fetching all broadcasts from database:", error);
      return [];
    }
  },
};

/**
 * Static file-based broadcast data source
 */
export const staticBroadcastSource: BroadcastDataSource = {
  async getBroadcastInfo(leagueId: number, country: string = "UK"): Promise<BroadcastInfo | null> {
    return UK_BROADCAST_DATA[leagueId] || null;
  },

  async getAllBroadcasts(): Promise<BroadcastInfo[]> {
    return Object.values(UK_BROADCAST_DATA);
  },
};

/**
 * Active data source - change this constant to switch sources
 * No mutable state, just a single source of truth
 */
const activeDataSource: BroadcastDataSource = staticBroadcastSource;
// To switch: const activeDataSource: BroadcastDataSource = databaseBroadcastSource;

/**
 * Get broadcast information for a specific league
 */
export async function getBroadcastInfo(
  leagueId: number,
  country: string = "UK"
): Promise<BroadcastInfo | null> {
  return activeDataSource.getBroadcastInfo(leagueId, country);
}

/**
 * Get all broadcast information
 */
export async function getAllBroadcasts(): Promise<BroadcastInfo[]> {
  return activeDataSource.getAllBroadcasts();
}
