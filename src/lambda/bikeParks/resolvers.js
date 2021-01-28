const faunaDb = require("faunadb");
const q = faunaDb.query;

var client = new faunaDb.Client({ secret: process.env.FAUNA });

const resolvers = {
  Query: {
    bikeParks: async () => {
      const results = await client.query(
        q.Map(
          q.Paginate(q.Match(q.Index("all_bikesParks"))),
          q.Lambda((x) => q.Get(x))
        )
      );
      return results.data.map((bikePark) => ({
        id: bikePark.ref.id,
        name: bikePark.data.properties.name,
        website: bikePark.data.properties.website,
        trails: bikePark.data.properties.trails,
        northing: bikePark.data.geometry.northing,
        easting: bikePark.data.geometry.easting,
        lat: bikePark.data.geometry.coordinates[1],
        long: bikePark.data.geometry.coordinates[0],
      }));
    },
  },
};

module.exports = {
  resolvers,
};
