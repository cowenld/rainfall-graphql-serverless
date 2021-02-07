import React from "react";
import { format } from "date-fns";
import { Card, Icon } from "semantic-ui-react";
import styles from "./InformationBar.module.css";

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

export default RainfallCard;
