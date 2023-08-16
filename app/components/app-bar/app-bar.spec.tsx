import { describe } from "vitest";
import AppBar from "~/components/app-bar/app-bar";
import { render, screen } from "@testing-library/react";
import { unstable_createRemixStub } from "@remix-run/testing";
import { I18nextProvider, initReactI18next } from "react-i18next";
import i18next from "i18next";
import i18n from "~/i18n";
import Backend from "i18next-fs-backend";
import { resolve, parse } from "path";
import { readdirSync } from "fs";
import ICU from "i18next-icu";

describe("appBar", () => {
  it("should", async () => {
    const Stub = unstable_createRemixStub([
      {
        path: "/comics/index",
        element: <AppBar />,
      },
    ]);

    // ------------------------------------------------------
    // Wrap this up as a test util.
    // Create a renderWithProviders that includes the i18n provider.
    // Evaluate how that works since we have two renderWith... helpers... can we render one and wrap it with another?
    const ns = readdirSync("./public/locales/en").map(
      (filename) => parse(filename).name
    );

    await i18next
      .use(initReactI18next)
      .use(ICU)
      .use(Backend)
      .init({
        ...i18n,
        lng: "en",
        ns,
        backend: {
          loadPath: resolve("./public/locales/{{lng}}/{{ns}}.json"),
        },
      });
    // ------------------------------------------------------

    render(
      <I18nextProvider i18n={i18next}>
        <Stub initialEntries={["/comics/index"]} />
      </I18nextProvider>
    );

    screen.debug();
  });
});
