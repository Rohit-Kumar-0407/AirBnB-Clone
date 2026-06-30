//Local Modules
const Homes = require('../models/registeredHomesDataModel')

const getHome = (req, res, next) => {
    Homes.fetchAll((homes) => {
        res.render('user/home-page', {homes: homes, title: 'AirBnB - Book Your New Home'});
    })
}

const getFavourites = (req, res, next) => {
    Homes.fetchAll((homes) => {
        res.render('user/favourite-list', {homes: homes, title: 'Favourites'});
    })
}

const getReserve = (req, res, next) => {
    res.render('user/reserve', {title: 'Reserve'});
}

const getBookings = (req, res, next) => {
    res.render('user/bookings', {title: 'Bookings'});
}

const getHomeListings = (req, res, next) => {
    Homes.fetchAll((homes) => {
        res.render('user/home-list', {homes: homes, title: 'Home Listings'});
    });
}

exports.getHome = getHome;
exports.getFavourites = getFavourites;
exports.getReserve = getReserve;
exports.getBookings = getBookings;
exports.getHomeListings = getHomeListings;