import type { User, Comic } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Comic } from "@prisma/client";

export function getComicsByTitle({ userId }: { userId: User["id"] }) {
  return prisma.comic.findMany({
    where: { userId },
    select: {
      id: true,
      title: true,
      volume: true,
      description: true,
      cover: true,
    },
    orderBy: { title: "asc" },
  });
}

export const getComic = ({ id }: { id: Comic["id"] }) => {
  console.log("REAL");
  return prisma.comic.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      volume: true,
      description: true,
      cover: true,
    },
  });
};

export async function createComic(data: Omit<Comic, "id">) {
  return prisma.comic.create({ data });
}
