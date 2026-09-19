//Local Module
const FavHomes = require('../models/favouritesDataModel');
const Homes = require('../models/registeredHomesDataModel');

const getFavourites = (req, res, next) => {
    FavHomes.find().then((favourites) => {
        favourites = favourites.map(fav => fav.homeId. toString());
        Homes.find().then((homes) => {
            const favouriteHomes = homes.filter((home) => favourites.includes(home._id.toString()));
            res.render('user/favourite-list', {homes: favouriteHomes, title: 'Favourites', isLoggedIn: req.session.isLoggedIn});
        })  
    }).catch((err) => {
        console.log(err);
    })
}

const postFavourites = (req, res, next) => {
    const homeId = req.body.homeId;
    FavHomes.findOne({homeId: homeId}).then((existingFav) => {
        if(exisingFav){
            console.log('Already Added');
            res.redirect('/favourites');
        } else {
            const fav = new FavHomes({homeId});
            fav.save().then((result) => {
                console.log("Favourites Added Succesfully");
                console.log(result);
                res.redirect('/favourites');
            }).catch((err) => {
                console.log(err);
            })
        }
    })
    
    
}

const postDeleteFavourites = (req, res, next) => {
    const favhomeId = req.params.favhomeId;
    console.log(favhomeId);
    FavHomes.findByIdAndDelete(favhomeId).then((result) => {
        console.log(result);
        console.log('Favourite Deleted Successfully');
        res.redirect('/favourites');
    }).catch((err) => {
        console.log(err);
    })
}

exports.postFavourites = postFavourites;
exports.getFavourites = getFavourites;
exports.postDeleteFavourites = postDeleteFavourites;