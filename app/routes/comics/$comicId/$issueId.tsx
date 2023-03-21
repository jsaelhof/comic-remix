import styles from "./$issueId.module.css";

import { Link, useLoaderData } from "@remix-run/react";
import type { RouteMatch } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { requireUserId } from "~/session.server";
import invariant from "tiny-invariant";
import { getIssue } from "~/models/issue.server";
import { getComic } from "~/models/comic.server";

export const handle = {
  nav: (matches: RouteMatch[]) => {
    const { comic } = matches.find(
      ({ id }) => id === "routes/comics/$comicId"
    )?.data;
    return (
      <Link
        to={`/comics/${comic.id}`}
      >{`${comic.title} (${comic.volume})`}</Link>
    );
  },
};

export async function loader({ request, params }: LoaderArgs) {
  const userId = await requireUserId(request);

  invariant(params.issueId);
  invariant(params.comicId);

  const comic = await getComic({ id: params.comicId });
  const issue = await getIssue({ id: params.issueId });

  return json({ comic, issue });
}

const IssueDetail = () => {
  const { issue } = useLoaderData<typeof loader>();

  const { cover, issueNumber, description } = issue || {};

  return (
    <div>
      <div className={styles.issueCover}>
        {cover && <img src={cover} alt="" />}
      </div>
      <div>{issueNumber}</div>
      <div>{description}</div>
    </div>
  );
};

export default IssueDetail;
