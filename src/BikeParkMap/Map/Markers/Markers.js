import React, { useContext } from "react";
import { Marker } from "react-leaflet";
import { BikeParkMapContext } from "../../BikeParkMap.context";
import { gql, useQuery } from "@apollo/client";
import { Icon } from "leaflet";

const bikeParks = gql`
  {
    bikeParks {
      id
      name
      lat
      long
    }
  }
`;

const mtbIcon = new Icon({
  iconUrl: require("./mtb.png"),
  iconSize: [25, 25],
});

const Markers = () => {
  const { loading, error, data } = useQuery(bikeParks);
  const { selectBikePark } = useContext(BikeParkMapContext);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.bikeParks.map((bikePark) => (
    <Marker
      key={bikePark.id}
      icon={mtbIcon}
      position={[bikePark.lat, bikePark.long]}
      eventHandlers={{
        click: () => {
          selectBikePark(bikePark);
        },
      }}
    />
  ));
};

export default Markers;
