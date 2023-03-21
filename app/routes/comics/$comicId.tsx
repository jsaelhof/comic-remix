import { Outlet } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { requireUserId } from "~/session.server";
import { getComic } from "~/models/comic.server";
import invariant from "tiny-invariant";
import { getIssuesForComic } from "~/models/issue.server";

export async function loader({ request, params }: LoaderArgs) {
  const userId = await requireUserId(request);

  invariant(params.comicId);

  const comic = await getComic({ id: params.comicId });
  const issues = await getIssuesForComic({ userId, comicId: params.comicId });

  return json({ comic, issues });
}

const ComicDetail = () => {
  return <Outlet />;
};

export default ComicDetail;
