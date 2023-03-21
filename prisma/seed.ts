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

  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  const comicSpawn = await prisma.comic.create({
    data: {
      title: "Spawn",
      volume: "1992",
      description: "The first issue of Spawn",
      cover:
        "https://books.google.ca/books/publisher/content?id=Ew13BgAAQBAJ&pg=PP1&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U3XVNhJMbV2GhdXuWn5tfgWkWhUAQ&w=1280",
      userId: user.id,
    },
  });

  await prisma.issue.create({
    data: {
      comicId: comicSpawn.id,
      issueNumber: "1",
      description: "The first issue of Spawn",
      cover:
        "https://books.google.ca/books/publisher/content?id=Ew13BgAAQBAJ&pg=PP1&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U3XVNhJMbV2GhdXuWn5tfgWkWhUAQ&w=1280",
      userId: user.id,
    },
  });

  await prisma.issue.create({
    data: {
      comicId: comicSpawn.id,
      issueNumber: "2",
      description: "The second issue of Spawn",
      cover:
        "https://books.google.ca/books/publisher/content?id=yQx3BgAAQBAJ&pg=PP1&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U0eXDpQBqUtzA07w4AV7xMxd4_qsA&w=1280",
      userId: user.id,
    },
  });

  const comicSpiderMan = await prisma.comic.create({
    data: {
      title: "Spider-Man",
      volume: "1990",
      description: "The first issue of Spider-Man by Todd McFarlane",
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
