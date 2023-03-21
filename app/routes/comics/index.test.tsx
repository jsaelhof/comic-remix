//

import { describe } from "vitest";
import ComicsIndex from "./index";
import { render, screen } from "@testing-library/react";
import { unstable_createRemixStub } from "@remix-run/testing";
import { json } from "@remix-run/node";

describe("index.tsx", () => {
  it("should render the UI", async () => {
    const Stub = unstable_createRemixStub([
      {
        path: "/comics/index",
        element: <ComicsIndex />,
        loader: () => {
          console.log("LOADER");
          return json({
            comicItems: [
              {
                id: "1234",
                title: "Action Comics",
                volume: "1938",
                description: "The first appearance of Superman",
                cover: "https://www.test.com/actioncomics/1",
              },
              {
                id: "1235",
                title: "Spider-Man",
                volume: "1945",
                description: "The first appearance of Spider-Man",
                cover: "https://www.test.com/spider-man/1",
              },
            ],
          });
        },
      },
    ]);

    const { debug } = render(<Stub initialEntries={["/comics/index"]} />);

    expect(await screen.findByText("Action Comics")).toBeInTheDocument();

    debug();
  });
});
