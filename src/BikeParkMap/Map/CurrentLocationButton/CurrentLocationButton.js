import React from "react";
import { useMap } from "react-leaflet";
import { Button, Icon } from "semantic-ui-react";
import styles from "./CurrentLocationButton.module.css";

const CurrentLocationButton = () => {
  const map = useMap();

  function centerOnLocation() {
    map.locate({
      setView: true,
      maxZoom: 10,
    });
  }

  return (
    <Button
      icon
      basic
      size="small"
      className={styles.button}
      onClick={() => {
        centerOnLocation();
      }}
    >
      <Icon color="grey" name="location arrow" className={styles.icon} />
    </Button>
  );
};

export default CurrentLocationButton;
