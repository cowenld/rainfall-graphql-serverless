import React, { useContext } from "react";
import { format } from "date-fns";
import { Card, Dimmer, Loader, Button, Icon } from "semantic-ui-react";
import { BikeParkMapContext } from "../BikeParkMap.context";
import Svg from "../Svg/svg";
import styles from "./InformationBar.module.css";

const Loading = () => (
  <Card className={styles.card}>
    <Dimmer active>
      <Loader />
    </Dimmer>
  </Card>
);

const RainfallCard = ({ rainfallItem }) => {
  const date = new Date(rainfallItem.date);
  const formattedRainfallDate = format(date, "iii");

  return (
    <Card className={styles.card}>
      <Card.Content>
        <Card.Header className={styles.header}>
          {formattedRainfallDate === format(new Date(), "iii")
            ? "Today"
            : formattedRainfallDate}
        </Card.Header>
        <Card.Meta className={styles.meta}>{format(date, "dd/MM")}</Card.Meta>
        <Card.Description className={styles.description}>
          <Icon color="blue" name="rain" className={styles.icon} />
          <div>
            <span className={styles.rainfallValue}>
              {rainfallItem.rainfall.value.toFixed(2)}
            </span>
            <span className={styles.mm}>mm</span>
          </div>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

const Trails = ({ trails }) => {
  const totalTrails = trails.black + trails.red + trails.blue;

  return (
    <>
      {totalTrails === 0 && <>Empty show website</>}
      {trails.blue > 0 && (
        <>
          <Svg name="blueRun" /> {trails.blue}
        </>
      )}
      {trails.red > 0 && (
        <>
          <Svg name="redRun" /> {trails.red}
        </>
      )}
      {trails.black > 0 && (
        <>
          <Svg name="blackRun" /> {trails.black}
        </>
      )}
    </>
  );
};

const InformationBar = () => {
  const {
    bikeParkMapState: { selectedBikePark, rainfall, loadingWeatherData },
    selectBikePark,
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
            {/* <Button
              circular
              positive
              icon="expand arrows alternate"
              className={styles.button}
              onClick={() => {
              }}
            /> */}
          </Card.Content>
        </Card>
        {loadingWeatherData && <Loading />}
        {!loadingWeatherData &&
          rainfall &&
          rainfall.map((rainfallItem) => (
            <RainfallCard rainfallItem={rainfallItem} key={rainfallItem.date} />
          ))}
      </div>
    </>
  );
};

export default InformationBar;
