//Core Moudules
const fs = require('fs');
const path = require('path');

//Local Modules
const rootDir = require('../utils/path');
const filepath = path.join(rootDir, 'data', 'favourites.json');
const data_filepath = path.join(rootDir, 'data', 'data.json');
//Fake Database
const FavHomes = [];

const saveFav = (homeId) => {
    fs.readFile(data_filepath, (err, data) => {
       let homes = [];
        try {
            homes = JSON.parse(data);
        } catch(e){
            homes = [];
        }
        let selectedHome = [];
        homes.forEach((H) => {
            if(H.id == homeId){
                selectedHome = H;
            }
        });
        if(FavHomes.some(home => home.id === selectedHome.id)){
            console.log('Already Added');
        }
        else {
            FavHomes.push(selectedHome);
            fs.writeFile(filepath, JSON.stringify(FavHomes), (err) => {
                (err == null) ? console.log('File Written Successfully') : console.log(err);
            });
            console.log('Favourites Added Successfully');
        }
    })
}

const fetchFav = (callback) => {
    const FileContent = fs.readFile(filepath, (err,data) => {
        let homes = [];
        try{
            homes = JSON.parse(data);
        }catch(e){
            homes = [];
        }
        callback(homes);
    });
}

const deleteFavHome = (homeId, callback) => {
    const FileContent = fs.readFile(filepath, (err,data) => {
        let FavHomes = [];
        try{
            Favhomes = JSON.parse(data);
        }catch(e){
            console.log(e);
            Favhomes = [];
        }
        Favhomes = Favhomes.filter(home => home.id != homeId)
        fs.writeFile(filepath, JSON.stringify(Favhomes), (err) => {
            (err == null) ? console.log('File Written Successfully') : console.log(err);
        });
        callback();   
    });   
}

exports.saveFav = saveFav;
exports.fetchFav = fetchFav;
exports.deleteFavHome = deleteFavHome;