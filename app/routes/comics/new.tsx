import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { createComic } from "~/models/comic.server";
import { requireUserId } from "~/session.server";
import { Link } from "@remix-run/react";

export const handle = {
  nav: () => <Link to={`/comics`}>All Comics</Link>,
};

export const action = async ({ request }: ActionArgs) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();

  const title = formData.get("title")?.toString();
  const volume = formData.get("volume")?.toString();
  const description = formData.get("description")?.toString();
  const cover = formData.get("cover")?.toString();

  invariant(typeof title === "string", title);
  invariant(typeof volume === "string", volume);
  invariant(typeof description === "string", description);

  await createComic({ title, volume, description, cover: cover || "", userId });

  return redirect("/comics");
};

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 mb-4 text-lg`;

const NewComic = () => {
  return (
    <div>
      <div>Add a new comic</div>
      <form method="post">
        <label>
          Title:
          <input name="title" type="text" className={inputClassName} />
        </label>

        <label>
          Volume:
          <input name="volume" type="text" className={inputClassName} />
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
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
        >
          Add Comic
        </button>
      </form>
    </div>
  );
};

export default NewComic;
