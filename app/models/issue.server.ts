import type { User, Issue, Comic } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Issue } from "@prisma/client";

export function getIssuesForComic({
  userId,
  comicId,
}: {
  userId: User["id"];
  comicId: Comic["id"];
}) {
  return prisma.issue.findMany({
    where: { userId, comicId },
    orderBy: { issueNumber: "asc" },
  });
}

export function getIssue({ id }: { id: Issue["id"] }) {
  return prisma.issue.findUnique({
    where: { id },
  });
}

export async function createIssue(data: Omit<Issue, "id">) {
  return prisma.issue.create({ data });
}
