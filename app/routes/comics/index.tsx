import styles from "./index.module.css";
import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";

import { getComicsByTitle } from "~/models/comic.server";
import { requireUserId } from "~/session.server";
import React from "react";

export const handle = {
  nav: () => <Link to={`/comics/new`}>+ Add Comic</Link>,
};

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const comicItems = await getComicsByTitle({ userId });
  return json({ comicItems });
}

const ComicsIndex = () => {
  const { comicItems } = useLoaderData<typeof loader>();

  // Display an empty state if no comics are return.
  if (comicItems.length === 0)
    return (
      <div>
        <div>There are no comics yet.</div>
        <Link to="/comics/new">Add a Comic</Link>
      </div>
    );

  return (
    <div className="grid gap-6">
      {comicItems.map(({ id, title, volume, description, cover }) => (
        <Link
          to={`${id}`}
          key={id}
          className="flex gap-4 rounded-md p-3 hover:bg-slate-100"
          aria-label={title}
        >
          <div>
            {cover ? (
              <img
                aria-label={`${title} ${volume}`}
                src={cover}
                alt={`Cover of an issue of ${title} ${volume}`}
                className={styles.cover}
              />
            ) : (
              <span>Missing Cover</span>
            )}
          </div>
          <div>
            <div className="text-xl">{title}</div>
            <div className="text-sm text-slate-500" aria-label="volume">
              {volume}
            </div>
            <div aria-label="description" className="mt-3 max-w-lg text-xs">
              {description}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ComicsIndex;
