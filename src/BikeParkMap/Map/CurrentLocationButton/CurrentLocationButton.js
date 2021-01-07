import React from "react";
import { useMap } from "react-leaflet";
import styles from "./CurrentLocationButton.module.css";

const CurrentLocationButton = () => {
  const map = useMap();

  return (
    <button
      className={styles.button}
      onClick={() => {
        // set loading
        map.locate({
          setView: true,
          maxZoom: 10,
        });
        // false loading
      }}
    >
      Get Current Location
    </button>
  );
};

export default CurrentLocationButton;
