'use strict';

const logger = require('../utils/logger');
const playlistStore = require('../models/playlist-store.js');
const uuid = require('uuid');
const playlistAnalytics = require('../utils/playlist-analytics.js');

const playlist = {
  index(request, response) {
    const playlistId = request.params.id;
    logger.info('Playlist id = ' + playlistId);
    
      const playlist = playlistStore.getPlaylist(playlistId);
    const shortestSong = playlistAnalytics.getShortestSong(playlist);
    
    const viewData = {
      title: 'Playlist',
      playlist: playlistStore.getPlaylist(playlistId),
      shortestSong: shortestSong
    };
    response.render('playlist', viewData);
  },
  
  deleteSong(request, response) {
    const playlistId = request.params.id;
    const songId = request.params.songid;
    logger.info(`Deleting Song ${songId} from Playlist ${playlistId}`);
    playlistStore.removeSong(playlistId, songId);
    response.redirect('/playlist/' + playlistId);
  },
  
   addSong(request, response) {
    const playlistId = request.params.id;
    const playlist = playlistStore.getPlaylist(playlistId);
    const newSong = {
      id: uuid.v1(),
      title: request.body.title,
      artist: request.body.artist,
      duration: Number(request.body.duration),
    };
    playlistStore.addSong(playlistId, newSong);
    response.redirect('/playlist/' + playlistId);
  },
};

module.exports = playlist;