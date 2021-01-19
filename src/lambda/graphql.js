const { ApolloServer, gql } = require("apollo-server-lambda");
const _ = require("underscore");
const { RESTDataSource } = require("apollo-datasource-rest");
const { addDays, format } = require("date-fns");
const bikeParks = require("./bikeParks");

const typeDefs = gql`
  type Query {
    rainfall(stationReference: String): [Rainfall]
    closestRainfallStation(lat: String, long: String): RainfallStation
  }
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
`;

function getDistance(station) {
  return Math.sqrt(
    Math.pow(station.easting, 2) + Math.pow(station.northing, 2)
  );
}

class RainfallStationsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL =
      "https://environment.data.gov.uk/flood-monitoring/id/stations/";
  }

  async getStationsWithinLatLong({ lat, long }) {
    const params = _.extend(
      { parameter: "rainfall", _view: "full", dist: 10 },
      { lat, long }
    );
    const urlParams = new URLSearchParams(params).toString();

    const response = await this.get(`?${urlParams}`);
    const closestStation = response.items.reduce((a, b) => {
      const aDistance = getDistance(a);
      const bDistance = getDistance(b);
      return aDistance < bDistance ? a : b;
    });
    return closestStation;
  }

  async getRainfallFromStation({ stationReference }) {
    const previousDate = format(addDays(new Date(), -4), "yyyy-MM-dd");
    const response = await this.get(
      `${stationReference}/readings?since=${previousDate}&_limit=3000&parameter=rainfall&_sorted=true`
    );

    const groupedByDate = response.items.reduce((acc, currentValue) => {
      const date = currentValue.dateTime.split("T")[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(currentValue);
      return acc;
    }, {});

    const totalRainfallByDay = Object.keys(groupedByDate).map((date) => {
      return {
        date,
        rainfall: groupedByDate[date].reduce((a, b) => {
          return { value: a.value + b.value };
        }),
      };
    });
    return totalRainfallByDay;
  }
}

const resolvers = {
  Query: {
    closestRainfallStation: async (_source, args, { dataSources }) => {
      return dataSources.rainfallStationsAPI.getStationsWithinLatLong(args);
    },
    rainfall: async (_source, args, { dataSources }) => {
      return dataSources.rainfallStationsAPI.getRainfallFromStation(args);
    },
  },
};

const server = new ApolloServer({
  typeDefs: [bikeParks.typeDef, typeDefs],
  resolvers: [bikeParks.resolvers, resolvers],
  dataSources: () => {
    return {
      rainfallStationsAPI: new RainfallStationsAPI(),
    };
  },
  introspection: true,
  playground: true,
});

exports.handler = server.createHandler();
