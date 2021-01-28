import React from "react";
import { useMap } from "react-leaflet";
import { Button, Icon } from "semantic-ui-react";
import styles from "./CurrentLocationButton.module.css";

const CurrentLocationButton = () => {
  const map = useMap();

  return (
    <Button
      icon
      basic
      size='small'
      className={styles.button}
      onClick={() => {
        map.locate({
          setView: true,
          maxZoom: 10,
        });
      }}
    >
      <Icon color="grey" name="location arrow" className={styles.icon} />
    </Button>
  );
};

export default CurrentLocationButton;
