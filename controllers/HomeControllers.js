//Local Modules
const Homes = require('../models/registeredHomesDataModel')

const getHome = (req, res, next) => {
    Homes.find().then((homes) => {
        res.render('user/home-page', {homes: homes, title: 'AirBnB - Book Your New Home', isLoggedIn: req.session.isLoggedIn});
    }).catch((err) => {
        console.log(err);
    }) 
}

const getReserve = (req, res, next) => {
    res.render('user/reserve', {title: 'Reserve', isLoggedIn: req.session.isLoggedIn});
}

const getBookings = (req, res, next) => {
    res.render('user/bookings', {title: 'Bookings', isLoggedIn: req.session.isLoggedIn});
}

const getHomeListings = (req, res, next) => {
    Homes.find().then((homes) => {
        res.render('user/home-list', {homes: homes, title: 'Home Listings', isLoggedIn: req.session.isLoggedIn});
    }).catch((err) => {
        console.log(err);
    })
}

const getHomeDetails = (req, res, next) => {
    const homeId = req.params.homeId;
    Homes.findByID(homeId).then((home) => {
        if(home.length == 0){
           res.status(404).render('page404', {title: 'ERROR 404', isLoggedIn: req.session.isLoggedIn});
        }
        else {
            res.render('user/home-detail', {title: 'Home Detail', home: home, isLoggedIn: req.session.isLoggedIn});
        }
    }).catch((err) => {
        console.log(err);
    })
}

exports.getHome = getHome;
exports.getReserve = getReserve;
exports.getBookings = getBookings;
exports.getHomeListings = getHomeListings;
exports.getHomeDetails = getHomeDetails;