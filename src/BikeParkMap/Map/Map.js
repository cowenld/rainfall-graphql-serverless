import React from "react";
import L from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import CurrentLocationButton from "./CurrentLocationButton/CurrentLocationButton";
import Markers from "./Markers/Markers";
import styles from "./Map.module.css";
import "leaflet/dist/leaflet.css";

// Leaflet map marker fix.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const Map = () => {
  return (
    <MapContainer
      center={[52.9548, -1.9581]}
      zoom={7}
      className={styles.mapContainer}
    >
      <CurrentLocationButton />
      <Markers />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
};

export default Map;
