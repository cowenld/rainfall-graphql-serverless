const { gql } = require("apollo-server-lambda");

const typeDef = gql`
  type Trails {
    red: Int
    black: Int
    blue: Int
  }
  type BikePark {
    id: ID!
    name: String
    address: String
    postcode: String
    website: String
    trails: Trails
    northing: Float
    easting: Float
    lat: String
    long: String
  }
  extend type Query {
    bikeParks: [BikePark]
  }
`;

module.exports = {
  typeDef
};
