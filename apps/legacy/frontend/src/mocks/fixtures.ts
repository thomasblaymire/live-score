interface Fixture {
  fixture: {
    id: number
    referee: string
    timezone: string
    date: string
    timestamp: number
    periods: {
      first: number
      second: number
    }
    venue: {
      id: number
      name: string
      city: string
    }
    status: {
      long: string
      short: string
      elapsed: number
      extra: number | null
    }
  }
  league: {
    id: number
    name: string
    country: string
    logo: string
    flag: string
    season: number
    round: string
    standings: boolean
  }
  teams: {
    home: {
      id: number
      name: string
      logo: string
      winner: boolean | null
    }
    away: {
      id: number
      name: string
      logo: string
      winner: boolean | null
    }
  }
  goals: {
    home: number | null
    away: number | null
  }
  score: {
    halftime: {
      home: number | null
      away: number | null
    }
    fulltime: {
      home: number | null
      away: number | null
    }
    extratime: {
      home: number | null
      away: number | null
    }
    penalty: {
      home: number | null
      away: null
    }
  }
}

interface APIResponse {
  get: string
  parameters: {
    league: string
    from: string
    to: string
    season: string
  }
  errors: any[]
  results: number
  paging: {
    current: number
    total: number
  }
  response: Fixture[]
}

export const fixtureData: APIResponse = {
  get: "fixtures",
  parameters: {
    league: "39",
    from: "2025-02-23",
    to: "2025-02-23",
    season: "2024"
  },
  errors: [],
  results: 2,
  paging: {
    current: 1,
    total: 1
  },
  response: [
    {
      fixture: {
        id: 1208280,
        referee: "Anthony Taylor, England",
        timezone: "UTC",
        date: "2025-02-23T16:30:00+00:00",
        timestamp: 1740328200,
        periods: {
          first: 1740328200,
          second: 1740331800
        },
        venue: {
          id: 555,
          name: "Etihad Stadium",
          city: "Manchester"
        },
        status: {
          long: "Second Half",
          short: "2H",
          elapsed: 70,
          extra: null
        }
      },
      league: {
        id: 39,
        name: "Premier League",
        country: "England",
        logo: "https://media.api-sports.io/football/leagues/39.png",
        flag: "https://media.api-sports.io/flags/gb-eng.svg",
        season: 2024,
        round: "Regular Season - 26",
        standings: true
      },
      teams: {
        home: {
          id: 50,
          name: "Manchester City",
          logo: "https://media.api-sports.io/football/teams/50.png",
          winner: false
        },
        away: {
          id: 40,
          name: "Liverpool",
          logo: "https://media.api-sports.io/football/teams/40.png",
          winner: true
        }
      },
      goals: {
        home: 0,
        away: 2
      },
      score: {
        halftime: {
          home: 0,
          away: 2
        },
        fulltime: {
          home: null,
          away: null
        },
        extratime: {
          home: null,
          away: null
        },
        penalty: {
          home: null,
          away: null
        }
      }
    },
    {
      fixture: {
        id: 1208281,
        referee: "Jarred Gillett, Australia",
        timezone: "UTC",
        date: "2025-02-23T14:00:00+00:00",
        timestamp: 1740319200,
        periods: {
          first: 1740319200,
          second: 1740322800
        },
        venue: {
          id: 562,
          name: "St. James' Park",
          city: "Newcastle upon Tyne"
        },
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
          extra: 4
        }
      },
      league: {
        id: 39,
        name: "Premier League",
        country: "England",
        logo: "https://media.api-sports.io/football/leagues/39.png",
        flag: "https://media.api-sports.io/flags/gb-eng.svg",
        season: 2024,
        round: "Regular Season - 26",
        standings: true
      },
      teams: {
        home: {
          id: 34,
          name: "Newcastle",
          logo: "https://media.api-sports.io/football/teams/34.png",
          winner: true
        },
        away: {
          id: 65,
          name: "Nottingham Forest",
          logo: "https://media.api-sports.io/football/teams/65.png",
          winner: false
        }
      },
      goals: {
        home: 4,
        away: 3
      },
      score: {
        halftime: {
          home: 4,
          away: 1
        },
        fulltime: {
          home: 4,
          away: 3
        },
        extratime: {
          home: null,
          away: null
        },
        penalty: {
          home: null,
          away: null
        }
      }
    }
  ]
}