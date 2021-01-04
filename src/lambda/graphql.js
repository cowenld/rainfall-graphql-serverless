const { ApolloServer, gql } = require("apollo-server-lambda");
const bikeParks = [
  {
    id: 1,
    name: "Aston Hill",
    postcode: "HP22 5NQ",
    address: "Aston Hill, Halton, Buckinghamshire, HP22 5NQ",
    website: "https://www.rideastonhill.co.uk/",
    lat: "51.782909",
    long: "-0.709155",
  },
  {
    id: 2,
    name: "Rogate",
    postcode: "GU31 5DL",
    address: "Rogate, Petersfield, GU31 5DL",
    website: "https://www.b1ke.com/b1keparks/rogate/",
    lat: "51.03414",
    long: "-0.85510",
  },
];

const typeDefs = gql`
  type Query {
    hello: String
    bikeParks: [BikePark]
  }
  type BikePark {
    id: ID!
    name: String
    address: String
    postcode: String
    website: String
    lat: String
    long: String
  }
`;

const resolvers = {
  Query: {
    hello: (root, args, context) => {
      return "Hello, world 2!";
    },
    bikeParks() {
      return bikeParks;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

exports.handler = server.createHandler();
