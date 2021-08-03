"use strict";

const logger = require("../utils/logger");
const playlistStore = require('../models/playlist-store.js');
const uuid = require('uuid');
const accounts = require ('./accounts.js');

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: "Playlist Dashboard",
      playlists: playlistStore.getUserPlaylists(loggedInUser.id),
    };
    logger.info('about to render', playlistStore.getUserPlaylists(loggedInUser.id));
    response.render("dashboard", viewData);
  },
  
  deletePlaylist(request, response) {
    const playlistId = request.params.id;
    logger.info(`Deleting Playlist ${playlistId}`);
    playlistStore.removePlaylist(playlistId);
    response.redirect('/dashboard');
  },
  
    addPlaylist(request, response) {
      const loggedInUser = accounts.getCurrentUser(request);
      const newPlayList = {
        id: uuid.v1(),
        userid: loggedInUser.id,
        title: request.body.title,
        songs: [],
    };
    playlistStore.addPlaylist(newPlayList);
    response.redirect('/dashboard');
  },
};

module.exports = dashboard;
