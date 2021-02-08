import React, { useContext } from "react";
import L from "leaflet";
import { Marker, useMap } from "react-leaflet";
import { BikeParkMapContext } from "../../BikeParkMap.context";
import { gql, useQuery } from "@apollo/client";
import { Icon } from "leaflet";

const bikeParks = gql`
  {
    bikeParks {
      id
      name
      website
      trails {
        red
        blue
        black
      }
      northing
      easting
      lat
      long
    }
  }
`;

const mtbIcon = new Icon({
  iconUrl: require("../../Svg/bikePin.svg"),
  iconSize: [40, 40],
});

const Markers = () => {
  const { loading, error, data } = useQuery(bikeParks);
  const {
    bikeParkMapState: { selectedBikePark },
    selectBikePark,
  } = useContext(BikeParkMapContext);
  const map = useMap();

  function panToBikePark(bikePark) {
    if (!selectedBikePark || bikePark.id !== selectedBikePark.id) {
      selectBikePark(bikePark);
      map.panTo(new L.LatLng(bikePark.lat, bikePark.long));
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.bikeParks.map((bikePark) => (
    <Marker
      key={bikePark.id}
      icon={mtbIcon}
      position={[bikePark.lat, bikePark.long]}
      eventHandlers={{
        click: () => {
          panToBikePark(bikePark);
        },
      }}
    />
  ));
};

export default Markers;
