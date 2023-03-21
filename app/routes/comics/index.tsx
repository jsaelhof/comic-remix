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

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "fit-content(200px) fit-content(40px) 1fr auto",
        columnGap: 24,
        rowGap: 8,
      }}
    >
      {comicItems.map(({ id, title, volume, description, cover }) => (
        <React.Fragment key={id}>
          <Link to={`${id}`}>{title}</Link>
          <div>{volume}</div>
          <div>{description}</div>
          <div>
            {cover && (
              <img
                width="75px"
                height="75px"
                src={cover}
                alt={`Cover of an issue of ${title} ${volume}`}
              />
            )}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default ComicsIndex;
