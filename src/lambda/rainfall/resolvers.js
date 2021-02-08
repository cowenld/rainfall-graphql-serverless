const resolvers = {
  Query: {
    rainfall: async (_source, args, { dataSources }) => {
      return dataSources.rainfallStationsAPI.getRainfallFromStation(args);
    },
    closestRainfallStation: async (_source, args, { dataSources }) => {
      return dataSources.rainfallStationsAPI.getStationsWithinLatLong(args);
    }
  }
};

module.exports = {
  resolvers
};
