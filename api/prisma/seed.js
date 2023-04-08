const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "XXXX",
    "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
  },
};

async function main() {
  const response = await fetch(
    "https://run.mocky.io/v3/33c07e38-b14e-4a06-b47a-d88225b73207"
  );
  const data = await response.json();

  for (const fixtureData of data.response) {
    const { fixture, periods, venue, status, league, teams, goals, score } =
      fixtureData;

    const { home: homeTeamData, away: awayTeamData } = teams;

    console.log("debug fixtureId", fixture.id);

    const newFixture = await prisma.fixture.create({
      data: {
        apiId: fixture.id,
        referee: fixture.referee,
        timezone: fixture.timezone,
        date: new Date(fixture.date),
        timestamp: fixture.timestamp,
        venue: {
          connectOrCreate: {
            create: {
              id: fixture.venue.id,
              name: fixture.venue.name,
              city: fixture.venue.city,
            },
            where: { id: fixture.venue.id },
          },
        },
        status: {
          create: {
            long: fixture.status.long,
            short: fixture.status.short,
            elapsed: fixture.status.elapsed,
          },
        },
        league: {
          connectOrCreate: {
            create: {
              id: league.id,
              name: league.name,
              country: league.country,
              logo: league.logo,
              flag: league.flag,
              season: league.season,
              round: league.round,
            },
            where: { id: league.id },
          },
        },
        homeTeam: {
          connectOrCreate: {
            create: {
              id: homeTeamData.id,
              name: homeTeamData.name,
              logo: homeTeamData.logo,
              winner: homeTeamData.winner,
            },
            where: { id: homeTeamData.id },
          },
        },
        awayTeam: {
          connectOrCreate: {
            create: {
              id: awayTeamData.id,
              name: awayTeamData.name,
              logo: awayTeamData.logo,
              winner: awayTeamData.winner,
            },
            where: { id: awayTeamData.id },
          },
        },
        goals: {
          create: {
            home: goals.home,
            away: goals.away,
          },
        },
        score: {
          create: {
            halftimeHome: score.halftime.home,
            halftimeAway: score.halftime.away,
            fulltimeHome: score.fulltime.home,
            fulltimeAway: score.fulltime.away,
            extratimeHome: score.extratime.home,
            extratimeAway: score.extratime.away,
            penaltyHome: score.penalty.home,
            penaltyAway: score.penalty.away,
          },
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
