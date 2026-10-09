//Core Modules
const mongoose = require('mongoose');
const User = require('../models/UserModel');

//Local Module
const Homes = require('../models/registeredHomesDataModel');

const getFavourites = async (req, res, next) => {
    const userId = req.session.user._id;
    const user = await User.findById(userId).populate('favourites');
    console.log(user);
    res.render('user/favourite-list', {homes: user.favourites, title: 'Favourites', isLoggedIn: req.session.isLoggedIn,  user: req.session.user});
}
const postFavourites = async (req, res, next) => {
    const homeId = req.body.homeId;
    const userId = req.session.user._id;
    const user = await User.findById(userId).populate('favourites');
    
    const alreadyFaved = user.favourites.some(favId => favId.toString() === homeId);
    
    if (!alreadyFaved) {
        user.favourites.push(homeId);
        await user.save();
    }
    
    res.redirect('/favourites');
}

const postDeleteFavourites = async (req, res, next) => {
    const favhomeId = req.body.favhomeId;
    const userId = req.session.user._id;
    const user = await User.findById(userId);

    user.favourites = user.favourites.filter(fav => fav.toString() !== favhomeId);
    await user.save();    
    res.redirect('/favourites');
}

exports.postFavourites = postFavourites;
exports.getFavourites = getFavourites;
exports.postDeleteFavourites = postDeleteFavourites;