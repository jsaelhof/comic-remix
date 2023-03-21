import { Link } from "@remix-run/react";
import type { RouteMatch } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";
import { requireUserId } from "~/session.server";
import invariant from "tiny-invariant";
import { createIssue } from "~/models/issue.server";

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

export const action = async ({ request, params }: ActionArgs) => {
  const userId = await requireUserId(request);

  invariant(params.comicId);

  const formData = await request.formData();

  const issueNumber = formData.get("issueNumber")?.toString();
  const description = formData.get("description")?.toString();
  const cover = formData.get("cover")?.toString();

  invariant(typeof issueNumber === "string", issueNumber);
  invariant(typeof description === "string", description);

  await createIssue({
    issueNumber,
    description,
    cover: cover || "",
    comicId: params.comicId,
    userId,
  });

  return redirect(`/comics/${params.comicId}`);
};

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

const NewIssue = () => {
  return (
    <div>
      <div>Add a new issue</div>
      <form method="post" className="grid gap-4">
        <label>
          Issue Number:
          <div className="flex items-center gap-2">
            <div>#</div>
            <input name="issueNumber" type="text" className={inputClassName} />
          </div>
        </label>

        <label>
          Description:
          <input name="description" type="text" className={inputClassName} />
        </label>

        <label>
          Cover URL:
          <input name="cover" type="text" className={inputClassName} />
        </label>

        <button
          type="submit"
          className="w-40 rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
        >
          Add Issue
        </button>
      </form>
    </div>
  );
};

export default NewIssue;
