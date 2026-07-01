//Local Modules
const Homes = require('../models/registeredHomesDataModel')

const getHome = (req, res, next) => {
    Homes.fetchAll((homes) => {
        res.render('user/home-page', {homes: homes, title: 'AirBnB - Book Your New Home'});
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

const getHomeDetails = (req, res, next) => {
    const homeId = req.params.homeId;
    Homes.FindByID(homeId, (home) => {
        console.log(home);
        if(home.length == 0){
           res.status(404).render('page404', {title: 'ERROR 404'});
        }
        else {
            res.render('user/home-detail', {title: 'Home Detail', home: home});
        }
    });
}

exports.getHome = getHome;
exports.getReserve = getReserve;
exports.getBookings = getBookings;
exports.getHomeListings = getHomeListings;
exports.getHomeDetails = getHomeDetails;