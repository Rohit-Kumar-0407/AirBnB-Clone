//Core Modules
const express = require('express');
const hostRoute = express.Router();

//Local Modules
const HostControllers = require('../controllers/HostControllers');

//Add Home GET Route
hostRoute.get('/add-home', HostControllers.getAddHome);
hostRoute.get('/home-listing', HostControllers.getHostHomeList);
hostRoute.get('/edit-home/:homeId', HostControllers.geteditHome);


//Add Home POST Route
hostRoute.post('/add-home', HostControllers.postaddHome);
hostRoute.post('/edit-home/:homeId', HostControllers.updateHome);
hostRoute.post('/delete-home/:homeId', HostControllers.deleteHome);

exports.hostRoute = hostRoute;
