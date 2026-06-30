// Array For Storing Homes Added
const Homes = require('../models/registeredHomesDataModel')

const getAddHome = (req,res,next) => {
    res.render('host/add-home', {title: 'Register Home'});
};

const postaddHome = (req, res, next) => {
    res.render('host/home-added', {title: 'Home Added'});
    const {ownerName, phoneNumber, houseType, location, rating, photo, price} = req.body;      //Unpacking contents from req.body
    const home = new Homes(ownerName, phoneNumber, houseType, location, rating, photo, price);
    console.log(home);
    home.save();
};

exports.getAddHome = getAddHome;
exports.postaddHome = postaddHome;