import React, { useReducer } from "react";
import { gql, useLazyQuery } from "@apollo/client";

const GET_STATIONS = gql`
  query RainfallStations($lat: String!, $long: String!) {
    closestRainfallStation(lat: $lat, long: $long) {
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

const GET_WEATHER = gql`
  query WeatherForBikePark($lat: String!, $long: String!) {
    weather(lat: $lat, long: $long) {
      current
    }
  }
`;

const initialState = {
  selectedBikePark: null,
  closestRainfallStation: null,
  rainfall: null,
};

const BikeParkMapContext = React.createContext({ ...initialState });

const BikeParkMapReducer = (state, action) => {
  switch (action.type) {
    case "selectBikePark":
      return {
        ...state,
        selectedBikePark: action.payload,
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
      };
    case "weatherForBikePark":
      return {
        ...state,
        weather: action.payload.weather,
      };
    default:
      throw new Error();
  }
};

const BikeParkMapProvider = (props) => {
  const [bikeParkMapState, setBikeParkMapState] = useReducer(
    BikeParkMapReducer,
    initialState
  );

  const [getWeather] = useLazyQuery(GET_WEATHER, {
    onCompleted: (data) => {
      setBikeParkMapState({
        type: "weather",
        payload: data,
      });
    },
  });

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
    setBikeParkMapState({ type: "selectBikePark", payload: bikePark });
    getStations({
      variables: {
        lat: bikePark.lat,
        long: bikePark.long,
      },
    });
    getWeather({
      variables: {
        lat: bikePark.lat,
        long: bikePark.long,
      },
    });
  }

  return (
    <BikeParkMapContext.Provider
      value={{ bikeParkMapState, setBikeParkMapState, selectBikePark }}
    >
      {props.children}
    </BikeParkMapContext.Provider>
  );
};

export { BikeParkMapContext, BikeParkMapProvider };
