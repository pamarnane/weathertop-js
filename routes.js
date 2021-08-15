"use strict";

const express = require("express");
const router = express.Router();
//const song = require("./controllers/song.js");

const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");
const station = require("./controllers/station.js");
const accounts = require('./controllers/accounts.js');

router.get("/dashboard", dashboard.index);
router.get("/about", about.index);
router.get("/station/:id", station.index);

router.post("/station/:id/addreading", station.addReading);
router.post('/dashboard/addstation', dashboard.addStation);

router.get("/station/:id/deletereading/:readingid", station.deleteReading);
router.get("/dashboard/deletestation/:id", dashboard.deleteStation);

router.get('/', accounts.index);
router.get('/accounts', accounts.account);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);
router.post('/accounts/:id/update', accounts.update);

//router.get("/song/:id/editsong/:songid", song.index);
//router.post("/song/:id/updatesong/:songid", song.update);

module.exports = router;
