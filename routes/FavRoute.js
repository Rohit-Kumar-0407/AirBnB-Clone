const express = require('express');
const FavRoute = express.Router(); 
const FavControllers = require('../controllers/FavControllers');

//GET Route
FavRoute.get('/', FavControllers.getFavourites);

//POST Route
FavRoute.post('/add-favourites', FavControllers.postFavourites);
FavRoute.post('/delete-favourite', FavControllers.postDeleteFavourites);

module.exports = FavRoute;