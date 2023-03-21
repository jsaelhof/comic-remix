import { Outlet } from "@remix-run/react";
import AppBar from "~/components/app-bar/app-bar";
import styles from "./comics.module.css";

const Comics = () => {
  return (
    <div className={styles.mainLayout}>
      <AppBar />

      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Comics;
