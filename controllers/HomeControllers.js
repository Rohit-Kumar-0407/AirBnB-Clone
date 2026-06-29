//Local Modules
const Homes = require('../models/registeredHomesDataModel')

const getHome = (req, res, next) => {
    Homes.fetchAll((homes) => {
        res.render('homePage', {homes: homes, title: 'AirBnB - Book Your New Home'});
    })
}

exports.getHome = getHome;