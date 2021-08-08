"use strict";

const logger = require("../utils/logger");
const stationStore = require('../models/station-store.js');
const uuid = require('uuid');
const accounts = require ('./accounts.js');

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: "Station Dashboard",
      stations: stationStore.getUserStations(loggedInUser.id),
    };
    logger.info('about to render', stationStore.getUserStations(loggedInUser.id));
    response.render("dashboard", viewData);
  },
  
  deleteStation(request, response) {
    const stationId = request.params.id;
    logger.info(`Deleting Playlist ${stationId}`);
    stationStore.removeStation(stationId);
    response.redirect('/dashboard');
  },
  
    addStation(request, response) {
      const loggedInUser = accounts.getCurrentUser(request);
      const newStation = {
        id: uuid.v1(),
        userid: loggedInUser.id,
        location: request.body.location,
        lat: Number(request.body.lat),
        lng: Number(request.body.lng),
        readings: []
    };
    stationStore.addStation(newStation);
    response.redirect('/dashboard');
  },
};

module.exports = dashboard;
