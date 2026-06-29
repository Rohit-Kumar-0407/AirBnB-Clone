// Array For Storing Homes Added
const Homes = require('../models/registeredHomesDataModel')

const getAddHome = (req,res,next) => {
    res.render('addHome', {title: 'Register Home'});
};

const postaddHome = (req, res, next) => {
    res.render('homeAdded', {title: 'Home Added'});
    const {ownerName, phoneNumber, houseType, price} = req.body;      //Unpacking contents from req.body
    const home = new Homes(ownerName, phoneNumber, houseType, price);
    home.save();
};

exports.getAddHome = getAddHome;
exports.postaddHome = postaddHome;