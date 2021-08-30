'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const stationSummary = require("../utils/station-summary");

const stationStore = {

  store: new JsonStore('./models/station-store.json', { stationCollection: [] }),
  collection: 'stationCollection',

  getAllStations() {
    return this.store.findAll(this.collection);
  },

  getStation(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getUserStations(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },

  getUserStationsAlpha(userid) {
    const userStations = this.store.findBy(this.collection, { userid: userid });
    return _.sortBy(userStations, 'location');
  },
  
  addStation(station) {
    this.store.add(this.collection, station);
    this.store.save();
  },

  removeStation(id) {
    const station = this.getStation(id);
    this.store.remove(this.collection, station);
    this.store.save();
  },

  removeAllStations() {
    this.store.removeAll(this.collection);
    this.store.save();
  },

  addReading(id, reading) {
    const station = this.getStation(id);
    station.readings.push(reading);
    this.store.save();
    this.updateSummary(id);
  },

  removeReading(id, readingId) {
    const station = this.getStation(id);
    const readings = station.readings;
    _.remove(readings, { id: readingId});
    this.store.save();
    this.updateSummary(id);
  },
  
  getReading(id, readingId) {
    const station = this.store.findOneBy(this.collection, { id: id });
    const readings = station.readings.filter(reading => reading.id == readingId);
    return readings[0];
  },

  updateReading(reading, updatedReading) {
    reading.title = updatedReading.title;
    reading.artist = updatedReading.artist;
    reading.duration = updatedReading.duration;
    this.store.save();
  },

  updateSummary(id) {
    const station = this.getStation(id);
    const i = station.readings.length - 1;

    if (station.readings.length >= 1) {
    station.summary.minTempC = stationSummary.getMinTemp(station);
    station.summary.maxTempC = stationSummary.getMaxTemp(station);
      if (station.readings[i].description) {
        station.summary.weatherDesc = station.readings[i].description;
        station.summary.weatherIcon = station.readings[i].icon;
      }
      else{
        station.summary.weatherDesc = stationSummary.getWeatherString(station);
        station.summary.weatherIcon = stationSummary.getWeatherIconMap(station);
      }
    station.summary.windBft = stationSummary.getWindBeaufort(station);
    station.summary.windDirectionString = stationSummary.getWindDirection(station);
    station.summary.windChill = stationSummary.getWindChill(station);
    station.summary.minWindSpd = stationSummary.getMinWindSpd(station);
    station.summary.maxWindSpd = stationSummary.getMaxWindSpd(station);
    station.summary.minPressure = stationSummary.getMinPress(station);
    station.summary.maxPressure = stationSummary.getMaxPress(station);
    station.summary.tempF = stationSummary.getTempF(station);

    station.summary.pressure = station.readings[i].pressure;
    station.summary.tempC = station.readings[i].temperature;

    const arrTrends = stationSummary.getTrends(station);
    station.summary.tempTrend = arrTrends[0];
    station.summary.windTrend = arrTrends[1];
    station.summary.pressTrend = arrTrends[1];

    this.store.save();
    }
  }
};

module.exports = stationStore;