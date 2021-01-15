import React, { useContext } from "react";
import { format } from "date-fns";
import { BikeParkMapContext } from "../BikeParkMap.context";
import styles from "./InformationBar.module.css";

const InformationBar = () => {
  const {
    bikeParkMapState: { selectedBikePark, closestRainfallStation, rainfall },
  } = useContext(BikeParkMapContext);

  if(!selectedBikePark) return null;

  return (
    <div className={styles.bar}>
      {selectedBikePark && selectedBikePark.name} -
      {closestRainfallStation && closestRainfallStation.stationReference}
      {rainfall &&
        rainfall.map((rainfallItem) => {
          return (
            <div key={rainfallItem.date}>
              {format(new Date(rainfallItem.date), "iii")}
              {rainfallItem.rainfall.value}
            </div>
          );
        })}
    </div>
  );
};

export default InformationBar;
