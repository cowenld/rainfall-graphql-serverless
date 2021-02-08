import React, { useContext } from "react";
import { Card, Dimmer, Loader, Button } from "semantic-ui-react";
import { BikeParkMapContext } from "../BikeParkMap.context";
import RainfallCard from "./RainfallCard/RainfallCard";
import Trails from "./Trails/Trails";
import styles from "./InformationBar.module.css";

const Loading = () => (
  <Card className={styles.card}>
    <Dimmer active>
      <Loader />
    </Dimmer>
  </Card>
);

const InformationBar = () => {
  const {
    bikeParkMapState: { selectedBikePark, rainfall, loadingWeatherData },
    selectBikePark
  } = useContext(BikeParkMapContext);

  if (!selectedBikePark) return null;

  return (
    <>
      <div className={styles.bar}>
        <Card className={styles.card}>
          <Card.Content>
            <Card.Header className={styles.header}>
              {selectedBikePark && selectedBikePark.name}
            </Card.Header>
            <Card.Description>
              <Trails trails={selectedBikePark.trails} />
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button
              circular
              negative
              icon="close"
              className={styles.button}
              onClick={() => {
                selectBikePark(null);
              }}
            />
          </Card.Content>
        </Card>
        {loadingWeatherData && <Loading />}
        {!loadingWeatherData &&
          rainfall &&
          rainfall.map(rainfallItem => (
            <RainfallCard rainfallItem={rainfallItem} key={rainfallItem.date} />
          ))}
      </div>
    </>
  );
};

export default InformationBar;
