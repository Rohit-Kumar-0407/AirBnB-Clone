//Core Modules
const mongoose = require('mongoose');

//Local Module
const FavHomes = require('../models/favouritesDataModel');
const Homes = require('../models/registeredHomesDataModel');

const getFavourites = (req, res, next) => {
    FavHomes.find().populate("homeId").then((favourites) => {
        const favouriteHomes = favourites.map(fav => fav.homeId);
        res.render('user/favourite-list', {homes: favouriteHomes, title: 'Favourites', isLoggedIn: req.session.isLoggedIn});
    }).catch((err) => {
        console.log(err);
    })
}

const postFavourites = (req, res, next) => {
    const homeId = req.body.homeId;
    FavHomes.findOne({homeId: homeId}).then((existingFav) => {
        if(existingFav){
            console.log('Already Added');
            res.redirect('/favourites');
        } else {
            const fav = new FavHomes({homeId});
            fav.save().then((result) => {
                console.log("Favourites Added Succesfully");
                console.log(result);
                res.redirect('/favourites');
            }).catch((err) => {
                console.log(err);
            })
        }
    })
}

const postDeleteFavourites = (req, res, next) => {
    const favhomeId = req.body.favhomeId;
    FavHomes.findOneAndDelete({homeId: new mongoose.Types.ObjectId(favhomeId)}).then((result) => {
        console.log(result);
        console.log('Favourite Deleted Successfully');
        res.redirect('/favourites');
    }).catch((err) => {
        console.log(err);
    })
}

exports.postFavourites = postFavourites;
exports.getFavourites = getFavourites;
exports.postDeleteFavourites = postDeleteFavourites;