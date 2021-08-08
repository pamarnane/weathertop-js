"use strict";

const stationSummary = {

  getLowestTemp(station) {
    let lowestTemp = null;
    if (station.readings.length > 0) {
      lowestTemp = station.readings[0].temperature;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].temperature < lowestTemp) {
          lowestTemp = station.readings[i].temperature;
        }
      }
    }
    return lowestTemp;
  }
};

module.exports = stationSummary;