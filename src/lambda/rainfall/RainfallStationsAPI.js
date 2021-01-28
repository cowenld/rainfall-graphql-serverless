const { RESTDataSource } = require("apollo-datasource-rest");
const { addDays, format } = require("date-fns");
const _ = require("underscore");

function getDistance(station, selectedNorthing, selectedEasting) {
  const stationDistance = Math.sqrt(Math.pow(station.easting, 2) + Math.pow(station.northing, 2));
  const selectStation = Math.sqrt(Math.pow(selectedNorthing, 2) + Math.pow(selectedEasting, 2));
  const distance = stationDistance - selectStation;
  return distance;
}

class RainfallStationsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL =
      "https://environment.data.gov.uk/flood-monitoring/id/stations/";
  }

  async getStationsWithinLatLong({
    lat,
    long,
    northing,
    easting,
  }) {
    const params = _.extend(
      { parameter: "rainfall", _view: "full", dist: 10 },
      { lat, long }
    );
    const urlParams = new URLSearchParams(params).toString();

    const response = await this.get(`?${urlParams}`);
    const closestStation = response.items.reduce((a, b) => {
      const aDistance = Math.abs(getDistance(a, northing, easting ));
      const bDistance = Math.abs(getDistance(b, northing, easting ));
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

module.exports = {
  RainfallStationsAPI,
};
