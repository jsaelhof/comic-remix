import { describe, it, vi } from "vitest";
import type { Comic } from "../../models/comic.server";
import type { Issue } from "../../models/issue.server";
import ComicDetail, { loader } from "./$comicId";
import { render } from "@testing-library/react";

vi.mock("~/session.server", async () => {
  const actual: any = await vi.importActual("~/session.server");
  return {
    ...actual,
    requireUserId: vi.fn().mockResolvedValue("999999"),
  };
});

vi.mock("~/models/comic.server", () => ({
  getComic: vi.fn().mockResolvedValue({
    id: "123",
    title: "Test Comic",
    description: "Test description",
    cover: "https://www.test.com/cover/1",
    volume: "2023",
    userId: "999999",
  }),
  getIssuesForComic: vi.fn().mockResolvedValue([
    {
      id: "444",
      description: "Issue 1 description",
      cover: "https://www.test.com/cover/1",
      userId: "999999",
      comicId: "123",
      issueNumber: "1",
    },
    {
      id: "555",
      description: "Issue 2 description",
      cover: "https://www.test.com/cover/2",
      userId: "999999",
      comicId: "123",
      issueNumber: "2",
    },
  ]),
}));

describe("$comicId", () => {
  it("should return the correct loader repsonse format", async () => {
    const request = new Request("http://foo.bar");

    const response = await loader({
      request,
      context: {},
      params: {
        comicId: "123",
      },
    });

    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({
      comic: {
        id: "123",
        title: "Test Comic",
        description: "Test description",
        cover: "https://www.test.com/cover/1",
        volume: "2023",
        userId: "999999",
      },
      issues: [],
    });
  });

  it("should render the UI", async () => {
    const { debug } = render(<ComicDetail />);
    debug();
  });
});
