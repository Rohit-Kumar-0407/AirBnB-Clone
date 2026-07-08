const Homes = require('../models/registeredHomesDataModel')
const FavHomes = require('../models/favouritesDataModel');

//GET Controllers
const getAddHome = (req,res,next) => {
    res.render('host/add-home', {title: 'Register Home'});
};

const getHostHomeList = (req, res, next) => {
    Homes.fetchAll().then(([rows, fields]) => {
        res.render('host/host-home', {homes: rows, title: 'Host Home Listing'});
    }).catch((err) => {
        console.log(err);
    })
}

const geteditHome = (req,res,next) => {
    const homeId = req.params.homeId;
    const editing = req.query.editing;
    if(editing == 'True'){
        Homes.FindByID(homeId).then(([[home], fields]) => {
            if(home.length == 0){
                res.status(404).render('page404', {title: 'ERROR 404'});
            }
            else {
                res.render('host/edit-home', {title: 'Edit Home', home: home});
            }
        }).catch((err) => {
            console.log(err);
        })
    }    
}

//POST Controllers
const postaddHome = (req, res, next) => {
    res.render('host/home-added', {title: 'Home Added', editing: 'False'});
    console.log(req.body)
    const {name, phoneNumber, houseType, location, rating, photourl, price, description} = req.body;      //Unpacking contents from req.body
    const home = new Homes(name, phoneNumber, houseType, location, rating, photourl, price, description);
    home.save().then(() => {
        console.log('Data Added Successfully');
    }).catch((err) => {
        console.log(err);
    })
};

const updateHome = (req, res, next) => {
    const editing = req.query.editing;
    const homeId = req.params.homeId;
    const {name, phoneNumber, houseType, location, rating, description, photourl, price} = req.body;      //Unpacking contents from req.body
    const home = new Homes(name, phoneNumber, houseType, location, rating, photourl, price, description);
    home.id = homeId;
    home.save().then(() => {
        console.log('Home Updated Successfully');
        res.render('host/home-added', {title: 'Home Updated', editing});
    }).catch((err) => {
        console.log(err);
    })

};

const deleteHome = (req, res, next) => {     
    const homeId = req.params.homeId;
    Homes.deleteHome(homeId).then(() => {
        FavHomes.deleteFavHome(homeId, () => {
            console.log('Home Deleted Successfully');
            res.redirect('/host/home-listing');
        });   
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