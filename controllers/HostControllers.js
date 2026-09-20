const Homes = require('../models/registeredHomesDataModel')
const FavHomes = require('../models/favouritesDataModel');

//GET Controllers
const getAddHome = (req,res,next) => {
    res.render('host/add-home', {title: 'Register Home', isLoggedIn: req.session.isLoggedIn});
};

const getHostHomeList = (req, res, next) => {
    Homes.find().then((homes) => {
        res.render('host/host-home', {homes: homes, title: 'Host Home Listing', isLoggedIn: req.session.isLoggedIn});
    }).catch((err) => {
        console.log(err);
    })
}

const geteditHome = (req,res,next) => {
    const homeId = req.params.homeId;
    const editing = req.query.editing;
    if(editing == 'True'){
        Homes.findById(homeId).then((home) => {
            if(home.length == 0){
                res.status(404).render('page404', {title: 'ERROR 404', isLoggedIn: req.session.isLoggedIn});
            }
            else {
                res.render('host/edit-home', {title: 'Edit Home', home: home, isLoggedIn: req.session.isLoggedIn});
            }
        }).catch((err) => {
            console.log(err);
        })
    }    
}

//POST Controllers
const postaddHome = (req, res, next) => {
    console.log(req.body);
    //Unpacking contents from req.body
    const {name, phoneNumber, houseType, location, rating, photourl, price, description} = req.body;      
    const home = new Homes({name, phoneNumber, houseType, location, rating, photourl, price, description});
    home.save().then((result) => {
        console.log('Data Added Successfully');
        console.log(result);
    }).catch((err) => {
        console.log(err);
    })
    res.render('host/home-added', {title: 'Home Added', editing: 'False', isLoggedIn: req.session.isLoggedIn});
};

const updateHome = (req, res, next) => {
    const editing = req.query.editing;
    const homeId = req.params.homeId;
    //Unpacking contents from req.body
    const {name, phoneNumber, houseType, location, rating, description, photourl, price} = req.body;      
    Homes.findById(homeId).then((home) => {
        home.name = name,
        home.phoneNumber = phoneNumber,
        home.houseType = houseType,
        home.location = location,
        home.rating = rating,
        home.description = description,
        home.photourl = photourl,
        home.price = price
        //Saving New Data
        home.save().then((result) => {
            console.log('Home Updated Successfully');
            res.render('host/home-added', {title: 'Home Updated', editing, isLoggedIn: req.session.isLoggedIn});
        }).catch((err) => {
            console.log(err);
        })
    }).catch((err) => {
        console.log(err);
    })
    

};

const deleteHome = (req, res, next) => {     
    const homeId = req.params.homeId;
    Homes.findByIdAndDelete(homeId).then(() => {
        console.log('Home Deleted Successfully');
        res.redirect('/host/home-listing');   
    }).catch((err) => {
        console.log(err);
    })
}

exports.getAddHome = getAddHome;
exports.postaddHome = postaddHome;
exports.getHostHomeList = getHostHomeList;
exports.geteditHome = geteditHome;
exports.updateHome = updateHome;
exports.deleteHome = deleteHome;