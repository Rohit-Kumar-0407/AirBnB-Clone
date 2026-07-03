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
        //Reading old data
        fs.readFile(filepath, (err, FileContent) => {
            let registeredHomes = [];
            (err == null) ? console.log('File Read Successfully') : console.log(err);
            //Adding previous data once again
            try {
                registeredHomes = JSON.parse(FileContent);
            } catch(e){
                registeredHomes = [];
            }
            if(this.id){  //Edit Mode
                console.log('In editing mode');
                registeredHomes = registeredHomes.map(home => {
                    return (home.id == this.id) ? this : home;
                })

            }
            else { //Create Mode
                console.log('In creation mode')
                this.id = Math.random().toString();
                //Adding new data
                registeredHomes.push(this);
            }
            //Writing all data to database
            fs.writeFile(filepath, JSON.stringify(registeredHomes), (err) => {
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

    static deleteHome(homeId, callback){
        const FileContent = fs.readFile(filepath, (err,data) => {
            let registeredHomes = [];
            try{
                registeredHomes = JSON.parse(data);
            }catch(e){
                registeredHomes = [];
            }
            registeredHomes = registeredHomes.filter(home => home.id != homeId)
            fs.writeFile(filepath, JSON.stringify(registeredHomes), (err) => {
                (err == null) ? console.log('File Written Successfully') : console.log(err);
            });
            callback();   
        });   
    }
};


module.exports = Home;