//Core Moudules
const fs = require('fs');
const path = require('path');

//Local Modules
const rootDir = require('../utils/path');
const filepath = path.join(rootDir, 'data', 'data.json');

//Fake Database
const registeredHomes = []
const FavHomes = [];

//Class for Structuring Data
class Home {
    constructor(ownerName, phoneNumber, houseType, location, rating, photo, price){
        this.ownerName = ownerName;          //"this" refere to object being created through the class
        this.phoneNumber = phoneNumber;
        this.houseType = houseType;
        this.location = location;
        this.rating = rating;
        this.photo = photo;
        this.price = price;
    }

    save(){
        this.id = Math.random().toString();
        //Transfering Incoming Data to Fake Database

        //Reading old data
        fs.readFile(filepath, (err, FileContent) => {
            let homes = [];
            (err == null) ? console.log('File Read Successfully') : console.log(err);
            //Adding previous data once again
            try {
                homes = JSON.parse(FileContent);
            } catch(e){
                homes = [];
            }
            //Adding new data
            homes.push(this);
            //Writing all data to database
            fs.writeFile(filepath, JSON.stringify(homes), (err) => {
                (err == null) ? console.log('File Written Successfully') : console.log(err);
            });
        })    
    }

    static fetchAll(callback){
        const FileContent = fs.readFile(filepath, (err,data) => {
            let homes = [];
            try{
                homes = JSON.parse(data);
            }catch(e){
                homes = [];
            }
            callback(homes);
        });
    };

    static FindByID(homeId, callback){
        fs.readFile(filepath, (err, data) => {
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
            })
            callback(selectedHome);
        });
    }
};


module.exports = Home;