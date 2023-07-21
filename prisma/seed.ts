import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  const comicSpawn = await prisma.comic.create({
    data: {
      title: "Spawn",
      volume: "1992",
      description:
        "Spawn is a superhero/antihero appearing in a monthly comic book of the same name published by American company Image Comics.",
      cover:
        "https://cdn.imagecomics.com/assets/i/releases/10128/spawn-1_30e862e6c4.jpg",
      userId: user.id,
    },
  });

  await prisma.issue.create({
    data: {
      comicId: comicSpawn.id,
      issueNumber: "1",
      description:
        "While a strange assailant stalks the city, ripping out human hearts, another otherwordly being arrives. As his mind reels, our tortured hero remembers that he struck a deal with the devil in order to return to his beloved wife - five years after his death.",
      cover:
        "https://cdn.imagecomics.com/assets/i/releases/10128/spawn-1_30e862e6c4.jpg",
      userId: user.id,
    },
  });

  await prisma.issue.create({
    data: {
      comicId: comicSpawn.id,
      issueNumber: "2",
      description:
        "Spawn decides to find Wanda, but fears her reaction to what he's become. With his new powers, he attempts to change his ravaged features, with disappointing results. Exhausted, he collapses, only to be taunted by a foul-mouthed dwarf in clown makeup.",
      cover:
        "https://cdn.imagecomics.com/assets/i/releases/10126/spawn-2_104a2b0042.jpg",
      userId: user.id,
    },
  });

  await prisma.issue.create({
    data: {
      comicId: comicSpawn.id,
      issueNumber: "3",
      description:
        "Watching from the shadows, Spawn is shocked to find that Wanda has married and had a daughter with his best friend, Terry Fitzgerald. His anguish becomes physical when the ugly clown reappears, transforms into the Violator, and rips out Spawn's heart!",
      cover:
        "https://cdn.imagecomics.com/assets/i/releases/10125/spawn-3_5f2d15023a.jpg",
      userId: user.id,
    },
  });

  const comicSpiderMan = await prisma.comic.create({
    data: {
      title: "Spider-Man",
      volume: "1990",
      description:
        "A monthly comic book series launched by Marvel Comics in August 1990 as a showcase for Todd McFarlane, who wrote and illustrated issues 1-14 and 16.",
      cover:
        "https://img.gocollect.com/eyJidWNrZXQiOiJnb2NvbGxlY3QuaW1hZ2VzLnB1YiIsImtleSI6ImJiM2IwNmJlLWY4ZGUtNDY1Yi05YjlmLTUxOGI2YjQwODk0MS5qcGciLCJlZGl0cyI6W119",
      userId: user.id,
    },
  });

  await prisma.issue.create({
    data: {
      comicId: comicSpiderMan.id,
      issueNumber: "1",
      description: "The first issue of Spider-Man by Todd McFarlane",
      cover:
        "https://img.gocollect.com/eyJidWNrZXQiOiJnb2NvbGxlY3QuaW1hZ2VzLnB1YiIsImtleSI6ImJiM2IwNmJlLWY4ZGUtNDY1Yi05YjlmLTUxOGI2YjQwODk0MS5qcGciLCJlZGl0cyI6W119",
      userId: user.id,
    },
  });

  const comicDetectiveComics = await prisma.comic.create({
    data: {
      title: "Detective Comics",
      volume: "1937",
      description:
        "Detective Comics is a comic book series published by DC Comics. The first volume, published from 1937 to 2011 (and later continued in 2016), is best known for introducing the superhero Batman.",
      cover:
        "https://static.wikia.nocookie.net/marvel_dc/images/a/a8/Detective_Comics_27.jpg",
      userId: user.id,
    },
  });

  await prisma.issue.create({
    data: {
      comicId: comicDetectiveComics.id,
      issueNumber: "27",
      description:
        "Detective Comics #27 (March 1939 with a printed date of May 1939) marked the first appearance of Batman. This superhero would eventually become the star of the title.",
      cover:
        "https://static.wikia.nocookie.net/marvel_dc/images/a/a8/Detective_Comics_27.jpg",
      userId: user.id,
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
