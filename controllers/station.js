'use strict';

const logger = require('../utils/logger');
const stationStore = require('../models/station-store.js');
const uuid = require('uuid');
const stationSummary = require('../utils/station-summary.js');
const axios = require("axios");

const station = {
  async index(request, response) {
    const stationId = request.params.id;
    logger.info('Playlist id = ' + stationId);

    const station = stationStore.getStation(stationId);
    const summary = station.summary;

    const lat = station.lat;
    const lng = station.lng;
    const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=4782581fffcc0ff65757cd0c0d017b2e`
    const result = await axios.get(requestUrl);

    let tempTrend = [];
    let humTrend = [];
    let dewTrend = [];
    let tempTrendLabels = [];

    const trends = result.data.daily;

    for (let i=0; i<trends.length; i++) {
      tempTrend.push(trends[i].temp.day);
      humTrend.push(trends[i].humidity);
      dewTrend.push(trends[i].dew_point);
      const date = new Date(trends[i].dt * 1000);
      tempTrendLabels.push(`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}` );
    }

    const viewData = {
      title: station.location,
      location: station.location,
      lat: station.lat,
      lng: station.lng,
      station: stationStore.getStation(stationId),
      summary: summary,
      chartTempValue: tempTrend,
      chartHumValue: humTrend,
      chartDewValue: dewTrend,
      chartTempLabels: tempTrendLabels
    };
    response.render('station', viewData);
  },
  
  deleteReading(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    logger.info(`Deleting Song ${readingId} from Playlist ${stationId}`);
    stationStore.removeReading(stationId, readingId);
    response.redirect('/station/' + stationId);
  },
  
   addReading(request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    const currentTime = new Date();

    const newReading = {
      id: uuid.v1(),
      code: Number(request.body.code),
      temperature: Number(request.body.temperature),
      windSpeed: Number(request.body.windSpeed),
      pressure: Number(request.body.pressure),
      windDirection: Number(request.body.windDirection),
      date: currentTime
    };
    stationStore.addReading(stationId, newReading);
    response.redirect('/station/' + stationId);

  },

   async addAutoReading(request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    const currentTime = new Date();
    const lat = station.lat;
    const lng = station.lng;
    const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=4782581fffcc0ff65757cd0c0d017b2e`
    const result = await axios.get(requestUrl);

     let autoReading = {}

    if (result.status == 200) {
      let report = result.data.current;

      autoReading = {
        id: uuid.v1(),
        code: report.weather[0].id,
        temperature:  report.temp,
        windSpeed: report.wind_speed,
        pressure: report.pressure,
        windDirection: report.wind_deg,
        date: currentTime,
      }
      console.log(autoReading);
    }
    stationStore.addReading(stationId, autoReading);
    response.redirect('/station/' + stationId);

  },
};

module.exports = station;