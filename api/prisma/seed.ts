const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const data = [] as any; // insert player data from mocks here player-data.json

  for (const teamData of data) {
    const { team, players } = teamData;

    for (const playerData of players) {
      await prisma.player.upsert({
        where: { id: playerData.id },
        update: {},
        create: {
          id: playerData.id,
          name: playerData.name,
          age: playerData.age,
          number:
            playerData.number !== null && playerData.number !== undefined
              ? playerData.number
              : 0,
          position: playerData.position,
          photo: playerData.photo,
          Team: { connect: { id: team.id } },
        },
      });
    }
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
