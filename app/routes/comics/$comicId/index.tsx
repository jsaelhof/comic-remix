import { Link } from "@remix-run/react";
import type { RouteMatch } from "@remix-run/react";
import styles from "./index.module.css";
import React from "react";
import type { Issue } from "~/models/issue.server";
import type { Comic } from "~/models/comic.server";
import { useMatchesData } from "~/utils";

export const handle = {
  nav: (matches: RouteMatch[]) => {
    const { comic } = matches.find(
      ({ id }) => id === "routes/comics/$comicId"
    )?.data;
    return (
      <>
        <Link to={`/comics`}>All Comics</Link>
        <Link to={`/comics/${comic.id}/new`}>+ Issue</Link>
      </>
    );
  },
};

const ComicIndex = () => {
  const { comic, issues } = useMatchesData("routes/comics/$comicId") as {
    comic: Comic;
    issues: Issue[];
  };

  const { description, title, cover } = comic || {};

  return (
    <div className={styles.layout}>
      <div className={styles.comicOverview}>
        <div>{cover && <img src={`${cover}`} alt={`Cover of ${title}`} />}</div>
        <div className={styles.comicDetails}>
          <div className={styles.comicTitle}>{title}</div>
          <div>{description}</div>
        </div>
      </div>

      <div className={styles.issueList}>
        {issues.map(
          ({ id: issueId, cover: issueCover, issueNumber, description }) => (
            <Link
              to={`${issueId}`}
              key={issueNumber}
              className={styles.issueRow}
            >
              <div>
                <img src={issueCover} alt="" />
              </div>
              <div className={styles.issueNumber}>
                <span className="align-top text-xs">#</span>
                {issueNumber}
              </div>
              <div className="text-xs">{description}</div>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default ComicIndex;
