/* eslint-disable jest/no-focused-tests */
/* eslint-disable testing-library/no-debugging-utils */
/* eslint-disable jest/no-disabled-tests */
import { describe } from "vitest";
import ComicsIndex from "./index";
import Comics from "../comics";
import { render, screen, within } from "@testing-library/react";
import { unstable_createRemixStub } from "@remix-run/testing";
import { json } from "@remix-run/node";

const mockCompleteLoaderData = {
  comicItems: [
    {
      id: "1234",
      title: "Action Comics",
      volume: "Vol. 1",
      description: "The first appearance of Superman",
      cover: "https://www.test.com/actioncomics/1",
    },
    {
      id: "1235",
      title: "Amazing Fantasy",
      volume: "1962",
      description: "The first appearance of Spider-Man occurs in Issue #15",
      cover: "https://www.test.com/amazingfantasy/1",
    },
  ],
};

describe.skip("index.tsx", () => {
  it("should render a simple component", () => {
    const SimpleComponent = () => <div>My Component</div>;

    const { debug } = render(<SimpleComponent />);

    expect(screen.getByText("My Component")).toBeInTheDocument();

    debug();
  });

  it("should render (but won't)", () => {
    const { debug } = render(<ComicsIndex />);
    debug();
  });

  it("should render with stub", async () => {
    const Stub = unstable_createRemixStub([
      {
        path: "/comics/index",
        element: <ComicsIndex />,
        loader: () =>
          json({
            comicItems: [
              {
                id: "1234",
                title: "Action Comics",
                volume: "Vol. 1",
                description: "The first appearance of Superman",
                cover: "https://www.test.com/actioncomics/1",
              },
            ],
          }),
      },
    ]);

    const { debug } = render(<Stub initialEntries={["/comics/index"]} />);
    expect(await screen.findByText("Action Comics")).toBeInTheDocument();
    debug();
  });

  it("should render the UI", async () => {
    const Stub = unstable_createRemixStub([
      {
        path: "/comics/index",
        element: <ComicsIndex />,
        loader: () => json(mockCompleteLoaderData),
      },
    ]);

    const { debug } = render(<Stub initialEntries={["/comics/index"]} />);

    // Action Comics
    expect(
      await screen.findByRole("link", { name: "Action Comics" })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("link", { name: "Action Comics" })
    ).toHaveAttribute("href", "/comics/index/1234");

    const actionComicsNode = within(
      await screen.findByRole("link", { name: "Action Comics" })
    );
    expect(
      actionComicsNode.getByText(/first appearance of Superman/)
    ).toBeInTheDocument();
    expect(
      actionComicsNode.getByAltText(/Action Comics Vol. 1/)
    ).toBeInTheDocument();
    expect(
      actionComicsNode.getByRole("img", { name: /Action Comics Vol. 1/ })
    ).toBeInTheDocument();

    // Amazing Fantasy
    expect(
      await screen.findByRole("link", { name: "Amazing Fantasy" })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("link", { name: "Amazing Fantasy" })
    ).toHaveAttribute("href", "/comics/index/1235");

    const amazingFantasyNode = within(
      await screen.findByRole("link", { name: "Amazing Fantasy" })
    );
    expect(
      amazingFantasyNode.getByText(/first appearance of Spider-Man/)
    ).toBeInTheDocument();
    expect(
      amazingFantasyNode.getByAltText(/Amazing Fantasy/)
    ).toBeInTheDocument();
    expect(
      amazingFantasyNode.getByRole("img", { name: /Amazing Fantasy 1962/ })
    ).toBeInTheDocument();

    // Volumes
    const volumes = screen.getAllByLabelText("volume");
    expect(volumes).toHaveLength(2);
    expect(volumes[0]).toHaveTextContent("Vol. 1");
    expect(volumes[1]).toHaveTextContent("1962");

    debug();
  });

  it("should render the empty state", async () => {
    const Stub = unstable_createRemixStub([
      {
        path: "/comics/index",
        element: <ComicsIndex />,
        loader: () =>
          json({
            comicItems: [],
          }),
      },
    ]);
    const { debug } = render(<Stub initialEntries={["/comics/index"]} />);

    expect(
      await screen.findByText("There are no comics yet.")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: "Add a Comic" })
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Add a Comic" })).toHaveAttribute(
      "href",
      "/comics/new"
    );

    debug();
  });

  it("should render a placeholder when the coverurl is missing", async () => {
    const Stub = unstable_createRemixStub([
      {
        path: "/comics/index",
        element: <ComicsIndex />,
        loader: () =>
          json({
            comicItems: [
              {
                id: "1235",
                title: "Amazing Fantasy",
                volume: "1962",
                description:
                  "The first appearance of Spider-Man occurs in Issue #15",
                //cover: "https://www.test.com/amazingfantasy/1",
              },
            ],
          }),
      },
    ]);

    const { debug } = render(<Stub initialEntries={["/comics/index"]} />);

    expect(
      await screen.findByRole("link", { name: "Amazing Fantasy" })
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("img", { name: /Amazing Fantasy 1962/ })
    ).not.toBeInTheDocument();

    expect(screen.getByText("Missing Cover")).toBeInTheDocument();

    debug();
  });

  it("should render with a parent component in the view", async () => {
    const Stub = unstable_createRemixStub([
      {
        path: "/comics",
        element: <Comics />,
        children: [
          {
            path: "/comics/index",
            element: <ComicsIndex />,
            loader: () => json(mockCompleteLoaderData),
          },
        ],
      },
    ]);

    const { debug } = render(<Stub initialEntries={["/comics/index"]} />);

    expect(
      await screen.findByRole("link", { name: "Action Comics" })
    ).toBeInTheDocument();

    debug();
  });
});
