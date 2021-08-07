"use strict";

const express = require("express");
const router = express.Router();
const song = require("./controllers/song.js");

const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");
const playlist = require("./controllers/playlist.js");
const accounts = require('./controllers/accounts.js');

router.get("/dashboard", dashboard.index);
router.get("/about", about.index);
router.get("/playlist/:id", playlist.index);

router.post("/playlist/:id/addsong", playlist.addSong);
router.post('/dashboard/addplaylist', dashboard.addPlaylist);

router.get("/playlist/:id/deletesong/:songid", playlist.deleteSong);
router.get("/dashboard/deleteplaylist/:id", dashboard.deletePlaylist);

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get("/song/:id/editsong/:songid", song.index);
router.post("/song/:id/updatesong/:songid", song.update);

module.exports = router;
