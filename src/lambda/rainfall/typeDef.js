const { gql } = require("apollo-server-lambda");

const typeDef = gql`
  type Rainfall {
    date: String
    rainfall: RainfallValue
  }
  type RainfallStation {
    stationReference: String
  }
  type RainfallValue {
    value: Float
  }
  extend type Query {
    rainfall(stationReference: String): [Rainfall]
    closestRainfallStation(
      lat: String
      long: String
      northing: Float
      easting: Float
    ): RainfallStation
  }
`;

module.exports = {
  typeDef
};
