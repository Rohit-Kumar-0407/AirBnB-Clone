//Core Modules
const express = require('express');
const userRoute = express.Router();
const path = require('path');

//Local Modules
const rootDir = require('../utils/path');
const {homes} = require('./hostRoute');
const HomeControllers = require('../controllers/HomeControllers')

//Home Page
userRoute.get('/home', HomeControllers.getHome);
userRoute.get('/favourites', HomeControllers.getFavourites);
userRoute.get('/reserve', HomeControllers.getReserve);
userRoute.get('/bookings', HomeControllers.getBookings);

module.exports = userRoute;