"use strict";

const logger = require("../utils/logger");
const playlistcollection = require('../models/playlist-store.js');

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      title: "Template 1 Dashboard",
      playlists: playlistStore.getAllPlaylists()
    };
    logger.info('about to render', playlistcollection)
    response.render("dashboard", viewData);
  },
};

module.exports = dashboard;
