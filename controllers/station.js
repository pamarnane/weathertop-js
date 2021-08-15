'use strict';

const logger = require('../utils/logger');
const stationStore = require('../models/station-store.js');
const uuid = require('uuid');
const stationSummary = require('../utils/station-summary.js');

const station = {
  index(request, response) {
    const stationId = request.params.id;
    logger.info('Playlist id = ' + stationId);
    
    const station = stationStore.getStation(stationId);
    const summary = station.summary;

    const viewData = {
      title: station.location,
      location: station.location,
      lat: station.lat,
      lng: station.lng,
      station: stationStore.getStation(stationId),
      summary: summary
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
      date: currentTime,
    };
    stationStore.addReading(stationId, newReading);
    //stationStore.updateSummary(stationId);
    response.redirect('/station/' + stationId);
  },
};

module.exports = station;