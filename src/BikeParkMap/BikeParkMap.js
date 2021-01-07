import React from "react";
import Header from "./Header/Header";
import Map from "./Map/Map";
import InformationBar from "./InformationBar/InformationBar";
import { BikeParkMapProvider } from "./BikeParkMap.context";

const BikeParkMap = () => {
  return (
    <BikeParkMapProvider>
      <Header />
      <Map />
      <InformationBar />
    </BikeParkMapProvider>
  );
};

export default BikeParkMap;
