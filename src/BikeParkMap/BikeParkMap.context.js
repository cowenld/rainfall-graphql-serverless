import React, { useReducer } from "react";
import { gql, useLazyQuery } from "@apollo/client";

const GET_STATIONS = gql`
  query RainfallStations(
    $lat: String!
    $long: String!
    $northing: Float!
    $easting: Float!
  ) {
    closestRainfallStation(
      lat: $lat
      long: $long
      northing: $northing
      easting: $easting
    ) {
      stationReference
    }
  }
`;

const GET_RAINFALL = gql`
  query RainfallForStation($stationReference: String!) {
    rainfall(stationReference: $stationReference) {
      date
      rainfall {
        value
      }
    }
  }
`;

const initialState = {
  selectedBikePark: null,
  closestRainfallStation: null,
  rainfall: null,
  loadingWeatherData: false,
};

const BikeParkMapContext = React.createContext({ ...initialState });

const BikeParkMapReducer = (state, action) => {
  switch (action.type) {
    case "selectBikePark":
      return {
        ...state,
        selectedBikePark: action.payload,
        loadingWeatherData: true,
      };
    case "deselectBikePark":
      return {
        ...state,
        selectedBikePark: null,
      };
    case "closestRainfallStation":
      return {
        ...state,
        closestRainfallStation: action.payload.closestRainfallStation,
      };
    case "rainfall":
      return {
        ...state,
        rainfall: action.payload.rainfall,
        loadingWeatherData: false,
      };
    default:
      throw new Error(JSON.stringify(action));
  }
};

const BikeParkMapProvider = (props) => {
  const [bikeParkMapState, setBikeParkMapState] = useReducer(
    BikeParkMapReducer,
    initialState
  );

  const [getRainfall] = useLazyQuery(GET_RAINFALL, {
    onCompleted: (data) => {
      setBikeParkMapState({
        type: "rainfall",
        payload: data,
      });
    },
  });

  const [getStations] = useLazyQuery(GET_STATIONS, {
    onCompleted: (data) => {
      setBikeParkMapState({
        type: "closestRainfallStation",
        payload: data,
      });

      getRainfall({
        variables: {
          stationReference: data.closestRainfallStation.stationReference,
        },
      });
    },
  });

  function selectBikePark(bikePark) {
    if (!bikePark) {
      setBikeParkMapState({ type: "deselectBikePark" });
    } else {
      setBikeParkMapState({ type: "selectBikePark", payload: bikePark });
      getStations({
        variables: {
          lat: bikePark.lat,
          long: bikePark.long,
          northing: bikePark.northing,
          easting: bikePark.easting,
        },
      });
    }
  }

  return (
    <BikeParkMapContext.Provider
      value={{
        bikeParkMapState,
        setBikeParkMapState,
        selectBikePark,
      }}
    >
      {props.children}
    </BikeParkMapContext.Provider>
  );
};

export { BikeParkMapContext, BikeParkMapProvider };
