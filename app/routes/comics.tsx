import { Outlet } from "@remix-run/react";
import AppBar from "~/components/app-bar/app-bar";
import styles from "./comics.module.css";
import { useTranslation } from "react-i18next";

// This tells remix to load the "app-bar" namespace
// If i take this out, it still works, but it flashes the keys for strings from a non-default namespace in the UI and then replaces them with the translation.
// I assume that means the server-rendered HTML is missing the translation but then the client does it (seems to be the case...
// If we don't use the handle but you DO pass the namespace to useTranslation, it appears to lazy-load the bundle client side resulting in a quick flash when the SSR renders the key and then the client renders the translation.
// If we don't use the handle AND we don't pass the namespace to useTranslation, then only common works
//export let handle = { i18n: ["app-bar","blah"] };
const Comics = () => {
  // Whichever namespace is specified first (if an array is used) is the default and doesn't need the namespace in front of it's key
  // (ie. if ["app-bar", "common"], then you don't have to do "app-bar:token", just use "token", but you will have to do "common:token".
  //
  // If you don't pass any namespaces here, then you have to use the namespace in front of the token all the time.
  //
  // If we don't use the handle but you DO pass the namespace, it appears to lazy-load the bundle client side resulting in a quick flash when the SSR renders the key and then the client renders the translation, provided you include the namespace in the token.
  // If we don't use the handle AND we don't pass the namespace, then only common works.
  //
  // Setting the handle seems to be important for how the remix plugin scrapes the remix routes looking for namespaces to declare during init.
  // I've replaced this with a readdirSync to find them because this handle approach doesn't work with tests.
  let { t } = useTranslation(["appBar", "blah", "common"]);

  const tokens = [
    "greeting",
    "common:greeting",
    "token",
    "appBar:token",
    "abc",
    "appBar:abc",
    "foo",
    "blah:foo"
  ];

  console.log({
    ...tokens.reduce<{ [key: string]: string }>((acc, s) => {
      acc[s] = t(s);
      return acc;
    }, {}),
    icu: t("common:icu", { numPersons: 500 })
  });

  return (
    <div className={styles.mainLayout}>
      <AppBar />

      <div className={styles.content}>
        {tokens.map((s) => (
          <h1 key={s}>
            {s}: {t(s)}
          </h1>
        ))}
        <Outlet />
      </div>
    </div>
  );
};

export default Comics;
