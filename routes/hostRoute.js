//Core Modules
const express = require('express');
const hostRoute = express.Router();

//Local Modules
const HostControllers = require('../controllers/HostControllers');

//Add Home GET Route
hostRoute.get('/add-home', HostControllers.getAddHome);
hostRoute.get('/home-listing', HostControllers.getHostHomeList);

//Add Home POST Route
hostRoute.post('/add-home', HostControllers.postaddHome);


exports.hostRoute = hostRoute;
