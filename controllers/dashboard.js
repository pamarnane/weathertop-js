"use strict";

const logger = require("../utils/logger");
const playlistStore = require('../models/playlist-store.js');
const uuid = require('uuid');

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      title: "Playlist Dashboard",
      playlists: playlistStore.getAllPlaylists()
    };
    logger.info('about to render', playlistStore.getAllPlaylists());
    response.render("dashboard", viewData);
  },
  
  deletePlaylist(request, response) {
    const playlistId = request.params.id;
    logger.info(`Deleting Playlist ${playlistId}`);
    playlistStore.removePlaylist(playlistId);
    response.redirect('/dashboard');
  },
  
    addPlaylist(request, response) {
    const newPlayList = {
      id: uuid.v1(),
      title: request.body.title,
      songs: [],
    };
    playlistStore.addPlaylist(newPlayList);
    response.redirect('/dashboard');
  },
};

module.exports = dashboard;
