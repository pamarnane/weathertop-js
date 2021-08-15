"use strict";

const logger = require("../utils/logger");
const stationStore = require('../models/station-store.js');
const uuid = require('uuid');
const accounts = require ('./accounts.js');
const stationSummary = require("../utils/station-summary");

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
      const summary = {
        weatherDesc: "",
        weatherIcon: "",
        tempC: 0.0,
        maxTempC: 0.0,
        minTempC: 0.0,
        tempF: 0.0,

        windBft: 0,
        windDirectionString: "",
        windChill: 0.0,
        maxWindSpd: 0.0,
        minWindSpd: 0.0,

        pressure: 0,
        maxPressure: 0,
        minPressure: 0
      }
      const newStation = {
        id: uuid.v1(),
        userid: loggedInUser.id,
        location: request.body.location,
        lat: Number(request.body.lat),
        lng: Number(request.body.lng),
        readings: [],
        summary,
    };
    stationStore.addStation(newStation);
    response.redirect('/dashboard');
  },
};

module.exports = dashboard;
