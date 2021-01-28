const { ApolloServer, gql } = require("apollo-server-lambda");
const bikeParks = require("./bikeParks");
const rainfall = require("./rainfall");

const typeDef = gql`
  type Query
`;

const server = new ApolloServer({
  typeDefs: [typeDef, bikeParks.typeDef, rainfall.typeDef],
  resolvers: [bikeParks.resolvers, rainfall.resolvers],
  dataSources: () => {
    return {
      rainfallStationsAPI: new rainfall.RainfallStationsAPI(),
    };
  },
  introspection: true,
  playground: true,
});

exports.handler = server.createHandler();
