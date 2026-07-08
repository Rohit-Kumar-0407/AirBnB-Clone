//Core Modules
const express = require('express');
const userRoute = express.Router();
const path = require('path');

//Local Modules
const rootDir = require('../utils/path');
const {homes} = require('./hostRoute');
const HomeControllers = require('../controllers/HomeControllers');
const FavControllers = require('../controllers/FavControllers');

//GET Requests
userRoute.get('/', HomeControllers.getHome);
userRoute.get('/favourites', FavControllers.getFavourites);
userRoute.get('/reserve', HomeControllers.getReserve);
userRoute.get('/bookings', HomeControllers.getBookings);
userRoute.get('/home-listing', HomeControllers.getHomeListings);
userRoute.get('/home/:homeId', HomeControllers.getHomeDetails);

//POST Request
userRoute.post('/favourites', FavControllers.postFavourites);

module.exports = userRoute;