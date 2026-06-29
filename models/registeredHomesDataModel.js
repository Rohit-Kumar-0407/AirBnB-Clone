//Core Moudules
const fs = require('fs');
const path = require('path');

//Local Modules
const rootDir = require('../utils/path');

//Fake Database
const registeredHomes = []

//Class for Structuring Data
class Home {
    constructor(ownerName, phoneNumber, houseType, price){
        this.ownerName = ownerName;          //this refere to object being created through the class
        this.phoneNumber = phoneNumber;
        this.houseType = houseType;
        this.price = price;
    }

    save(){
        registeredHomes.push(this);
        const filepath = path.join(rootDir, 'data', 'data.json');   //Transfering Incoming Data to Fake Database
        fs.writeFile(filepath, JSON.stringify(registeredHomes), (err) => {
            if(err === null){
                console.log('File Written Successully');
            }
            else{
                console.log(err);
            }
        })    
    }

    static fetchAll(callback){
        const filepath = path.join(rootDir, 'data', 'data.json');
        const FileContent = fs.readFile(filepath, (err,data) => {
            let homes = [];
            if(!err){
                homes = JSON.parse(data);
            }
            callback(homes);
        });
    };
};


module.exports = Home;