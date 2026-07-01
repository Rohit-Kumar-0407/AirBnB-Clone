//Local Module
const Homes = require('../models/favouritesDataModel')

const getFavourites = (req, res, next) => {
    Homes.fetchFav((Favhomes) => {
        res.render('user/favourite-list', {homes: Favhomes, title: 'Favourites'});
    })
}

const postFavourites = (req, res, next) => {
    const homeId = req.body.homeId;
    Homes.saveFav(homeId);
    res.redirect('/favourites');
}

exports.postFavourites = postFavourites;
exports.getFavourites = getFavourites;