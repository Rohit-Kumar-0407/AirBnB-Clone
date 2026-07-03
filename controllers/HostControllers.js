const Homes = require('../models/registeredHomesDataModel')
const FavHomes = require('../models/favouritesDataModel');

//GET Controllers
const getAddHome = (req,res,next) => {
    res.render('host/add-home', {title: 'Register Home'});
};

const getHostHomeList = (req, res, next) => {
    Homes.fetchAll((homes) => {
        res.render('host/host-home', {homes: homes, title: 'Host Home Listing'});
    });
}

const geteditHome = (req,res,next) => {
    const homeId = req.params.homeId;
    const editing = req.query.editing;
    if(editing == 'True'){
        Homes.FindByID(homeId, (home) => {
        if(home.length == 0){
            res.status(404).render('page404', {title: 'ERROR 404'});
        } else {
            res.render('host/edit-home', {title: 'Edit Home', home: home});
        }
        })
    }    
}

//POST Controllers
const postaddHome = (req, res, next) => {
    res.render('host/home-added', {title: 'Home Added', editing: 'False'});
    const {ownerName, phoneNumber, houseType, location, rating, photo, price} = req.body;      //Unpacking contents from req.body
    const home = new Homes(ownerName, phoneNumber, houseType, location, rating, photo, price);
    home.save();
};

const updateHome = (req, res, next) => {
    const editing = req.query.editing;
    const homeId = req.params.homeId;
    const {id, ownerName, phoneNumber, houseType, location, rating, photo, price} = req.body;      //Unpacking contents from req.body
    const home = new Homes(ownerName, phoneNumber, houseType, location, rating, photo, price);
    home.id = homeId;
    home.save();
    res.render('host/home-added', {title: 'Home Updated', editing})

};

const deleteHome = (req, res, next) => {     
    const homeId = req.params.homeId;
    Homes.deleteHome(homeId, () => {
        FavHomes.deleteFavHome(homeId, () => {
            console.log('Home Deleted Successfully');
        });
        
    })
    res.redirect('/host/home-listing');
}

exports.getAddHome = getAddHome;
exports.postaddHome = postaddHome;
exports.getHostHomeList = getHostHomeList;
exports.geteditHome = geteditHome;
exports.updateHome = updateHome;
exports.deleteHome = deleteHome;