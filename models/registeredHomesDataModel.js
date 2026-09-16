const { ObjectId } = require('mongodb');
const MongoDB = require('../utils/mongodb_database');   

//Class for Structuring Data
class Home {
    constructor(name, phoneNumber, houseType, location, rating, photourl, price, description){
        this.name = name;          //"this" refere to object being created through the class
        this.phoneNumber = phoneNumber;
        this.houseType = houseType;
        this.location = location;
        this.rating = rating;
        this.photourl = photourl;
        this.price = price;
        this.description = description;
    }

    save(){
        const db = MongoDB.getDB();
        //Insert many takes an array of objects
        return db.collection("homes").insertOne(this);
    }

    static fetchAll(){
        const db = MongoDB.getDB();
        return db.collection("homes").find().toArray();
    };

    static FindByID(homeId){
        const db = MongoDB.getDB();
        return db.collection("homes").find({_id: new ObjectId(String(homeId))}).next();  
    }

    static deleteHome(homeId){
        
    }
};


module.exports = Home;