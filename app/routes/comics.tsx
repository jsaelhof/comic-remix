import { Outlet } from "@remix-run/react";
import AppBar from "~/components/app-bar/app-bar";
import styles from "./comics.module.css";
import { useTranslation } from "react-i18next";

const Comics = () => {
  let { t } = useTranslation();

  return (
    <div className={styles.mainLayout}>
      <AppBar />

      <div className={styles.content}>
        <h1>{t("greeting")}</h1>
        <Outlet />
      </div>
    </div>
  );
};

export default Comics;
