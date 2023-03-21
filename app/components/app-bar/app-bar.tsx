import { Form, useMatches } from "@remix-run/react";

import styles from "./app-bar.module.css";

const AppBar = () => {
  const matches = useMatches();

  return (
    <div className={styles.appBar}>
      <div className="grid grid-flow-col gap-4">
        {/* 
            Call the handle for the route and pass it all the matches so it has access to everything.
            The nav function in the handle should return any links that should be in the app bar.
            The handles (so far) either need no data (known routes like /comics) or need access to the comic data.
            If I don't end up needing more data, then I could just find the comic data and pass it down which
            would dramatically simplify what the handle.nav functions have to do.
        */}
        {matches
          .filter((match) => match.handle?.nav)
          .map((match) => match.handle?.nav(matches))}
      </div>

      <Form action="/logout" method="post">
        <button
          type="submit"
          className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
        >
          Logout
        </button>
      </Form>
    </div>
  );
};

export default AppBar;
