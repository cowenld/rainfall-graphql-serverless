import React from "react";
import { ReactComponent as RedRun } from "./trail_diff_red.svg";
import { ReactComponent as BlackRun } from "./trail_diff_blackdiamond.svg";
import { ReactComponent as BlueRun } from "./trail_diff_blue.svg";
import styles from "./Svg.module.css";

function Svg({ name }) {
  switch (name) {
    case "redRun":
      return <RedRun className={styles.svg} />;
    case "blackRun":
      return <BlackRun className={styles.svg} />;
    case "blueRun":
      return <BlueRun className={styles.svg} />;
    default:
      return null;
  }
}

export default Svg;
